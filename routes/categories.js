const express = require('express');
const db = require('../models/index');

const { Category } = db;

const router = express.Router();

router.route('/').get((req, res, next) => {
  /* 
    returns a list of all categories in db
  */

  Category.findAll().then((categories) => res.status(200).send(categories));
});

module.exports = router;
