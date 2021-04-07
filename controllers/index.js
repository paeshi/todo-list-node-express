const ToDo = require('../models/todo')
const _= require('lodash');
const List = require('../models/todo')



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

function index (req, res) {

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
  }


  function show (req, res){
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
  };


  function listing (req, res){
  
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
  
  };



  function deleteThis (req, res) {
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
  };

  function showNew(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
  };


function aboutPage (req, res){
    res.render("about");
  };
  






module.exports = {
index, 
show,
listing,
deleteThis,
showNew,
aboutPage

}