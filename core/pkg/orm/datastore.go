package orm

import (
	"context"
	"log"
	"sync"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/hi-fi/sss/pkg/model"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/trace"
)

type Cache map[string]map[string]*CacheItem

type Stats struct {
	Count     int64     `datastore:"count"`
	TimeStamp time.Time `datastore:"timestamp"`
}

type CacheItem struct {
	Item interface{}
}

var (
	cache  = Cache{}
	lock   = sync.Mutex{}
	client *datastore.Client
	tracer *trace.Tracer
)

func CreateClient() *datastore.Client {
	dsCtx := context.Background()
	dsClient, err := datastore.NewClient(dsCtx, datastore.DetectProjectID)
	if err != nil {
		log.Println("Error Connecting to Datastore::", err)
	}
	client = dsClient
	dsTracer := otel.GetTracerProvider().Tracer("datastore")
	tracer = &dsTracer
	return client
}

func SaveSong(ctx context.Context, song *model.Song) error {
	spanCtx, span := (*tracer).Start(ctx, "SaveSong")
	defer span.End()
	key := datastore.NameKey("Song", song.ID, nil)
	dsSpanCtx, dsSpan := (*tracer).Start(spanCtx, "datastore.Put")
	client.Put(dsSpanCtx, key, song)
	dsSpan.End()
	set("Song", song.ID, *song)
	return nil
}

func SaveSongs(ctx context.Context, songs []model.Song) error {
	spanCtx, span := (*tracer).Start(ctx, "SaveSongs")
	defer span.End()

	var keys []*datastore.Key

	for _, song := range songs {
		keys = append(keys, datastore.NameKey("Song", song.ID, nil))
		set("Song", song.ID, song)
	}
	dsSpanCtx, dsSpan := (*tracer).Start(spanCtx, "datastore.PutMulti")
	_, err := client.PutMulti(dsSpanCtx, keys, songs)
	dsSpan.End()
	return err
}

func GetSongs(ctx context.Context) (songs []model.Song, err error) {
	spanCtx, span := (*tracer).Start(ctx, "GetSongs")
	defer span.End()
	statsKey := datastore.NameKey("__Stat_Kind__", "Song", nil)
	var stats Stats
	client.Get(spanCtx, statsKey, &stats)
	cacheSongs := getAll("Song")
	if len(cacheSongs) == 0 || int64(len(cacheSongs)) < stats.Count {
		dsSpanCtx, dsSpan := (*tracer).Start(spanCtx, "datastore.GetAll")
		var datastoreSongs []*model.Song
		query := datastore.NewQuery("Song")
		_, err = client.GetAll(dsSpanCtx, query, &datastoreSongs)
		for _, datastoreSong := range datastoreSongs {
			datastoreSong.ID = datastoreSong.Key.Name
			set("Song", datastoreSong.ID, *datastoreSong)
			songs = append(songs, *datastoreSong)
		}
		dsSpan.End()
	} else {
		for _, item := range cacheSongs {
			songs = append(songs, item.(model.Song))
		}
	}
	return songs, err
}

func GetSong(ctx context.Context, id string) (song model.Song, err error) {
	spanCtx, span := (*tracer).Start(ctx, "GetSong")
	defer span.End()
	cachedSong := get("Song", id)
	if cachedSong != nil {
		return cachedSong.(model.Song), err
	}
	dsSpanCtx, dsSpan := (*tracer).Start(spanCtx, "datastore.Get")
	key := datastore.NameKey("Song", id, nil)
	err = client.Get(dsSpanCtx, key, &song)
	if err == nil {
		song.ID = song.Key.Name
		set("Song", song.ID, song)
	}
	dsSpan.End()
	return song, err
}

func GetUpdatedSongs(ctx context.Context, fromTime time.Time) (songs []model.Song, err error) {
	spanCtx, span := (*tracer).Start(ctx, "GetUpdatedSongs")
	defer span.End()
	statsKey := datastore.NameKey("__Stat_Kind__", "Song", nil)
	var stats Stats
	client.Get(spanCtx, statsKey, &stats)
	if stats.TimeStamp.After(fromTime) {
		dsSpanCtx, dsSpan := (*tracer).Start(spanCtx, "datastore.GetAll")
		query := datastore.NewQuery("Song").Filter("Created >", fromTime)
		_, err = client.GetAll(dsSpanCtx, query, &songs)
		for _, song := range songs {
			song.ID = song.Key.Name
			set("Song", song.ID, song)
		}
		dsSpan.End()
	}
	return songs, err
}

func getAll(collection string) []interface{} {
	lock.Lock()
	defer lock.Unlock()

	if cache[collection] == nil {
		return nil
	}
	items := make([]interface{}, 0, len(cache[collection]))
	for _, v := range cache[collection] {
		items = append(items, v.Item)
	}

	return items
}

func get(collection string, key string) interface{} {
	lock.Lock()
	defer lock.Unlock()

	if cache[collection] == nil {
		return nil
	}

	item := cache[collection][key]

	if item == nil {
		return nil
	}

	return item.Item
}

func set(collection, key string, value interface{}) error {
	lock.Lock()
	defer lock.Unlock()

	if cache[collection] == nil {
		cache[collection] = map[string]*CacheItem{}
	}

	cache[collection][key] = &CacheItem{
		Item: value,
	}

	return nil
}
