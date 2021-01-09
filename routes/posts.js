const express = require('express');
const db = require('../models/index');
const bodyParser = require('body-parser');

parser = bodyParser.json();

const { Article } = db;

const router = express.Router();

router
  .route('/')
  .get((req, res, next) => {
    Article.findAll({
      include: {
        model: db.User,
        attributes: ['id', 'firstname', 'lastname'],
      },
    })
      .then((posts) => res.send(posts))
      .catch((err) => next(err));
  })
  .post(parser, (req, res, next) => {
    Article.create({
      title: req.body.title,
      UserId: 1,
      content: req.body.content,
      publish_date: new Date(),
      slug: req.body.title.toLowerCase().replace(' ', '_'),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((article) => {
        res.status(202);
        res.send(article);
      })
      .catch((err) => next(err));
  });

module.exports = router;
