package main

import (
	"io"
	"os"

	"migration/model"

	_ "ariga.io/atlas-go-sdk/recordriver"
	"ariga.io/atlas-provider-gorm/gormschema"
)

const (
	dbDialect = "postgres"
)

func main() {
	ddl, err := gormschema.New(dbDialect).Load(&model.User{})
	if err != nil {
		panic(err)
	}

	io.WriteString(os.Stdout, ddl)
}
