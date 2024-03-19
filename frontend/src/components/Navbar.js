import React from 'react';
import useTodoStore from '../Store';

function Navbar() {
  const { selectedTodos, addTodo, deleteManyTodos } = useTodoStore();

  const handleAddTodo = () => {
    addTodo();
  };

  const handleDeleteSelected = () => {
    deleteManyTodos(selectedTodos);
  };

  return (
    <div className="navbar">
      {selectedTodos.length === 0 && <button onClick={handleAddTodo}>Add Todo</button>}
      {selectedTodos.length > 0 && (
        <button onClick={handleDeleteSelected}>Delete Selected</button>
      )}
    </div>
  );
}

export default Navbar;
