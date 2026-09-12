SCHEMA_LOCATION=./src/database/prisma/schema.prisma
CONTAINER_NAME=db
DB_NAME=restdb
CSV_NAME=./user.csv

include test.mk

include benchmark.mk

generate-user-csv:
	@python3 generate-user-csv.py --count 3000000 --output user.csv

generate-post-csv:
	@python3 generate-post-csv.py --count 2000000 --output post.csv

demo: demo-down
	@docker-compose up -d --build

demo-down:
	@docker-compose down -v

demo-remove: demo-down
	@docker-compose rm > /dev/null 2>&1

dev: docker-start
	@npm i
	@npm run dev-server

prisma:
	@export DATABASE_URL=mysql://root:root@localhost:6630/$(DB_NAME) && \
		npx prisma@4.16.2 generate --schema $(SCHEMA_LOCATION)

migrate-prisma:
	@export DATABASE_URL=mysql://root:root@localhost:6630/$(DB_NAME) && \
		npx prisma@4.16.2 migrate dev --name init --schema $(SCHEMA_LOCATION)

hook:
	@bash ./scripts/install-hook.sh
