const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let notifications = [];

app.get('/notifications', (req, res) => {
  res.json(notifications);
});

app.post('/notify', (req, res) => {
  const message = req.body.message;
  notifications.push(message);
  res.status(200).send('Notification sent successfully');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
