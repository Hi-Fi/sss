package orm

import (
	"context"
	"log"
	"sync"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/hi-fi/sss/core/pkg/model"
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
	once   sync.Once
	client *datastore.Client
	ctx    *context.Context
)

func CreateClient() *datastore.Client {
	dsCtx := context.Background()
	dsClient, err := datastore.NewClient(dsCtx, datastore.DetectProjectID)
	if err != nil {
		log.Println("Error Connecting to Datastore::", err)
	}
	client = dsClient
	ctx = &dsCtx
	return client
}

func SaveSong(song *model.Song) error {
	key := datastore.NameKey("Song", song.ID, nil)
	client.Put(*ctx, key, song)
	set("Song", song.ID, *song)
	return nil
}

func SaveSongs(songs []model.Song) error {
	var keys []*datastore.Key

	for _, song := range songs {
		keys = append(keys, datastore.NameKey("Song", song.ID, nil))
		set("Song", song.ID, song)
	}
	_, err := client.PutMulti(*ctx, keys, songs)

	return err
}

func GetSongs() (songs []model.Song, err error) {
	statsKey := datastore.NameKey("__Stat_Kind__", "Song", nil)
	var stats Stats
	client.Get(*ctx, statsKey, &stats)
	cacheSongs := getAll("Song")
	if len(cacheSongs) == 0 || int64(len(cacheSongs)) < stats.Count {
		var datastoreSongs []*model.Song
		query := datastore.NewQuery("Song")
		_, err = client.GetAll(*ctx, query, &datastoreSongs)
		for _, datastoreSong := range datastoreSongs {
			datastoreSong.ID = datastoreSong.Key.Name
			set("Song", datastoreSong.ID, *datastoreSong)
			songs = append(songs, *datastoreSong)
		}
	} else {
		for _, item := range cacheSongs {
			songs = append(songs, item.(model.Song))
		}
	}

	return songs, err
}

func GetSong(id string) (song model.Song, err error) {
	cachedSong := get("Song", id)
	if cachedSong != nil {
		return cachedSong.(model.Song), err
	}

	key := datastore.NameKey("Song", id, nil)
	err = client.Get(*ctx, key, &song)
	if err == nil {
		song.ID = song.Key.Name
		set("Song", song.ID, song)
	}
	return song, err
}

func GetUpdatedSongs(fromTime time.Time) (songs []model.Song, err error) {
	statsKey := datastore.NameKey("__Stat_Kind__", "Song", nil)
	var stats Stats
	client.Get(*ctx, statsKey, &stats)
	if stats.TimeStamp.After(fromTime) {
		query := datastore.NewQuery("Song").Filter("Created >", fromTime)
		_, err = client.GetAll(*ctx, query, &songs)
		for _, song := range songs {
			song.ID = song.Key.Name
			set("Song", song.ID, song)
		}
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
