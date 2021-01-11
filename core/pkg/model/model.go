package model

import (
	"time"
)

type Song struct {
	ID        string
	Created   time.Time
	Updated   time.Time
	Creator   string
	Updator   string
	Title     string
	Verses    []Verse
	Melody    Melody
	Arrangers []Maker
	Composers []Maker
	Lyricists []Maker
	ExtraInfo string
	Tags      []Tag
	Deleted   bool
}

type Melody struct {
	Melody string
}

type Verse struct {
	Lyrics string
}

type Maker struct {
	Name string
}

type Tag struct {
	Tag string
}
