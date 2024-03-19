// routes/todoRoute.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Create a new todo
router.post('/', todoController.createTodo);

// Get all todos
router.get('/', todoController.getTodos);

// Get a single todo
router.get('/:id', todoController.getTodo);

// Update a todo
router.put('/:id', todoController.updateTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

// Delete many todos at once
router.post('/deleteMany', todoController.deleteManyTodos);

module.exports = router;
