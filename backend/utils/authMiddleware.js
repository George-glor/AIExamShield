// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
