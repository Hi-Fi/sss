package main

import (
	"log"
	"os"

	"github.com/hi-fi/sss/core/pkg/api"
	"github.com/hi-fi/sss/core/pkg/orm"
	"github.com/hi-fi/sss/core/pkg/trace"
)

func main() {
	trace.EnableTracing()
	defer trace.StopTracing()

	port := getenv("PORT", getenv("GIN_PORT", "5000"))

	r := api.InitRouter()
	orm.CreateClient()
	log.Printf("Listening on port %s", port)
	r.Run(":" + port)
}

func getenv(key, fallback string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return fallback
	}
	return value
}
