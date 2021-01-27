/* 
  Currently there are no plans to let visitors to site create a user account. 
  Owner/admin can create users using the create user script in package.json
*/

const express = require('express');
const db = require('../models/index');
const bodyParser = require('body-parser');

parser = bodyParser.json();

const { User } = db;

const router = express.Router();

router.route('/').get(async (req, res, next) => {
  const users = await User.findAll({ attributes: ['firstname', 'lastname'] });
  res.status(200).send(users);
});

module.exports = router;
