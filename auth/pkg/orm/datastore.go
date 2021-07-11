package orm

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/datastore"
	"github.com/hi-fi/sss/auth/pkg/model"
)

var (
	client *datastore.Client
	ctx    *context.Context
)

func CreateClient() *datastore.Client {
	dsCtx := context.Background()
	dsClient, err := datastore.NewClient(dsCtx, datastore.DetectProjectID)
	if err != nil {
		log.Println("Error Connecting to Datastore::", err)
	}
	client = dsClient
	ctx = &dsCtx
	return client
}

func GetUserWithId(id string) (user model.User, err error) {
	key := datastore.NameKey("User", id, nil)
	err = client.Get(*ctx, key, &user)
	if err == nil {
		user.ID = user.Key.Name
	}
	return user, err
}

func GetUser(searchUser model.User) (user model.User, err error) {
	var userNames []model.User
	var userEmails []model.User
	nameQuery := datastore.NewQuery("User").Filter("username =", searchUser.Username).Limit(1)
	client.GetAll(*ctx, nameQuery, &userNames)
	emailQuery := datastore.NewQuery("User").Filter("email =", searchUser.Email).Limit(1)
	client.GetAll(*ctx, emailQuery, &userEmails)
	users := unique(append(userNames, userEmails...))
	if len(users) > 0 {
		user = users[0]
		user.ID = user.Key.Name
	}
	return
}

func SaveUser(user *model.User) error {
	existingUser, err := GetUser(*user)
	if err == nil && existingUser.ID == "" {
		key := datastore.NameKey("User", user.ID, nil)
		_, err = client.Put(*ctx, key, user)
	} else {
		log.Printf("Tried to recreate user with email %s", user.Email)
		err = fmt.Errorf("invalid information given")
	}
	return err
}

func unique(users []model.User) []model.User {
	keys := make(map[int]bool)
	list := []model.User{}
	for _, entry := range users {
		if _, value := keys[int(entry.Key.ID)]; !value {
			keys[int(entry.Key.ID)] = true
			list = append(list, entry)
		}
	}
	return list
}
