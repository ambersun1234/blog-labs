package inmemory

type InMemory struct{}

func NewInMemory() *InMemory {
	return &InMemory{}
}

func (i *InMemory) Get() string {
	return "get from in-memory"
}
