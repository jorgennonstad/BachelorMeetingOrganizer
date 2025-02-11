// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Register new user
router.post('/register', userController.createUser);

// Login user and issue JWT token
router.post('/login', userController.loginUser);

// Get all users (optional)
router.get('/', userController.getUsers);

// backend/routes/userRoutes.js
router.post('/logout', userController.logoutUser);

//protected routes
router.get('/check-auth', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
  });


module.exports = router;
