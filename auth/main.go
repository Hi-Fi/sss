package main

import (
	"log"
	"os"

	"github.com/hi-fi/sss/auth/pkg/api"
	"github.com/hi-fi/sss/auth/pkg/orm"
	gcpjwt "github.com/someone1/gcp-jwt-go/v2"
)

func main() {

	gcpjwt.SigningMethodAppEngine.Override()

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
		log.Printf("Defaulting to port %s", port)
	}

	r := api.InitRouter()
	orm.CreateClient()
	log.Printf("Listening on port %s", port)
	r.Run(":" + port)
}
