const express = require("express");

const { protect } = require("../../middleware/authMiddleware");
const {
    addTodo,
    getAllTodos,
    deleteTodo,
    checkTodo,
} = require("./todo.controller");

const todoRouter = express.Router();

todoRouter.use("/", protect);
todoRouter.get("/", getAllTodos);
todoRouter.post("/", addTodo);
todoRouter.delete("/:id", deleteTodo);
todoRouter.put("/:id", checkTodo);

module.exports = todoRouter;
