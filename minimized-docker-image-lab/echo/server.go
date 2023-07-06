package main

import (
	"echo/router"

	"github.com/gin-gonic/gin"
)

func main() {
	route := gin.Default()

	route.POST("/echo", router.Echo)

	route.Run()
}
