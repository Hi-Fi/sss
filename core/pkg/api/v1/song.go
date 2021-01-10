package v1

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/hi-fi/sss/core/pkg/model"
	"github.com/hi-fi/sss/core/pkg/orm"
)

// @Summary Get all songs
// @Produce  json
// @Success 200 {object} app.Response
// @Failure 500 {object} app.Response
// @Router /api/v1/songs [get]
func GetSongs(c *gin.Context) {
	songs, _ := orm.GetSongs()
	c.JSON(200, songs)
}

// @Summary Get updated songs
// @Produce  json
// @Success 200 {object} app.Response
// @Failure 500 {object} app.Response
// @Router /api/v1/songs/updated/{time} [get]
func GetUpdatedSongs(c *gin.Context) {
	timeLayout := time.RFC3339Nano
	fromTime, err := time.Parse(timeLayout, c.Param("time"))
	if err != nil {
		c.AbortWithError(500, err)
	}
	songs, err := orm.GetUpdatedSongs(fromTime)
	if err != nil {
		c.AbortWithError(500, err)
	}
	c.JSON(200, songs)

}

// @Summary Get single song
// @Produce  json
// @Success 200 {object} app.Response
// @Failure 500 {object} app.Response
// @Router /api/v1/song/{id} [post]
func GetSong(c *gin.Context) {
	song, _ := orm.GetSong(c.Param("id"))
	c.JSON(200, song)

}

// @Summary Create multiple songs at once
// @Produce  json
// @Success 200 {object} app.Response
// @Failure 500 {object} app.Response
// @Router /api/v1/songs [post]
func SaveSongs(c *gin.Context) {
	songs := []*model.Song{}
	c.BindJSON(&songs)
	for _, song := range songs {
		song.Enrich()
	}

	c.JSON(200, songs)
}

// @Summary Create song
// @Produce  json
// @Success 200 {object} app.Response
// @Failure 500 {object} app.Response
// @Router /api/v1/song [post]
func SaveSong(c *gin.Context) {
	song := model.Song{}
	c.BindJSON(&song)
	song.Enrich()
	orm.SaveSong(&song)
	c.JSON(200, song)
}

// @Summary Update song
// @Produce  json
// @Success 200 {object} app.Response
// @Failure 500 {object} app.Response
// @Router /api/v1/song/{id} [put]
func EditSong(c *gin.Context) {
	song := model.Song{}
	c.BindJSON(&song)
	song.Enrich()
	orm.SaveSong(&song)
	c.JSON(200, song)
}
