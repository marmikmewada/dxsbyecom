import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearTimeout(timerId);
  }, [currentDate]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/todos");
        setTodos(response.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [todos]);

  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const addTodo = async () => {
    if (title.trim() !== "" && description.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:8000/api/todos", {
          title,
          description,
        });
        setTodos([...todos, response.data]);
        setTitle("");
        setDescription("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    } else {
      alert("Please enter title and description for the todo.");
    }
  };

  const handleEditTodo = (todoId) => {
    setEditingTodo(todoId);
  };

  const handleSaveEdit = async (todoId) => {
    if (title.trim() !== "" && description.trim() !== "") {
      try {
        const updatedTodo = { title, description };
        const response = await axios.put(
          `http://localhost:8000/api/todos/${todoId}`,
          updatedTodo
        );
        const updatedTodos = todos.map((todo) =>
          todo._id === todoId ? response.data : todo
        );
        setTodos(updatedTodos);
        setEditingTodo(null);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      alert("Please enter title and description for the edited todo.");
    }
  };

  const handleDeleteTodo = async (todoId) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/todos/${todoId}`
        );
        if (response.status === 200) {
          const remainingTodos = todos.filter((todo) => todo._id !== todoId);
          setTodos(remainingTodos);
        } else {
          console.error("Error deleting todo:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
      setEditingTodo(null);
    }
  };

  return (
    <div className="App">
      <div className="navbar-1">
        <h1>Todo App</h1>
        <div className="dateandtime">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
      </div>
      <div className="Todo-container">
        <div className="add-todo">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <div className="todo-list" key={todos.length}>
          {todos.map((todo) => (
            <div key={todo._id} className="todo-item">
              {editingTodo === todo._id ? (
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
                </div>
              ) : (
                <>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </>
              )}
              <div className="todo-actions">
                <button onClick={() => handleEditTodo(todo._id)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
