package main

import (
	"log"
	"os"

	"github.com/hi-fi/sss/auth/pkg/api"
	"github.com/hi-fi/sss/auth/pkg/orm"
)

func main() {
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
