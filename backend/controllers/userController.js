// backend/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Create a new user with encrypted password
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,  // Set `true` ONLY in production (HTTPS)
      sameSite: 'lax', // 'strict' might block cookies in some cases
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });    

    // Send response (excluding password)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,  // (Optional) Send token in response for debugging
    });
    console.log('Set-Cookie Header:', res.getHeaders()['set-cookie']);


  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get all users (optional, depending on your use case)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// backend/controllers/userController.js
const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // Ensure it matches the cookie settings
    sameSite: 'Lax'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};


module.exports = { createUser, loginUser, logoutUser, getUsers };

