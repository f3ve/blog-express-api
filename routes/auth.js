const express = require('express');
const db = require('../models/index');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../config');
const bcrypt = require('bcrypt');

parser = bodyParser.json();

const { User } = db;

const router = express.Router();

router.route('/login').post(parser, (req, res, next) => {
  /* 
    checks email and password are valid and authenticates users by sending a 
    cookie containing a signed JWT
  */

  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(400).json({ error: 'Incorrect email or password' }).end();
      }
      hash = user.dataValues.password;
      password = req.body.password;
      console.log({
        hash,
        password,
      });
      bcrypt.compare(password, hash, (err, result) => {
        if (result) {
          const token = jwt.sign({ user: user.id }, JWT_SECRET);
          res
            .cookie('authcookie', token, {
              maxAge: 900000,
              httpOnly: true,
              secure: NODE_ENV === 'production',
            })
            .status(200)
            .end();
        }
        if (!result) {
          res.status(400).json({ error: 'Incorrect email or password' });
        }

        if (err) {
          throw new Error(err);
        }
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
