const express = require('express');
const db = require('../models/index');
const bodyParser = require('body-parser');
const requireAuth = require('../middleware/auth');
const checkExists = require('../middleware/article');

parser = bodyParser.json();

const { Article } = db;

const router = express.Router();

router
  .route('/')
  .get((req, res, next) => {
    /*
      Get a paginated list of public articles. can optionally filter by category
      or page. limit defaults to 20 but can be increased or decreased using 
      query params
    */

    // optional values based on query params
    limit = parseInt(req.query.limit) || 20;
    page = (parseInt(req.query.page) - 1) * limit || 0;
    category = parseInt(req.query.category);

    Article.findAll({
      where: {
        draft: false,
        // conditionally add CategoryId to where if category is not undefined
        ...(category && { CategoryId: category }),
      },
      //paginate results
      offset: page,
      limit: limit,
    })
      .then((articles) =>
        res.json({
          results: articles,
          total: articles.length,
          page: page / 20 + 1 || 1,
        })
      )
      .catch((err) => next(err));
  })
  .post(requireAuth, parser, (req, res, next) => {
    /* 
      Creates a new article, requires authentication so currently only site 
      owner/admin can create articles.

      example req.body: {
        title: string
        content: string
        category: integer
        draft: boolean
        publish_date: date string
      }
    */

    Article.create({
      title: req.body.title,
      UserId: 1,
      content: req.body.content,
      publish_date: req.body.publish_date || new Date(),
      slug: req.body.title
        .toLowerCase()
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s/g, '_'),
      category: req.body.category,
      draft: req.body.draft,
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
  .all(checkExists)
  .get((req, res, next) => {
    /* 
      returns specified article
    */

    res.send(res.article);
  })
  .delete(requireAuth, (req, res, next) => {
    /* 
      deletes specified article. requires authentication.
    */

    Article.destroy({
      where: { slug: req.params.slug },
    }).then(res.status(204).end());
  })
  .patch(requireAuth, parser, (req, res, next) => {
    /* 
      update field values of specified article, requires authentication
    */

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
