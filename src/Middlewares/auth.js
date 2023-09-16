const jwt = require('jsonwebtoken');

// Authentication middleware
const  authenticateUser = async (req, res, next) => {
  // Get the token from the request header or query parameter
  let token = req.header('x-auth-token') ;
  console.log(token)
  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'Shipmnts',); 
    
    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue with the next middleware or route handler
     res.send("verified")
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

// Authorization middleware for the owner of a resource
const authorizeUser = (req, res, next) => {
  // Check if the authenticated user is the owner/admin of the resource
  if (req.user && req.user._id.toString() === req.params.userId) {
    next(); // User is authorized
  } else {
    res.status(403).json({ message: 'Forbidden - Access denied' });
  }
};

module.exports = {
  authenticateUser,
  authorizeUser,
};
