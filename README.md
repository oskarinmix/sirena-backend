# Sirena Backend

## DESCRIPTION

This is a rest API for the backend of a mail application, is created in NODE.js and Express.js.
the endpoints are described down below, it provides authentication for user using the passport protocol with a local strategy using email and password. For the database , I used MONGODB, and mongoose for connect all the models.

## ENDPOINTS

There are 3 types of endpoints

### AUTH ENDPOINTS

`POST /auth/login` this endpoint login the user and create the session

`GET /auth/isauth` this endpoint returns if a user is authenticated

`POST /auth/logout` this endpoint is used to destroy the session and logout the app

### MAILS ENDPOINTS

`GET /mails?page=x` this enpoint returns all the mails paginated, page default=

`POST /mails?page=1&search=xxx` this endpoint filter the mails with the phrase by subject or message and return it

### SAVED SEARCH ENDPOINTS

`POST /search` this endpoint save the search

`GET /search` this endpoint return the saved searchs

`DELETE /search/:id` this endpoint delete the specific saved search

## DEPLOY

The backend was deployed in HEROKU

`https://sirenabackend.herokuapp.com/`

## GITHUB

The project is `https://github.com/oskarinmix/sirena-backend`

## ENVIROMENT VARIABLES

Create a .env file and create the variables

`PORT=4000` is the port where the app is running

`CLIENT_ADDRESS=http://localhost:3000` is the address where the client is hosted, this is to be used by cors, by default localhost port 3000

`DATABASE_MONGO=mongodb+srv://oskarinmix:oskarin123@express-auth.ts3od.mongodb.net/express-auth?retryWrites=true&w=majority` this is the database URL

Also you can rename the .env example to .env and add the enviroment variables

## INSTALL AND RUN

Run the commmand `npm install` install all the modules necesaries to run the project

Run the command `npm start` it starts the server

Running this both commands the backend is ready and running.
