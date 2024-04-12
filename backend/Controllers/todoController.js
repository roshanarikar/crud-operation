const Todo = require('../Model/Todo');

exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send(todos);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    } catch (error) {
        res.status(500).send(error);
    }
};
