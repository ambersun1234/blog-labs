package user

import (
	"fmt"
	"golang-dig/storage"

	"go.uber.org/dig"
)

type UServiceI interface {
	GetUser() map[string]any
}

type UserDependency struct {
	dig.In

	Storage storage.StorageI
}

type User struct {
	storage storage.StorageI
}

func NewUserService(dep UserDependency) UServiceI {
	return &User{
		storage: dep.Storage,
	}
}

func (u *User) GetUser() map[string]any {
	return map[string]any{
		"data": fmt.Sprintf("user service, %s", u.storage.Get()),
	}
}
