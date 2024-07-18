package main

import (
	"golang-dig/service/post"
	"golang-dig/service/user"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

type ControllerDependency struct {
	dig.In

	PostService post.PServiceI
	UserService user.UServiceI
	App        *gin.Engine
}

type Controller struct {
	post post.PServiceI
	user user.UServiceI
	app *gin.Engine
}

func NewController(dep ControllerDependency) *Controller {
	return &Controller{
		post: dep.PostService,
		user: dep.UserService,
		app: dep.App,
	}
}

func (c *Controller) Register() {
	c.app.GET("/post", c.GetPost)
	c.app.GET("/user", c.GetUser)
}

func (c *Controller) GetPost(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, c.post.GetPost())
}

func (c *Controller) GetUser(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, c.user.GetUser())
}
