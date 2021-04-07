//jshint esversion:6

const express = require("express");
// const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const app = express();
const _= require('lodash');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://admin:p2ssword@cluster0.5s4fj.mongodb.net/todolistDB?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection
db.on('connected', function(){
    console.log(`connected to MongoDB on ${db.host} on port: ${db.port}`);
});

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        validation: true
    },

})
const ToDo= mongoose.model("ToDo", todoSchema)

const item1 = new ToDo ({
  name: "Welcome."
})
const item2 = new ToDo ({
  name: "Hit the + button to add a new item."
})
const item3 = new ToDo ({
  name: "Hit this to delete."
})

const defaultItems = [item1, item2, item3];

const listSchema = new Schema({
  name: String,
  items: [todoSchema]

});

const List = mongoose.model("List", listSchema);

// ToDo.insertMany(defaultItems, function(err){
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("successfully saved")
//   }

// })

app.get("/", function(req, res) {

  ToDo.find({}, function(err, foundItems){
  if(foundItems.length === 0) {
    ToDo.insertMany(defaultItems, function(err){
  if (err) {
    console.log(err)
  } else {
    console.log("successfully saved")
  }

});

res.redirect('/');
  } else {
  res.render("list", {listTitle: "Today", newListItems: foundItems});
  }
});
})




app.get('/:customListName', function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList) {
  if (!err) {
    if (!foundList) {
      const list = new List({
      name: customListName,
      items: defaultItems
    });
    list.save();
    res.redirect('/' + customListName)

    } else {
      res.render('list', {listTitle: foundList.name, newListItems: foundList.items});
      }
    }

  });
});


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new ToDo({
    name: itemName
  });

  if (listName === "Today") {

  
  item.save();
res.redirect('/')
  } else {
    List.findOne({name: listName}, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect('/'+ listName)
    })
  }

});



app.post('/delete', function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

if (listName === "Today") {
  ToDo.findByIdAndRemove(checkedItemId, function(err) {
    if (err) {
      console.log('no bueno');
    } else {
      console.log('successfully deleted');
      res.redirect('/')
    }
  })
} else {
  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
    if (!err) {
      res.redirect('/' + listName)
    }
  })
 }
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
