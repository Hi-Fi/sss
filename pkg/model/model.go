package model

import (
	"time"

	"cloud.google.com/go/datastore"
)

type Song struct {
	Key       *datastore.Key `json:"-" datastore:"__key__"`
	ID        string         `json:"id" datastore:"-"`
	Created   time.Time      `json:"dateCreated,omitempty" datastore:"dateCreated"`
	Updated   time.Time      `json:"lastUpdated,omitempty" datastore:"lastUpdated"`
	Creator   string         `json:"creator,omitempty" datastore:"creator,noindex"`
	Modifier  string         `json:"modifier,omitempty" datastore:"modifier,noindex"`
	Title     string         `json:"title" datastore:"title"`
	Verses    []Verse        `json:"verses" datastore:"verses"`
	Melody    Melody         `json:"melody,omitempty" datastore:"melody"`
	Arrangers []Maker        `json:"arrangers,omitempty" datastore:"arrangers"`
	Composers []Maker        `json:"composers,omitempty" datastore:"composers"`
	Lyricists []Maker        `json:"lyricists,omitempty" datastore:"lyricists"`
	ExtraInfo string         `json:"extraInfo,omitempty" datastore:"extraInfo,noindex"`
	Tags      []Tag          `json:"tags,omitempty" datastore:"tags"`
	Deleted   bool           `json:"deleted" datastore:"deleted"`
}

type Melody struct {
	Melody string `json:"melody" datastore:"melody"`
}

type Verse struct {
	Lyrics string `json:"lyrics" datastore:"lyrics,noindex"`
}

type Maker struct {
	Name string `json:"name" datastore:"name"`
}

type Tag struct {
	Tag string `json:"tag" datastore:"tag"`
}
