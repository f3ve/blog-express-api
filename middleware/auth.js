const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function requireAuth(req, res, next) {
  // Verifies authtoken provided by client
  const { authcookie } = req.cookies;
  console.log(authcookie);
  jwt.verify(authcookie, JWT_SECRET, (err, data) => {
    if (err) {
      res.status(403).json({ error: 'You do not have the proper credentials' });
    } else if (data.user) {
      req.user = data.user;
      next();
    }
  });
}

module.exports = requireAuth;
