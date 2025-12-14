package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hi-fi/sss/core/pkg/api/docs"
	v1 "github.com/hi-fi/sss/core/pkg/api/v1"
	swaggerFiles "github.com/swaggo/files/v2"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
)

// InitRouter initialize routing information
func InitRouter() *gin.Engine {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowMethods("OPTIONS")
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowHeaders = []string{"Authorization", "content-type"}
	docs.SwaggerInfo.Title = "Sitsitsit API"
	r := gin.New()
	r.Use(otelgin.Middleware("core"))
	r.Use(cors.New(corsConfig))
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
