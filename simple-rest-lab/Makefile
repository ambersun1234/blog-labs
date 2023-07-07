SCHEMA_LOCATION=./src/database/prisma/schema.prisma
CONTAINER_NAME=db
DB_NAME=restdb
CSV_NAME=./user.csv

demo: demo-down
	@docker-compose up -d

demo-down:
	@docker-compose down

demo-remove: demo-down
	@docker-compose rm > /dev/null 2>&1

dev: docker-start
	@npm run dev-server

docker-start:
	@docker start $(CONTAINER_NAME)
	$(MAKE) prisma

docker-stop:
	@docker stop $(CONTAINER_NAME)

docker-create:
	@docker run -d --name $(CONTAINER_NAME) \
		-p 6630:3306 \
		-v rest-mysql:/var/lib/mysql \
		-e MYSQL_DATABASE=$(DB_NAME) \
      	-e MYSQL_USER=root \
      	-e MYSQL_ROOT_PASSWORD=root \
		mariadb
	@sleep 5
	$(MAKE) migrate-prisma
	@docker cp ./$(CSV_NAME) $(CONTAINER_NAME):/$(CSV_NAME)
	@docker exec -i $(CONTAINER_NAME) bash -c 'exec mariadb -u root -proot' < ./load.sql

docker-remove:
	@docker stop $(CONTAINER_NAME)
	@docker rm -f $(CONTAINER_NAME)
	@docker volume rm rest-mysql

docker-exec:
	@docker exec -it $(CONTAINER_NAME) bash

prisma:
	@export DATABASE_URL=mysql://root:root@localhost:6630/$(DB_NAME) && \
		npx prisma generate --schema $(SCHEMA_LOCATION)

migrate-prisma:
	@export DATABASE_URL=mysql://root:root@localhost:6630/$(DB_NAME) && \
		npx prisma migrate dev --schema $(SCHEMA_LOCATION)

hook:
	@bash ./scripts/install-hook.sh