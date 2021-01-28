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
  .get(async (req, res, next) => {
    /*
      Get a paginated list of public articles. can optionally filter by category
      or page. limit defaults to 20 but can be increased or decreased using 
      query params
    */

    try {
      // optional values based on query params
      limit = parseInt(req.query.limit) || 20;
      page = (parseInt(req.query.page) - 1) * limit || 0;
      category = parseInt(req.query.category);

      const articles = await Article.findAll({
        where: {
          draft: false,
          // conditionally add CategoryId to where if category is not undefined
          ...(category && { CategoryId: category }),
        },
        //paginate results
        offset: page,
        limit: limit,
      });

      // format and return results
      res.json({
        results: articles,
        total: articles.length,
        page: page / 20 + 1 || 1,
      });
    } catch (err) {
      next(err);
    }
  })
  .post(requireAuth, parser, async (req, res, next) => {
    /* 
      Creates a new article, requires authentication so currently only site 
      owner/admin can create articles.
    */

    try {
      const article = await Article.create({
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
      });

      res.status(202).send(article);
    } catch (err) {
      next(err);
    }
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
  .delete(requireAuth, async (req, res, next) => {
    /* 
      deletes specified article. requires authentication.
    */

    try {
      await Article.destroy({
        where: { slug: req.params.slug },
      });

      res.status(204).end();
    } catch (err) {
      next(err);
    }
  })
  .patch(requireAuth, parser, async (req, res, next) => {
    /* 
      update field values of specified article, requires authentication
    */
    try {
      const slug = req.body.title
        .toLowerCase()
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s/g, '_');

      await Article.update(
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
      );
      const article = await Article.findOne({
        where: {
          slug,
        },
      });

      res.status.send(article);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
