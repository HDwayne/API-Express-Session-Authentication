docker exec -it authnodecoderealm-cache-1 redis-cli -a secret

# Express Auth Server with Node.js, Redis and MongoDB

This is a simple authentication server API built with Node.js, Express, and Redis and MongoDB. Auth is based on sessions and cookies. It uses sessions for authentication and stores session data in Redis. It uses MongoDB to store user data. It also uses Docker to run Redis and MongoDB.

---

## Getting Started

> Note: **mongoDB** and **redis** is used in this project. You can use docker to run them.

### Install dependencies

```bash
cd api
npm install
cd ..
```

### Run the server

```bash
npm run dev
```

### Run Docker services (mongoDB and redis)

```bash
npm run docker:up
```

this command will create two containers described in `docker-compose.yml` file.

---

## API Endpoints

### Register

> only guest users can register. If a user is already logged in, they must log out before registering a new account.

```http
POST /register
```

```json
{
  "email": "",
  "name": "",
  "password": "",
  "passwordConfirm": ""
}
```

error response:

```json
{
  "message": "Invalid email!"
}
```

### Login

> Only guest users can login. If a user is already logged in, they must log out before logging in to a different account.

```http
POST /login
```

```json
{
  "email": "",
  "password": ""
}
```

error response:

```json
{
  "message": "Invalid email or password!"
}
```

### Logout

> Only logged in users can logout. If a user is not logged in, they cannot log out.

```http
POST /logout
```

### API error responses

Active middleware check the validity of the session if user is logged in. If session is not valid, it will return this error:

```json
{
  "message": "Session expired!"
}
```

with guest middleware added on route, if user is logged in, it will return this error:

```json
{
  "message": "You are already logged in!"
}
```

with auth middleware addes on route, if user is not logged in, it will return this error:

```json
{
  "message": "You must be logged in!"
}
```

joi library is used to validate request body. If request body is not valid, it will return a message with all the errors in the request body. example:

```json
{
  "message": "\"email\" is not allowed to be empty"
}
```

api will return 404 error if the route is not found.

```json
{
  "message": "Not Found!"
}
```

api will return 500 error if there is an internal server error.

```json
{
  "message": "Internal Server Error!"
}
```

success response:

```json
{
  "message": "OK"
}
```

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [Redis](https://redis.io/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
