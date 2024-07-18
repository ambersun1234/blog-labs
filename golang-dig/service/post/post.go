package post

import (
	"fmt"
	"golang-dig/storage"

	"go.uber.org/dig"
)

type PServiceI interface {
	GetPost() map[string]any
}

type PostDependency struct {
	dig.In

	Storage storage.StorageI
}

type Post struct {
	storage storage.StorageI
}

func NewPostService(dep PostDependency) PServiceI {
	return &Post{
		storage: dep.Storage,
	}
}

func (p *Post) GetPost() map[string]any {
	return map[string]any{
		"data": fmt.Sprintf("post service, %s", p.storage.Get()),
	}
}
