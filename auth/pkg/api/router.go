package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hi-fi/sss/auth/pkg/api/docs"
	v1 "github.com/hi-fi/sss/auth/pkg/api/v1"
	"github.com/hi-fi/sss/auth/pkg/auth"
	swaggerFiles "github.com/swaggo/files/v2"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
)

// InitRouter initialize routing information
func InitRouter() *gin.Engine {
	docs.SwaggerInfo.Title = "Sitsitsit Authentication and Authorization API"
	r := gin.New()
	r.Use(otelgin.Middleware("auth"))
	r.Use(cors.Default())
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(auth.ParseTokenMiddleware())

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	apiv1 := r.Group("/api/v1")
	apiv1.GET("/user", auth.TokenAuthMiddleware(), v1.CurrentUser)
	apiv1.GET("/validate", auth.TokenAuthMiddleware(), v1.Validate)
	apiv1.POST("/login", v1.Login)
	apiv1.POST("/register", v1.Register)

	return r
}
