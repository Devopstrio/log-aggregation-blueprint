.PHONY: help build up down test lint migrate ingest-sample parse-logs analyze-trends generate-report

help:
	@echo "Log Aggregation Blueprint - Management Commands"
	@echo "---------------------------------------------"
	@echo "build           : Build all containers"
	@echo "up              : Start all services"
	@echo "down            : Stop all services"
	@echo "test            : Run all tests"
	@echo "lint            : Run linting checks"
	@echo "migrate         : Run database migrations"
	@echo "ingest-sample   : Push sample logs into the ingestion pipeline"
	@echo "parse-logs      : Trigger log parsing and normalization worker"
	@echo "analyze-trends  : Execute log analytics and anomaly detection"
	@echo "generate-report : Create executive observability summary"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

ingest-sample:
	docker-compose exec api python scripts/ingest/push_sample_logs.py

parse-logs:
	docker-compose exec api python scripts/parse/normalize_stream.py

analyze-trends:
	docker-compose exec api python scripts/analyze/compute_metrics.py

generate-report:
	docker-compose exec api python scripts/report/create_obs_summary.py
