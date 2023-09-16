const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Check if the userName already exists
    const existingUser = await userModel.findOne({ userName: req.body.userName });
    if (existingUser) {
      return res.status(400).json({ message: 'userName already exists' });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new userModel({
      userName: req.body.userName,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    // Find the user by userName
    const user = await userModel.findOne({ userName: req.body.userName });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id },'Shipmnts');

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
