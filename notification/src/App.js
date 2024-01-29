
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();

    // Poll for new notifications every 20 seconds (adjust the interval as needed)
    const pollInterval = setInterval(fetchNotifications, 20000);

    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  const fetchNotifications = () => {
    axios.get('http://localhost:5000/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  };

  const sendNotification = () => {
    axios.post('http://localhost:5000/notify', {
      message: 'New Notification received',
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error sending notification:', error);
      });
  };

  return (
    <div className="container">
      <div className="notificationContainer">
        <header>
          <div className="notificationHeader">
            <h1>Notification</h1>
            <span id="num-of">{notifications.length}</span>
          </div>
          <p id="mark-as-read" onClick={() => setNotifications([])}>
            Mark as All Read
          </p>
        </header>
        <main>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </main>
      </div>

      <div>
        <h2>Notifications</h2>
        <button onClick={sendNotification} className="send-notification">
          Send Notification
        </button>
      </div>
    </div>
  );
}

export default App;