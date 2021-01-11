const express = require('express');
const db = require('../models/index');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

parser = bodyParser.json();

const { User } = db;

const router = express.Router();

router.route('/login').post(parser, (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      console.log(user.dataValues.password);
      console.log(req.body.password);
      if (req.body.password === user.dataValues.password) {
        const token = jwt.sign({ user: user.id }, 'bananas');

        res
          .cookie('authcookie', token, { maxAge: 900000, httpOnly: true })
          .status(200)
          .end();
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
