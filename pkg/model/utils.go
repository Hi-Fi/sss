package model

import (
	"time"

	"github.com/google/uuid"
)

// Enrich song with some basic data if needed
func (s *Song) Enrich() {
	if s.ID == "" {
		newID, _ := uuid.NewUUID()
		s.ID = newID.String()
	}

	if s.Created.IsZero() {
		s.Created = time.Now()
	}

	if s.Updated.IsZero() {
		s.Updated = time.Now()
	}
}
