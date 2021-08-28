package auth

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/hi-fi/sss/auth/pkg/model"
)

func extractToken(r *http.Request) string {
	bearerHeader := r.Header.Get("Authorization")
	splitBearerHeader := strings.Split(bearerHeader, " ")
	if len(splitBearerHeader) == 2 {
		return splitBearerHeader[1]
	}
	return ""
}

func ParseTokenMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		_, claims, _ := ValidateToken(extractToken(c.Request))
		c.Set("claims", claims)
		c.Next()
	}
}

func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, exists := c.Get("claims")
		if !exists || claims.(model.Claims).ID == "" {
			c.Status(http.StatusUnauthorized)
			c.Abort()
			return
		}
		c.Next()
	}
}
