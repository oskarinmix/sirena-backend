// Import Modules
require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
//Import Files
const { dbConnection } = require('./database/config');
const user = require('./models/User')

// Create Server
const app = express()




//Middlewwares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000', // <- location of the client
    credentials: true
}))
app.use(cookieParser('secretcode'))
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);


// Database Connection
dbConnection();


// Running Server
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))