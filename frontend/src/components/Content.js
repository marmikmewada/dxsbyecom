import React from 'react';
import useTodoStore from '../Store';

function Content() {
  const { todos, selectedTodos, updateTodo, deleteTodo, toggleTodoSelection } = useTodoStore();

  const handleUpdateTodo = (todoId, updatedTodo) => {
    updateTodo(todoId, updatedTodo);
  };

  const handleDeleteTodo = (todoId) => {
    deleteTodo(todoId);
  };

  const handleToggleTodoSelection = (todoId) => {
    toggleTodoSelection(todoId);
  };

  return (
    <div className="content">
      {todos.map((todo) => (
        <div key={todo._id} className="todo">
          <input
            type="checkbox"
            checked={selectedTodos.includes(todo._id)}
            onChange={() => handleToggleTodoSelection(todo._id)}
          />
          <input
            type="text"
            value={todo.title}
            onChange={(e) => handleUpdateTodo(todo._id, { title: e.target.value })}
          />
          <textarea
            value={todo.description}
            onChange={(e) => handleUpdateTodo(todo._id, { description: e.target.value })}
          />
          <div>
            <button>Edit</button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Content;
