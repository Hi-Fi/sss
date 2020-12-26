package main

import (
	"net/http"
	"sss/print/pkg/model"
	"sss/print/pkg/pdf"
	"time"

	"github.com/gin-gonic/gin"
)

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
			ctx.BindJSON(&leafletData)
			b := pdf.CreateLeaflet(leafletData)
			downloadName := time.Now().UTC().Format("data-20060102150405.pdf")
			ctx.Header("Content-Description", "File Transfer")
			ctx.Header("Content-Disposition", "attachment; filename="+downloadName)
			ctx.Data(http.StatusOK, "application/octet-stream", b.Bytes())
		})
	}
	Router.Run(":5000")
}
