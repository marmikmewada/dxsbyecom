import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Initialize state for date and time
  const [dateTime, setDateTime] = useState(getDateTime());

  // Function to get current date and time
  function getDateTime() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // January is 0, so we add 1
    const formattedDate = `${day}/${month}`;

    const currentTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return { date: formattedDate, time: currentTime };
  }

  // Effect to update date and time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getDateTime());
    }, 60000); // Update every minute

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <div className="App">
      <div className="application">
        <h1>Daily Todos</h1>
        <div className='dateContainer'>
          <a href='https://chat.openai.com/'>{dateTime.time}</a>
          <a href='https://chat.openai.com/'>{dateTime.date}</a>
        </div>
      </div>
      <div className="todos"></div>
    </div>
  );
}

export default App;
