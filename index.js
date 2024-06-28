// Dependencies

const express = require("express");
const bodyParser= require('body-parser');
const {Sequelize, Model, DataTypes} = require("sequelize")

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
})

sequelize.sync();

// Configuration
const port = 3000;
const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Services
app.get("/", (req,res)=>{
  res.json({ message: 'Welcome to expense tracker'})
})

//Run the server application
app.listen(port , ()=>{
  console.log(`server is running at ${port}`);
});