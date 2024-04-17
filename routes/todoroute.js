const todorouter = require("express").Router();

//importing middleware for user token authentication
const isauth = require("../middleware/isauth");

//importing controllers
const {
  addnewtodo,
  getalltodos,
  gettododetails,
  updatetodo,
  deletetodo,
} = require("../controller/todocontroller");

// Define routes and associate them with corresponding controller functions
todorouter
  .post("/addnewtodo", isauth, addnewtodo) // Route to add new todo
  .get("/getalltodos", isauth, getalltodos) // Route to get all todo
  .get("/gettododetails/:id", isauth, gettododetails) // Route to get todo details
  .put("/updatetodo/:id", isauth, updatetodo) // Route to update a todo
  .delete("/deletetodo/:id", isauth, deletetodo); // Route to delete todo

module.exports = todorouter; // Exporting the user router for use in other modules
