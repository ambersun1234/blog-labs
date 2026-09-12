test:
	@npx jest --bail --coverage

unit-test:
	@npx jest --bail --testMatch='./**/unittest/**/*.test.ts' --coverage

integration-test:
	@npx jest --bail --testMatch='./**/integrationtest/**/*.test.ts' --coverage
