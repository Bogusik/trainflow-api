const dotenv = require('dotenv');

try {
  dotenv.config();
} catch (err) {
  console.log('.env not found. Using environment variables.');
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

async function connectToDb() {
  // Connect to db
  try {
    await db.authenticate();
    console.log('Successfully connected to database.');
  } catch {
    console.log('Failed to connect.');
  }

  // Sync db
  try {
    if (process.env.ENV === 'dev' || process.env.ENV === 'prod') {
      await db.sync();
    } else {
      await db.sync({ force: true });
    }
    console.log('Successfully synced database.');
  } catch {
    console.log('Cannot perform syncing.');
  }
}

connectToDb();

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
