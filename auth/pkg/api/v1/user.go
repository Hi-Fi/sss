package v1

import (
	"github.com/gin-gonic/gin"
	"github.com/hi-fi/sss/auth/pkg/auth"
	"github.com/hi-fi/sss/auth/pkg/model"
	"github.com/hi-fi/sss/auth/pkg/orm"
)

// @Summary Get information of current user
// @Produce  json
// @Success 200 {object} []model.User
// @Failure 403 {string} string
// @Router /api/v1/user [get]
func CurrentUser(c *gin.Context) {
	var (
		user model.User
		err  error
	)
	claims, exists := c.Get("claims")

	if exists {
		user, err = orm.GetUserWithId(claims.(model.Claims).ID)
		if err == nil {
			c.JSON(200, user)
			return
		}
	}

	c.JSON(403, "Unauthorized")
}

// @Summary Validate token
// @Produce  json
// @Success 200 {object} []model.Validation
// @Failure 403 {string} string
// @Router /api/v1/validate [get]
func Validate(c *gin.Context) {
	token, err := c.Cookie("token")
	if err == nil {
		_, _, err = auth.ValidateToken(token)
	}

	if err != nil {
		c.JSON(403, gin.H{"error": err.Error()})
	} else {
		c.Status(200)
	}
}

// @Summary Register user
// @Produce  json
// @Success 200 {object} model.User
// @Failure 400 {string} string
// @Router /api/v1/register [post]
func Register(c *gin.Context) {
	var callingUser model.User
	token, err := c.Cookie("token")
	if err == nil {
		callingUser, _ = auth.ValidateUser(token)
	}
	user := model.User{}
	c.BindJSON(&user)
	user.Enrich()
	if !callingUser.IsAdmin {
		user.IsAdmin = false
	}
	err = orm.SaveUser(&user)
	if err == nil {
		c.JSON(200, user)
	} else {
		c.JSON(400, gin.H{"error": err.Error()})
	}
}

// @Summary Perform login
// @Produce  json
// @Success 200 {object} model.User
// @Failure 401 {string} string
// @Router /api/v1/login [post]
func Login(c *gin.Context) {
	credentials := model.Credentials{}
	c.BindJSON(&credentials)
	user, err := auth.Login(credentials)
	if err == nil {
		c.JSON(200, user)
	} else {
		c.JSON(401, err)
	}
}
