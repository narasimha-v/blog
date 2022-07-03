# Blog

Blog application built with react, node, express, typescript & mysql.

## Installation

Install client and server using yarn package manager.

#### Client

```bash
  cd client
  yarn install
```

#### Server

```bash
  cd server
  yarn install
```

## Client Environment Variables

To run this project, you will need to add the following environment variables to your client .env file

`REACT_APP_API_BASE_URL`

## Server Environment Variables

To run this project, you will need to add the following environment variables to your server .env file

`PORT`

`DB_NAME`

`DB_USERNAME`

`DB_PASSWORD`

`JWT_SECRET`

## Run Locally

To run the project locally you will need to install and setup mysql server and then clone the project

```bash
  git clone https://github.com/narasimha-v/blog.git
```

Go to the project directory

```bash
  cd blog
```

Start the server

```bash
  cd server
  npm run dev
```

Start the client

```bash
  cd client
  npm run start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
