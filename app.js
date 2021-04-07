//jshint esversion:6

const express = require("express");
// const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const app = express();
const indexRouter = require('./routes/index')
// const ToDo = require('./models/todo');

require('dotenv').config();
require('./config/database')


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use('/', indexRouter)
app.use('/delete', indexRouter);
app.use('/work', indexRouter);
app.use('/about', indexRouter);




// const item1 = new ToDo ({
//   name: "Welcome."
// })
// const item2 = new ToDo ({
//   name: "Hit the + button to add a new item."
// })
// const item3 = new ToDo ({
//   name: "Hit this to delete."
// })

// const defaultItems = [item1, item2, item3];




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
