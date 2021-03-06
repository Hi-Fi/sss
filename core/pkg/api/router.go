package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hi-fi/sss/core/pkg/api/docs"
	v1 "github.com/hi-fi/sss/core/pkg/api/v1"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

// InitRouter initialize routing information
func InitRouter() *gin.Engine {
	docs.SwaggerInfo.Title = "Sitsitsit API"
	r := gin.New()
	r.Use(cors.Default())
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	// if gin.Mode() == gin.DebugMode {
	// }
	// else {
	// 	corsConfig := cors.DefaultConfig()
	// 	r.Use(cors.New(corsConfig))
	// }

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
