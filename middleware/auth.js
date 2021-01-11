const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  // Verifies authtoken provided by client
  const { authcookie } = req.cookies;
  jwt.verify(authcookie, 'bananas', (err, data) => {
    if (err) {
      res.status(403).end();
    } else if (data.user) {
      req.user = data.user;
      next();
    }
  });
}

module.exports = requireAuth;
