const express = require('express');
const path = require('path');
const db = require('../models/index');

const { post } = db;

const router = express.Router();

router.get('/', (req, res, next) => {
  post
    .findAll()
    .then((posts) => res.send(JSON.stringify(posts)))
    .catch((err) => next(err));
});

module.exports = router;
