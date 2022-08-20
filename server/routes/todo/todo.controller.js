const Todo = require("../../models/todo.model");

const getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};

const addTodo = async (req, res, next) => {
    try {
        if (!req.body.todo) {
            res.status(400);
            throw new Error("Please add a text field");
        }

        const todo = await Todo.create({
            todo: req.body.todo,
            user: req.user.id,
        });

        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

const checkTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            res.status(404).json({ error: "Todo not found" });
        }

        if (!req.user) {
            res.status(401);
            throw new Error("User not found");
        }

        if (todo.user.toString() !== req.user.id) {
            res.status(401).json({ error: "You cant modify this todo" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { user: todo.user, todo: todo.todo, completed: !todo.completed },
            {
                new: true,
            }
        );

        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            res.status(400);
            throw new Error("Todo Not Found");
        }

        //Check for user
        if (!req.user) {
            res.status(401);
            throw new Error("User not found");
        }

        if (todo.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }

        await todo.remove();

        res.status(200).json({ id: req.body.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addTodo,
    getAllTodos,
    deleteTodo,
    checkTodo,
};
