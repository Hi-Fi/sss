package auth

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/hi-fi/sss/auth/pkg/model"
	"github.com/hi-fi/sss/auth/pkg/orm"
	"go.opentelemetry.io/otel"
	"golang.org/x/crypto/bcrypt"
)

var (
	jwtKey = []byte(os.Getenv("JWT_SECRET_KEY"))
	tracer = otel.GetTracerProvider().Tracer("auth")
)

func ValidateToken(ctx context.Context, tokenString string) (tokenValidation model.Validation, claims model.Claims, err error) {
	var token *jwt.Token
	_, span := tracer.Start(ctx, "ValidateToken")
	defer span.End()
	token, err = jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err == nil {
		tokenValidation.TokenValid = token.Valid
	}

	if err != nil || !token.Valid {
		err = fmt.Errorf("Invalid token, %s", err.Error())
		return
	}
	return
}

func ValidateUser(ctx context.Context, tokenString string) (user model.User, err error) {
	spanCtx, span := tracer.Start(ctx, "ValidateUser")
	defer span.End()
	tokenValidation, claims, err := ValidateToken(spanCtx, tokenString)
	if tokenValidation.TokenValid {
		user, err = orm.GetUserWithId(spanCtx, claims.ID)
	}
	return
}

func Login(ctx context.Context, credentials model.Credentials) (user model.User, err error) {
	// https://github.com/golang/go/issues/9859
	var token model.Token
	spanCtx, span := tracer.Start(ctx, "Login")
	defer span.End()
	user, err = orm.GetUser(spanCtx, model.User{Credentials: model.Credentials{Username: credentials.Username}})
	if err == nil {
		err = bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(credentials.Password))
		if err == nil {
			token, err = generateJwtToken(spanCtx, user)
		}
	} else {
		log.Printf("Failed to get user. Error: %v", err)
	}
	user.Token = token
	user.TokenString = token.TokenString
	return
}

func generateJwtToken(ctx context.Context, user model.User) (token model.Token, err error) {
	var tokenValue *jwt.Token
	var tokenString string
	_, span := tracer.Start(ctx, "generateJwtToken")
	defer span.End()
	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &model.Claims{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		IsAdmin:  user.IsAdmin,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	tokenValue = jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	tokenString, err = tokenValue.SignedString(jwtKey)

	if err == nil {
		token = model.Token{
			TokenString: tokenString,
			Expiration:  expirationTime,
		}
	}

	return
}
