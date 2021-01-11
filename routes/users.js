const express = require('express');
const db = require('../models/index');
const bodyParser = require('body-parser');
const requireAuth = require('../middleware/auth');

parser = bodyParser.json();

const { User } = db;

const router = express.Router();

router.route('/').get((req, res, next) => {
  User.findAll({ attributes: ['firstname', 'lastname'] }).then((users) =>
    res.status(200).send(users)
  );
});

module.exports = router;
