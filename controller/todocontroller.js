const Todo = require("../model/todomodel");

const dotenv = require("dotenv");

// env file configure
dotenv.config();

//add new todo
exports.addnewtodo = async (req, res, next) => {
  try {
    const userId = req.userdata.userid; // verify from token isauth.js

    //create new todo
    const newtodo = new Todo({
      owner: userId,
      title: req.body.title,
      mark: req.body.mark || false,
    });

    //save todo and respond
    const result = await newtodo.save();

    res.status(200).json({
      status: true,
      data: result,
      message: "todo cretead",
    });
  } catch (error) {
    res.status(202).json({ status: false, message: error.message });
  }
  next();
};

//get all todo
exports.getalltodos = async (req, res, next) => {
  try {
    const userId = req.userdata.userid; // verify from token isauth.js

    let query = {
      owner: userId,
    };

    const todolist = await Todo.find(query).lean();

    res.status(200).json({
      status: true,
      data: todolist,
      message: "todo list fethced successfully",
    });
  } catch (error) {
    res.status(202).json({ status: false, message: error.message });
  }
  next();
};

//get todo details
exports.gettododetails = async (req, res, next) => {
  try {
    const todoResult = await Todo.findById(req.params.id).lean();

    res.status(200).json({
      status: true,
      data: todoResult,
      message: "todo Details fethced successfully",
    });
  } catch (error) {
    res.status(202).json({ status: false, message: error.message });
  }
  next();
};

//update todo
exports.updatetodo = async (req, res, next) => {
  try {
    const result = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ status: true, data: result, message: "todo updated" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
  next();
};

//delete todo
exports.deletetodo = async (req, res, next) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);

    if (result) {
      res
        .status(200)
        .json({ status: true, data: null, message: "todo deleted" });
    } else {
      res.status(404).json({
        status: false,
        data: null,
        message: "todo not found",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
  next();
};
