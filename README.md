# Node - Typescript Project



This project is done with the purpose of studying TypeScript applying:

- SOLID concepts
- Design patterns (Repository, Services, DTO, Services, etc.)
- Best practices.

You just need **docker and docker-compose** to run the full project.



# Available Endpoints

I'm just starting with the application and will update this endpoints as I deliver new versions.



| method | resource        | description             |
| ------ | --------------- | ----------------------- |
| `GET`  | `/appointments` | List all appointments   |
| `POST` | `/appointments` | Create new appointments |



# Getting Started

- Clone the repository

```shell
git clone https://github.com/javieraviles/node-typescript-koa-rest.git
```

- Build and run with docker (We are using **Postgres** as **database**, **Redis** to for **Queue and cache** and all will be installed with Docker)

```shell
docker-compose build

docker-compose up
```