const express = require('express');
const db = require('../models/index');

const { Article } = db;

const router = express.Router();

router.route('/').get((req, res, next) => {
  Article.findAll({
    include: {
      model: db.User,
      attributes: ['id', 'firstname', 'lastname'],
    },
  })
    .then((posts) => res.send(JSON.stringify(posts)))
    .catch((err) => next(err));
});

module.exports = router;
