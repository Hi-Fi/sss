package model

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// Enrich song with some basic data if needed
func (s *User) Enrich() {
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
	s.HashedPassword, _ = HashPassword(s.Password)
	s.Password = ""
}

// HashPassword returns the bcrypt hash of the password
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}
	return string(hashedPassword), nil
}
