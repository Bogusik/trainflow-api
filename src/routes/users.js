const express = require('express');

const router = express.Router();
const sha = require('js-sha3');
const jwt = require('jsonwebtoken');
const { models } = require('../db');
const { registerValidation, loginValidation } = require('../validators/userValidators');

router.get('/', async (req, res) => {
  if (!req.user) {
    return res.json({ ok: false, message: 'Not authorized' });
  }
  try {
    const user = await models.user.findOne(
      {
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
      },
    );
    if (user) return res.json({ ok: true, user });
    return res.json({ ok: false, message: 'User not found' });
  } catch (e) {
    return res.json({ ok: false, message: e });
  }
});

router.get('/:username', async (req, res) => {
  if (!req.user) {
    return res.json({ ok: false, message: 'Not authorized' });
  }
  try {
    const user = await models.user.findOne(
      {
        where: { username: req.params.username },
        attributes: { exclude: ['password'] },
      },
    );
    if (user) return res.json({ ok: true, user });
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
    const user = models.user.build(req.body);
    await user.save();
    const jsonUser = user.toJSON();
    delete jsonUser.password;
    return res.json({ ok: true, user: jsonUser });
  } catch (e) {
    return res.json({ ok: false, message: e });
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) return res.json({ ok: false, message: error.details[0].message });

  const user = await models.user.findOne({
    where: { username: req.body.username },
  });
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
    await models.user.update(req.body, { where: { id: req.user.id } });
    return res.json({ ok: true });
  } catch (e) {
    return res.json({ ok: false, message: e });
  }
});

router.delete('/', async (req, res) => {
  if (!req.user) {
    return res.json({ ok: false, message: 'Not authorized' });
  }
  try {
    await models.user.destroy(
      { where: { id: req.user.id } },
    );
    return res.json({ ok: true });
  } catch (e) {
    return res.json({ ok: false, message: e });
  }
});

module.exports = router;
