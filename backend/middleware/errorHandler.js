const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', details: err.errors });
  }

  if (err.name === 'MongoError') {
    return res.status(500).json({ message: 'Database error', details: err.message });
  }

  // Generic error handler
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
};

module.exports = errorHandler;
