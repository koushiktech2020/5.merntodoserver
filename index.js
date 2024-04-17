const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

//import database connection
const { dbconnect } = require("./utils/dbconnect");

// env file configure
dotenv.config();

// database connection
dbconnect();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

//import all routes
const userRoutes = require("./routes/userroute"); //for demo
const todoRoutes = require("./routes/todoroute"); //for login and registration

//routers
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

app.get("/", (req, res, next) => {
  res.send("<h1>Todo rest api</h1>");
});

app.listen(PORT, () => {
  console.log(`Connection started at ${PORT}`);
});
