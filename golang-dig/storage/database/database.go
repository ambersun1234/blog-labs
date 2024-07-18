package database

type Database struct{}

// func NewDatabase() storage.StorageI {
func NewDatabase() *Database {
	return &Database{}
}

func (d *Database) Get() string {
	return "get from database"
}
