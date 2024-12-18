package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type KV struct {
	ID    int64 `gorm:"primaryKey"`
	Key   string
	Value string
}

func NewDB() (*gorm.DB, error) {
	return gorm.Open(postgres.Open("postgresql://uptrace:uptrace@localhost"), &gorm.Config{})
}

func Migrate(conn *gorm.DB) error {
	return conn.AutoMigrate(&KV{})
}
