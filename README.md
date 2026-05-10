## Project setup

```bash
pnpm install
```

## Database setup

```bash
docker compose up -d

pnpm run db:generate
pnpm run db:migrate
```

## Compile and run the project

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Run tests

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

## Swagger

[http://localhost:8000/api/docs](http://localhost:8000/api/docs)

<img width="1617" height="400" alt="image" src="https://github.com/user-attachments/assets/e2a27906-da8f-49d6-bac2-b7ea6ca75aef" />
