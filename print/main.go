package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/hi-fi/sss/print/pkg/model"
	"github.com/hi-fi/sss/print/pkg/pdf"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// router gin router
var router *gin.Engine

func main() {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowMethods("OPTIONS")
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowHeaders = []string{"Authorization", "content-type"}
	router = gin.New()
	router.Use(cors.New(corsConfig))
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	api := router.Group("/api")
	{
		api.GET("/test", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "test successful",
			})
		})
		api.POST("/print", func(ctx *gin.Context) {
			var leafletData model.Model
			if err := ctx.BindJSON(&leafletData); err != nil {
				fmt.Printf("%v\n", err)
				ctx.AbortWithError(400, err).SetType(gin.ErrorTypeBind)
				return
			}
			model.CalculatePageSize(&leafletData)
			b := pdf.CreateLeaflet(leafletData)
			downloadName := time.Now().UTC().Format("leaflet-20060102150405.pdf")
			ctx.Header("Content-Description", "File Transfer")
			ctx.Header("Content-Disposition", "attachment; filename="+downloadName)
			ctx.Data(http.StatusOK, "application/octet-stream", b.Bytes())
			return
		})
	}
	base := router.Group("/")
	{
		base.GET("/", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "healthy",
			})
		})
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
		log.Printf("Defaulting to port %s", port)
	}
	router.Run(":" + port)
}
