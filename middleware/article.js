const db = require('../models/index');

const { Article } = db;

async function checkExists(req, res, next) {
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
}

module.exports = checkExists;
