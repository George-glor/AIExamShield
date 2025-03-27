const jwt = require('jsonwebtoken');

const authMiddleware = (roles) => (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (roles && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have permission.' });
    }

    // Secure route handling
    req.userRole = decoded.role; // Optional: Track the role in req object for later use
    next();
  } catch (error) {
    console.error('JWT Error:', error);
    res.status(400).json({ message: 'Invalid token' });
  }
};


module.exports = authMiddleware;