# Node - Typescript Project



This project is done with the purpose of studying **TypeScript** applying:

- SOLID concepts
- Design patterns (Repository, Services, DTO, etc.)
- Best practices.

You just need **docker and docker-compose** to run the full project.



# Available Endpoints

I'm just starting with the application and will update this endpoints as I deliver new versions.



| method  | resource        | description                 |
| ------- | --------------- | --------------------------- |
| `GET`   | `/appointments` | List all appointments       |
| `POST`  | `/appointments` | Create new appointments     |
| `POST`  | `/sessions`     | Login to create new session |
| `POST`  | `/users`        | Create new user             |
| `PATCH` | `/users/avatar` | Update users avatar         |



# Getting Started

- Clone the repository

```shell
git clone https://github.com/phillipperocha/ts-barbershop-backend.git
```

- Build and run with docker (We are using **Postgres** as **database**, **Redis** to for **Queue and cache** and all will be installed with Docker)

```shell
docker-compose build

docker-compose up
```