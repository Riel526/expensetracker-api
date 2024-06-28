// Dependencies

const express = require("express");


// Configuration

const port = 3000;
const app = express();

//Run the server application
app.listen(port , ()=>{
  console.log(`server is running at ${port}`);
});