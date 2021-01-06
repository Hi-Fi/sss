package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/hi-fi/sss/print/pkg/model"
	"github.com/hi-fi/sss/print/pkg/pdf"

	"github.com/gin-gonic/gin"
)

// Router gin router
var Router *gin.Engine

func main() {
	Router = gin.Default()
	api := Router.Group("/api")
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
	base := Router.Group("/")
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
	Router.Run(":" + port)
}
