package orm

import (
	"time"

	"github.com/hi-fi/sss/core/pkg/model"
)

// SssData defines interface for data persistence on SSS
type SssData interface {
	SaveSong(song model.Song) error
	SaveSongs(songs []model.Song) error

	GetSongs() ([]model.Song, error)
	GetSong(id string) (model.Song, error)
	GetUpdatedSongs(fromTime time.Time) ([]model.Song, error)
}
