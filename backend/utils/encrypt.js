// encrypt.js
const bcrypt = require('bcrypt'); // Import bcrypt for password encryption

// Encrypt a password
exports.encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with salt
    return hashedPassword;
  } catch (error) {
    throw new Error('Encryption failed');
  }
};

// Compare passwords (for login)
exports.comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword); // Compare plain password with hashed password
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};
