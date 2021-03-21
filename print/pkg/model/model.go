package model

import (
	"github.com/hi-fi/sss/pkg/model"
)

const (
	COLUMNS      = "columns"
	LEAFLET      = "leaflet"
	HIGH_LEAFLET = "highLeaflet"
)

type Model struct {
	Event         string
	Description   string
	Style         string
	Columns       int
	UseCoverImage bool
	SongsOnBack   bool
	SongsOnCover  bool
	CoverImage    string
	FontSize      int
	Songs         []model.Song
	Page          Page
}

type Page struct {
	Width       float64
	Height      float64
	Orientation string
	Unit        string
}
