<div align="center">

# Nest GraphQL

**A GraphQL API crash course with NestJS, Apollo, TypeORM, PostgreSQL, and JWT authentication.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

## Overview

Nest GraphQL is a learning project for building a code-first GraphQL API with NestJS. It covers resolvers, DTO validation, relational entities, JWT-protected queries and mutations, database seeding, and structured logging.

## Features

- **Code-first GraphQL** with the Apollo driver.
- **Authentication:** sign-up and sign-in mutations, Argon2 password hashing, and a JWT guard for GraphQL.
- **User CRUD:** queries and mutations for users, with validated DTOs.
- **Relational data model:** users, profiles, posts, and tags with TypeORM.
- **Seeding:** factories and seeders using Faker (`typeorm-extension`).
- **Error handling:** a custom entity-not-found exception filter.
- **Structured logging** with Pino.
- **Docker Compose** setup for PostgreSQL.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | NestJS |
| API | GraphQL (Apollo Server) |
| Database | PostgreSQL 15, TypeORM |
| Authentication | Passport JWT, Argon2 |
| Logging | Pino (nestjs-pino) |
| Infrastructure | Docker Compose |

## Getting Started

### Prerequisites

- Node.js and npm
- Docker (for PostgreSQL)

### Installation

```bash
git clone https://github.com/RithyBondeth/Nest-GraphQL.git
cd Nest-GraphQL
npm install
docker compose up -d     # PostgreSQL on localhost:5432
npm run seed             # optional demo data
npm run start:dev
```

Open the GraphQL playground at [http://localhost:3000/graphql](http://localhost:3000/graphql).

### Environment Variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD` | PostgreSQL connection |
| `DATABASE_SYNCHRONIZE` | Auto-sync the schema (development only) |
| `JWT_SECRET`, `JWT_EXPIRES` | Token signing |

## Project Structure

```text
Nest-GraphQL/
├── src/
│   ├── auth/              # Sign-up and sign-in resolver, JWT strategy and guard
│   ├── user/              # User resolver, service, DTOs
│   └── entity-not-found/  # Exception filter
├── libs/common/src/
│   ├── database/          # Entities, factories, seeders, config
│   ├── graphql/           # GraphQL module
│   ├── jwt/               # JWT module and service
│   └── logger/            # Pino logger
└── docker-compose.yml
```

## Author

**Rithy Bondeth** — Full Stack Developer & AI Engineer

[![Portfolio](https://img.shields.io/badge/Portfolio-0A0A0A?style=for-the-badge&logo=vercel&logoColor=white)](https://bondeth.dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RithyBondeth)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rithy-bondeth-484073282/)

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
