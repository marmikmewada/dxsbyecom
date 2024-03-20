import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState([]); // Ensure todos is initialized as an empty array
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every one second

    return () => clearTimeout(timerId); // Cleanup on unmount
  }, [currentDate]); // Re-run effect whenever currentDate changes
 
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/todos");
        console.log("response",response)
        console.log("responsedata", response.data)
        setTodos(response.data);
        console.log("Fetched todos:", response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []); // Fetch todos only once when component mounts
  // useEffect(() => console.log("hello",todos), [todos]);

  // Format date as "dd/mm" (e.g., "17/04")
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });

  // Format time as "hh:mm AM/PM" (e.g., "01:50 PM")
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
        {/* Todo list */}
        <div className="todo-list">
          {todos.length > 0 ? (
            <div className="todo-list">
              {todos.map((todo) => (
                <div key={todo._id} className="todo-item">
                  {/* ... Your todo content here, using todo.title and todo.description ... */}
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading todos...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
