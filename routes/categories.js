const express = require('express');
const db = require('../models/index');

const { Category } = db;

const router = express.Router();

router.route('/').get(async (req, res, next) => {
  /* 
    returns a list of all categories in db
  */

  const categories = await Category.findAll();
  res.status(200).send(categories);
});

module.exports = router;
