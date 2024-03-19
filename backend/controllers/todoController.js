// controllers/todoController.js
const Todo = require('../models/todoModel');

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;

    const todo = new Todo({
      title: title,
      description: description
    });

    await todo.save();
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single todo
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;

    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      title: title,
      description: description,
      completed: completed
    }, { new: true });

    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete many todos at once
exports.deleteManyTodos = async (req, res) => {
  try {
    const todoIdsToDelete = req.body.todoIds; // Assuming todoIds is an array of todo IDs sent from the frontend

    const result = await Todo.deleteMany({ _id: { $in: todoIdsToDelete } });
    if (result.deletedCount > 0) {
      res.status(200).json({ success: true, message: 'Selected todos deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'No matching todos found for deletion' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
