const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function requireAuth(req, res, next) {
  // Verifies authtoken provided by client
  const { authcookie } = req.cookies;
  jwt.verify(authcookie, JWT_SECRET, (err, data) => {
    if (err) {
      res.status(403).end();
    } else if (data.user) {
      req.user = data.user;
      next();
    }
  });
}

module.exports = requireAuth;
