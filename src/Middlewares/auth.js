const jwt = require('jsonwebtoken');
const Question = require('../Models/questionsModels');


// Authentication middleware

const  authenticateUser = async (req, res, next) => {

  // Get the token from the request header or query parameter
  let token = req.header('x-auth-token') ;
  
  // Check if the token is missing
  if (!token) {
    return res.status(401).json({status:false, message: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'Shipmnts',); 
    
    // Attach the decoded user information to the request object
    req.user = decoded;
    next()
  } catch (error) {
    console.error(error.message);
    res.status(401).json({status:false, message: 'Unauthorized - Invalid token' });
  }
};

// Authorization middleware 

const authorizeUser = async (req, res, next) => {

  const { questionId } = req.params;

      const question = await Question.findById(questionId);

      if (question.user.toString() !==  req.user.userId.toString()) {
          return res.status(403).json({status:false, message: 'Access denied' });
      }
      next()
  
};

module.exports = {
  authenticateUser,
  authorizeUser,
};
