package orm

import (
	"github.com/hi-fi/sss/auth/pkg/model"
)

// SssUser defines interface for user data persistence on SSS
type SssUser interface {
	GetUser(email string) (model.User, error)
	SaveUser(user *model.User) error
}
