package model

type Model struct {
	Event         string
	Style         string
	Columns       int
	UseCoverImage bool
	EmptyBack     bool
	CoverImage    []byte
	FontSize      int
	Songs         []Song
}

type Song struct {
	Title     string
	Verses    []Verse
	Melody    []Melody
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
