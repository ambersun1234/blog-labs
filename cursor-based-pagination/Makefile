SCHEMA_LOCATION=./src/database/prisma/schema.prisma
CONTAINER_NAME=db
DB_NAME=restdb
CSV_NAME=./user.csv

generate-csv:
	@python3 generate-user-csv.py --count 200000 --output user.csv

test:
	@npx jest --bail --coverage

unit-test:
	@npx jest --bail --testMatch='./**/unittest/**/*.test.ts' --coverage

integration-test:
	@npx jest --bail --testMatch='./**/integrationtest/**/*.test.ts' --coverage

benchmark-deferred-join:
	@taskset 0xf uv run benchmark-deferred-join.py
	@gnuplot ./benchmark-deferred-join.gp

benchmark-sort:
	@uv run benchmark-sort.py
	@gnuplot ./benchmark-sort-plot.gp

benchmark:
	@uv run benchmark.py
	@gnuplot ./benchmark-plot.gp

demo: demo-down
	@docker-compose up -d --build

demo-down:
	@docker-compose down

demo-remove: demo-down
	@docker-compose rm > /dev/null 2>&1

dev: docker-start
	@npm i
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
		npx prisma@4.16.2 generate --schema $(SCHEMA_LOCATION)

migrate-prisma:
	@export DATABASE_URL=mysql://root:root@localhost:6630/$(DB_NAME) && \
		npx prisma@4.16.2 migrate dev --name init --schema $(SCHEMA_LOCATION)

hook:
	@bash ./scripts/install-hook.sh
