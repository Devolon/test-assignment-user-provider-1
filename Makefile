build:
	docker buildx build --platform linux/amd64,linux/arm64 -o type=registry -t dev0l0n/test-assignment-user-provider-1:latest .
