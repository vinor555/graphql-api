
# GraphQL API with Apollo Server and PostgreSQL (Dockerized)

## Description

This project is a fully Dockerized GraphQL API built using Apollo Server and connected to a PostgreSQL database. It manages `Users`, `Posts`, and `Comments` entities with built-in authentication (JWT) and authorization. The app also includes database migrations powered by Liquibase.

## Features

- **GraphQL API** using Apollo Server.
- **PostgreSQL Database** inside Docker.
- **JWT-based Authentication** for user management.
- **Role-based Authorization** for secure data access.
- **Liquibase** for database version control and migrations.
- **Unit Tests** for API endpoints using Jest and Supertest.
- **Fully Dockerized** for seamless containerized deployment.

## Prerequisites

Before running the project, make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/) and npm (only if you plan to run the app outside of Docker)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://kevin555@bitbucket.org/kevin555/graphql-api.git
cd graphql-api
```

### 2. Start the Application (Dockerized)

Run the following command to build and start the Docker containers for the API, PostgreSQL, and Liquibase:

```bash
sudo docker-compose up --build
```

### Run Liquibase Migrations
docker-compose exec app liquibase update

### Running Tests
docker-compose exec app npm run test


The application will automatically:

- Build the Node.js application
- Set up the PostgreSQL database
- Run Liquibase to apply database migrations

Once the setup completes, you'll see a message indicating that the server is running:

```
🚀 Server ready at http://localhost:4000/
```

### 3. Access the GraphQL API

Access the GraphQL API by visiting [http://localhost:4001/graphql](http://localhost:4001/graphql) in your browser or using a tool like [Postman](https://www.postman.com/) or [GraphQL Playground](https://studio.apollographql.com/sandbox/explorer).

## GraphQL Queries and Mutations

### **1. User Registration**

Registers a new user.

```graphql
mutation {
  register(username: "newuser", password: "password123", role: "user")
}
```

### **2. User Login**

Log in to obtain a JWT token for authentication.

```graphql
mutation {
  login(username: "newuser", password: "password123")
}
```

### **3. Create a Post (Authenticated)**

Requires a valid JWT token in the request headers.

```graphql
mutation {
  createPost(title: "Mi primera publicación", content: "Este es el contenido de la publicación") {
    id
    title
    content
  }
}
```

### **4. Create a Comment (Authenticated)**

Requires a valid JWT token in the request headers.

```graphql
mutation {
  createComment(postId: 1, content: "Este es un comentario") {
    id
    content
  }
}
```

### **5. Fetch Users**

```graphql
query {
  users {
    id
    username
    role
  }
}
```

### **6. Fetch Posts**

```graphql
query {
  posts {
    id
    title
    content
    user {
      username
    }
    comments {
      content
    }
  }
}
```

### **7. Fetch Comments**

```graphql
query {
  comments {
    id
    content
    user {
      username
    }
    post {
      title
    }
  }
}
```
