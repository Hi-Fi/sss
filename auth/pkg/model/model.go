package model

import (
	"time"

	"cloud.google.com/go/datastore"
	"github.com/dgrijalva/jwt-go"
)

type User struct {
	Key            *datastore.Key `json:"-" datastore:"__key__"`
	ID             string         `json:"id" datastore:"-"`
	Created        time.Time      `json:"dateCreated,omitempty" datastore:"dateCreated,noindex"`
	Updated        time.Time      `json:"lastUpdated,omitempty" datastore:"lastUpdated,noindex"`
	Creator        string         `json:"creator,omitempty" datastore:"creator,noindex"`
	Modifier       string         `json:"modifier,omitempty" datastore:"modifier,noindex"`
	IsAdmin        bool           `json:"isAdmin" datastore:"isAdmin"`
	Email          string         `json:"email" datastore:"email"`
	HashedPassword string         `json:"-" datastore:"hashedPassword,noindex"`
	Token          Token          `json:"-" datastore:"-"`
	TokenString    string         `json:"token" datastore:"-"`
	Credentials
}

type Credentials struct {
	Username string `json:"username" datastore:"username"`
	Password string `json:"password,omitempty" datastore:"password,noindex"`
}

type Claims struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	IsAdmin  bool   `json:"isAdmin"`
	jwt.StandardClaims
}

type Token struct {
	TokenString string
	Expiration  time.Time
}

type Validation struct {
	TokenValid bool `json:"valid"`
}
