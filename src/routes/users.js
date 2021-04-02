const express = require('express');

const router = express.Router();
const sha = require('js-sha3');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { registerValidation, loginValidation } = require('../validators/userValidators');

router.get('/', async (req, res) => {
  if (!req.user) {
    return res.json({ ok: false, message: 'Not authorized' });
  }
  try {
    const [user] = await db('users').select().where('id', req.user.id);
    if (user) {
      delete user.password;
      return res.json({ ok: true, data: user });
    }
    return res.json({ ok: false, message: 'User not found' });
  } catch (e) {
    return res.json({ ok: false, message: e });
  }
});

router.get('/test', async (req, res) => {
  const employees = await db('users').select();
  for (let i = 0; i < employees.length; i += 1) {
    delete employees[i].password;
  }
  return res.json({ ok: true, employees });
});

router.get('/:username', async (req, res) => {
  if (!req.user) {
    return res.json({ ok: false, message: 'Not authorized' });
  }
  try {
    const [user] = await db('users').select().where('username', req.params.username);
    if (user) {
      delete user.password;
      return res.json({ ok: true, data: user });
    }
    return res.json({ ok: true, message: 'User not found' });
  } catch (e) {
    return res.json({ ok: false, message: e });
  }
});

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) return res.json({ ok: false, message: error.details[0].message });

  try {
    req.body.password = sha.sha3_512(req.body.password);
    const [id] = await db('users').insert(req.body).returning('id');
    delete req.body.password;
    req.body.id = id;
    return res.json({ ok: true, data: req.body });
  } catch (e) {
    return res.json({ ok: false, message: e });
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) return res.json({ ok: false, message: error.details[0].message });

  const [user] = await db('users').select().where('username', req.body.username);
  if (!user) return res.json({ ok: false, message: 'Not a valid username' });

  const passValid = sha.sha3_512(req.body.password) === user.password;
  if (!passValid) return res.json({ ok: false, message: 'Not a valid password' });

  const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

  return res.json({ ok: true, token });
});

router.patch('/', async (req, res) => {
  if (!req.user) {
    return res.json({ ok: false, message: 'Not authorized' });
  }
  try {
    await db('users').where('id', req.user.id).update(req.body);
    const [user] = await db('users').select().where('id', req.user.id);
    delete user.password;
    return res.json({ ok: true, data: user });
  } catch (e) {
    return res.json({ ok: false, message: e });
  }
});

router.delete('/', async (req, res) => {
  if (!req.user) {
    return res.json({ ok: false, message: 'Not authorized' });
  }
  try {
    await db('users').where('id', req.user.id).delete();
    return res.json({ ok: true });
  } catch (e) {
    return res.json({ ok: false, message: e });
  }
});

module.exports = router;
