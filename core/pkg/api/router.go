package api

import (
	"github.com/gin-gonic/gin"
	v1 "github.com/hi-fi/sss/core/pkg/api/v1"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

// InitRouter initialize routing information
func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	apiv1 := r.Group("/api/v1")
	apiv1.GET("/songs", v1.GetSongs)
	apiv1.GET("/songs/updated/:time", v1.GetUpdatedSongs)
	apiv1.GET("/song/:id", v1.GetSong)

	apiv1.POST("/songs", v1.SaveSongs)
	apiv1.POST("/song", v1.SaveSong)

	apiv1.PUT("/song/:id", v1.EditSong)

	return r
}
