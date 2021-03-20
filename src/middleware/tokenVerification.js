const jwt = require('jsonwebtoken');
const { models } = require('../db');

module.exports = async function auth(req, res, next) {
  const token = req.header('Authorization');
  if (token) {
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await models.user.findByPk(verified.id);
    } catch (e) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
};
