package model

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
	EmptyBack     bool
	SongsOnCover  bool
	CoverImage    string
	FontSize      int
	Songs         []Song
	Page          Page
}

type Page struct {
	Width       float64
	Height      float64
	Orientation string
	Unit        string
}

type Song struct {
	Title     string
	Verses    []Verse
	Melody    Melody
	Arrangers []Maker
	Composers []Maker
	Lyricists []Maker
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
