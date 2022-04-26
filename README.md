# Tasks and Goals / Backend

A REST-API with Prisma and PostgreSQL.

## Prerequisites

1. Node.js v16.x.x installed on your machine
2. Docker installed on your machine

## Get started

1. Install dependencies
   `npm install`
2. Launch the PostgreSQL database server
   `db:up`
3. Connect your database: create a .env file with the following content and make sure to change the database credentials to the ones you specified in the Docker Compose file

`DATABASE_URL=postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public`
`ACCESS_TOKEN_SECRET=<your secret access token>`

You now need to adjust the connection URL to point to your own database.

4. OPTIONAL: Creating the database schema: there is already a schema and migrations. But if you want to change the schema you can change the schema in the following file
   `prisma/schema.prisma`
   To map your data model to the database schema, you need to use the prisma migrate CLI commands
   `npx prisma migrate dev --name init`

5. Run the server
   `npm run dev`

## Prisma and PostgreSQL

At the core of Prisma is the [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema) – a declarative configuration where you define your data model and other Prisma-related configuration. The Prisma schema is also a single source of truth for both Prisma Client and Prisma Migrate.

[Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate) is used to create the database schema. Based on the Prisma schema, you can create a migration file that adds or removes fields, or changes the type of a field. Prisma Migrate also supports adding and removing relations between models.

## Authentication

- Uses JWT for token-based authentication. [JSON Web Token](https://jwt.io/)
- Uses bcrypt for securely hash and salt passwords. [bcrypt](https://www.npmjs.com/package/bcryptjs)
