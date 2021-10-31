package orm

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/datastore"
	"github.com/hi-fi/sss/auth/pkg/model"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/trace"
)

var (
	client *datastore.Client
	tracer *trace.Tracer
)

func CreateClient() *datastore.Client {
	dsCtx := context.Background()
	dsClient, err := datastore.NewClient(dsCtx, datastore.DetectProjectID)
	if err != nil {
		log.Println("Error Connecting to Datastore::", err)
	}
	client = dsClient
	dsTracer := otel.GetTracerProvider().Tracer("datastore")
	tracer = &dsTracer
	return client
}

func GetUserWithId(ctx context.Context, id string) (user model.User, err error) {
	spanCtx, span := (*tracer).Start(ctx, "GetUserWithId")
	defer span.End()
	key := datastore.NameKey("User", id, nil)
	dsSpanCtx, dsSpan := (*tracer).Start(spanCtx, "datastore.Get")
	err = client.Get(dsSpanCtx, key, &user)
	dsSpan.End()
	if err == nil {
		user.ID = user.Key.Name
	}
	return user, err
}

func GetUser(ctx context.Context, searchUser model.User) (user model.User, err error) {
	spanCtx, span := (*tracer).Start(ctx, "GetUser")
	defer span.End()
	var userNames []model.User
	var userEmails []model.User
	nameQuery := datastore.NewQuery("User").Filter("username =", searchUser.Username).Limit(1)
	dsSpanCtx, dsSpan := (*tracer).Start(spanCtx, "datastore.GetAll")
	client.GetAll(dsSpanCtx, nameQuery, &userNames)
	dsSpan.End()
	emailQuery := datastore.NewQuery("User").Filter("email =", searchUser.Email).Limit(1)
	dsSpanCtx, dsSpan = (*tracer).Start(spanCtx, "datastore.GetAll")
	client.GetAll(dsSpanCtx, emailQuery, &userEmails)
	dsSpan.End()
	users := unique(append(userNames, userEmails...))
	if len(users) > 0 {
		user = users[0]
		user.ID = user.Key.Name
	}
	return
}

func SaveUser(ctx context.Context, user *model.User) error {
	spanCtx, span := (*tracer).Start(ctx, "SaveUser")
	defer span.End()
	existingUser, err := GetUser(spanCtx, *user)
	if err == nil && existingUser.ID == "" {
		key := datastore.NameKey("User", user.ID, nil)
		dsSpanCtx, dsSpan := (*tracer).Start(spanCtx, "datastore.Put")
		_, err = client.Put(dsSpanCtx, key, user)
		dsSpan.End()
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
