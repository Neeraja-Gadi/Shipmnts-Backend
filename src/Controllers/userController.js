const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

// Register a new user
const registerUser = async (req, res) => {
  try {

   const {userName,password} = req.body

    // Check if the userName already exists
    const existingUser = await userModel.findOne({ userName: userName});
    if (existingUser) {
      return res.status(400).json({status: "false" , message: 'userName already exists' });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      userName: userName,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ status: "true" ,data: newUser, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ status: "false" , message: error});
  }
};

// User login
const loginUser = async (req, res) => {
  try {

    const {userName,password} = req.body

    // Find the user by userName
    const user = await userModel.findOne({ userName: userName });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({status: "false", message: 'User not found' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({status: "false", message: 'Incorrect password' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id },'Shipmnts');

    res.status(200).json({status: "true", token: token ,message: "User Logged Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
