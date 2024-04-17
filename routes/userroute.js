const userrouter = require("express").Router(); //Import express framework and Creating a router instance for user-related routes
const { signup, login } = require("../controller/usercontroller"); // Importing controllers for user operations

// Define routes and associate them with corresponding controller functions
userrouter
  .post("/signup", signup) // Route to register for new user
  .post("/login", login); // Route to user login

module.exports = userrouter; // Exporting the user router for use in other modules
