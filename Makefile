.PHONY: restart

restart:
	docker compose build astrowind-prod
	docker compose up -d
