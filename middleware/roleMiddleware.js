const roleMiddleware = (roles) => {
    return (req, res, next) => {
      const { role } = req.user;  // req.user is set by the authMiddleware
      if (!roles.includes(role)) {
        return res.status(403).json({ msg: 'You need admin privileges to view this request' });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  