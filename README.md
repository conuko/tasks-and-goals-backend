# Tasks and Goals / Backend

A Node.js REST API built with Express.js with resource endpoints that use Prisma Client to handle database operations against a PostgreSQL database. Hosted on Heroku.

## Summary

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Data Base](#database)
- [Authentication](#authentication)

## Prerequisites

1. Node.js v16.x.x installed on your machine
2. Npm installed on your machine
3. Docker installed on your machine

## Getting started

1. `npm install` to install the dependencies
2. `npm run db:up` to launch the PostgreSQL database server
3. Connect your database: create a .env file with the following content and make sure to change the database credentials to the ones you specified in the Docker Compose file

`DATABASE_URL=postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public`

`ACCESS_TOKEN_SECRET=<your secret access token>`

You now need to adjust the connection URL to point to your own database.

4. `npx prisma migrate dev --name init` to map your data model from the prisma schema to the database schema.

5. `npm run dev` to run the server

## Tech Stack

1. **Prisma**
   At the core of Prisma is the [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema) – a declarative configuration where you define your data model and other Prisma-related configuration. The Prisma schema is also a single source of truth for both Prisma Client and Prisma Migrate.
   [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate) is used to create the database schema. Based on the Prisma schema, you can create a migration file that adds or removes fields, or changes the type of a field. Prisma Migrate also supports adding and removing relations between models.

2. **Node.js and Express.js**
   Express.js is a minimalistic framework for Node.js that provides a robust set of features for web applications.
   The Express Server handles all CRUD operations and routes.
   [Express.js](https://expressjs.com/)

3. **PostgreSQL**
   PostgreSQL is a relational database management system (RDBMS) that runs on top of the PostgreSQL server.

## Architecture



## API Endpoints

The following endpoints are available:

| Endpoints                  | Usage                                                       |
| -------------------------- | ----------------------------------------------------------- |
| `GET /tasks/author/:email` | Get all tasks of one specific user.                         |
| `POST /auth`               | Register a new user.                                        |
| `POST /auth/login`         | Login as a user.                                            |
| `POST /task`               | Add a new task which is connected via email with the user.  |
| `PUT /task/check/:id`      | Check an existing task by setting checked field to true.    |
| `PUT /task/uncheck/:id`    | Uncheck an existing task by setting checked field to false. |
| `DELETE /task/:id`         | Delete a task.                                              |

## Database

The DB Schema includes a User and a Task. It is designed in the following way:

![Bildschirmfoto 2022-05-01 um 01 05 41](https://user-images.githubusercontent.com/50672977/166125460-90eb4dcf-ddc2-4532-b60e-910bc1c2a018.png)


## Authentication

- Uses JWT for token-based authentication. [JSON Web Token](https://jwt.io/)
- Uses bcrypt for securely hash and salt passwords. [bcrypt](https://www.npmjs.com/package/bcryptjs)

![Authentication](https://user-images.githubusercontent.com/50672977/166125473-7d32be27-ef26-4053-8c7a-0bc0a4cabf8d.png)

