package main

import (
	"golang-dig/service/post"
	"golang-dig/service/user"
	"golang-dig/storage/inmemory"
	"golang-dig/storage"

	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func main() {
	container := dig.New()

	if err := container.Provide(func() *gin.Engine {
		gin.SetMode(gin.DebugMode)
		server := gin.New()
		return server
	}); err != nil {
		panic(err)
	}

	if err := container.Provide(inmemory.NewInMemory, dig.As(new(storage.StorageI))); err != nil {
		panic(err)
	}

	if err := container.Provide(post.NewPostService); err != nil {
		panic(err)
	}
	if err := container.Provide(user.NewUserService); err != nil {
		panic(err)
	}

	if err := container.Provide(NewController); err != nil {
		panic(err)
	}

	if err := container.Invoke(func(controller *Controller, server *gin.Engine) {
		controller.Register()
		server.Run(":8080")
	}); err != nil {
		panic(err)
	}
}
