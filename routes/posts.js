const express = require('express');
const db = require('../models/index');
const bodyParser = require('body-parser');
const { Router } = require('express');

parser = bodyParser.json();

const { Article } = db;

const router = express.Router();

router
  .route('/')
  .get((req, res, next) => {
    Article.findAll({
      include: {
        model: db.User,
        attributes: ['firstname', 'lastname'],
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
      slug: req.body.title
        .toLowerCase()
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s/g, '_'),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((article) => {
        res.status(202);
        res.send(article);
      })
      .catch((err) => next(err));
  });

router
  .route('/:slug')
  .all(async (req, res, next) => {
    // check the article exists
    try {
      article = await Article.findOne({ where: { slug: req.params.slug } });

      if (!article) {
        return res.status(404).json({
          error: 'Article does not exist',
        });
      }

      res.article = article;
      next();
    } catch (err) {
      next(err);
    }
  })
  .get((req, res, next) => {
    res.send(res.article);
  })
  .delete((req, res, next) => {
    Article.destroy({
      where: { slug: req.params.slug },
    }).then(res.status(204).end());
  })
  .patch(parser, (req, res, next) => {
    const slug = req.body.title
      .toLowerCase()
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s/g, '_');

    Article.update(
      {
        title: req.body.title,
        content: req.body.content,
        updatedAt: new Date(),
        slug,
      },
      {
        where: {
          slug: req.params.slug,
        },
      }
    )
      .then(() => {
        Article.findOne({
          where: {
            slug,
          },
        }).then((article) => {
          console.log(article);
          res.status(200).send(article);
        });
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;
