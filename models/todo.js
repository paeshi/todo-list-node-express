
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },

})

const listSchema = new Schema({
    name: String,
    items: [todoSchema]
  
  });


const ToDo = mongoose.model("ToDo", todoSchema)
const List = mongoose.model("List", listSchema);


//   const item1 = new ToDo ({
//     name: "Welcome."
//   })
//   const item2 = new ToDo ({
//     name: "Hit the + button to add a new item."
//   })
//   const item3 = new ToDo ({
//     name: "Hit this to delete."
//   })
  
//   const defaultItems = [item1, item2, item3];


module.exports = List;