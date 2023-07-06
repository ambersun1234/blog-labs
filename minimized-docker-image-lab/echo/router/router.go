package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Data interface{}
}

type EchoRequest struct {
	Data string `json:"data"`
}

func Echo(c *gin.Context) {
	var req EchoRequest

	if err := c.BindJSON(&req); err != nil {
		panic(err)
	}
	
	c.JSON(http.StatusOK, &Response{Data: map[string]interface{}{"data": req.Data}})
}
