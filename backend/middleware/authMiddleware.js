const jwt = require('jsonwebtoken'); // Add this import
const User = require('../models/userModel'); // Assuming you have a User model

// Middleware to authenticate the JWT token
const authMiddleware = async (req, res, next) => {
  console.log('Auth Middleware');
  try {
    // Get the token from the cookies
    const token = req.cookies.token; // Using token, not auth_token
    console.log('Token:', token);

    // If there's no token, return an error
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    console.log('There is a token:', token);

    // Verify the token using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      console.log('Decoded successfully:', decoded);
    }
    // Get the user data from the decoded token
    req.user = decoded;

    // Find the user in the database
    const user = await User.findById(req.user.id);
    console.log('User:', user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data to the request for use in subsequent middlewares or routes
    req.user = user;

    // Call next to pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired token', error });
  }
};

// Middleware to check user role (admin or guest)
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const { role } = req.user; // Get the user's role from the authenticated user
    console.log('Role Middleware:', role);

    // Check if the user has the required role
    if (!roles.includes(role)) {
      console.log('Your role is:', role);
      return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }

    // Call next if the role is authorized
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };
