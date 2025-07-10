const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'You need to log in' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  // Attach user info to the request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
