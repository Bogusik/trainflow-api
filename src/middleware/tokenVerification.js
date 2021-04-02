const jwt = require('jsonwebtoken');
const db = require('../db');

module.exports = async function auth(req, res, next) {
  const token = req.header('Authorization');
  if (token) {
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY);
      [req.user] = await db.select().from('users').where('id', verified.id);
    } catch (e) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
};
