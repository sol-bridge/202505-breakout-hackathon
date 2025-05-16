# Makefile for SolBridge project

# Install dependencies
install:
	pnpm install

# Install and run dev server
dev: install
	pnpm dev

# Build the project
build:
	pnpm build

# Run production server
start:
	pnpm start

# Run linting
lint:
	pnpm lint

# Clean node_modules and reinstall
clean:
	rm -rf node_modules
	rm -f pnpm-lock.yaml
	pnpm install

# Solana program development commands
program-build:
	cd program && cargo build-bpf

program-test:
	cd program && cargo test-bpf

program-deploy:
	cd program && solana program deploy target/deploy/solbridge.so

# Run both frontend and solana test validator
dev-full:
	@echo "Starting Solana test validator and Next.js dev server..."
	@(cd program && solana-test-validator) & \
	(pnpm dev) & \
	wait

# Stop all running processes
stop:
	@echo "Stopping all processes..."
	@pkill -f "solana-test-validator" || true
	@pkill -f "next dev" || true

# Help command
help:
	@echo "Available commands:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Install dependencies and run dev server"
	@echo "  make build        - Build the project"
	@echo "  make start        - Run production server"
	@echo "  make lint         - Run linting"
	@echo "  make clean        - Clean and reinstall dependencies"
	@echo "  make program-build - Build Solana program"
	@echo "  make program-test  - Test Solana program"
	@echo "  make program-deploy - Deploy Solana program"
	@echo "  make dev-full     - Run both frontend and Solana test validator"
	@echo "  make stop         - Stop all running processes"

.PHONY: install dev build start lint clean program-build program-test program-deploy dev-full stop help