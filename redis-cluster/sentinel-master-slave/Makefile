up:
	@rm -rf ./config
	@mkdir -p ./config
	@cp sentinel.conf ./config/sentinel-1.conf
	@cp sentinel.conf ./config/sentinel-2.conf
	@cp sentinel.conf ./config/sentinel-3.conf
	@cp sentinel.conf ./config/sentinel-4.conf
	@docker-compose up -d

down:
	@docker-compose down
