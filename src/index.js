const dotenv = require('dotenv');

try {
  dotenv.config();
} catch (err) {
  console.log('.env not found. Using environment variables.');
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authToken = require('./middleware/tokenVerification');

// App instance
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authToken);

// Routes
const routes = require('./routes');

app.use('/api/user', routes.userRouter);

module.exports = app;
