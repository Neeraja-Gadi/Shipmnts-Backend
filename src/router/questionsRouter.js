const express = require('express');


const router = express.Router();

const {authenticateUser,authorizeUser} = require('../Middlewares/auth');

const questionController = require('../Controllers/questionController');

// Apply authentication middleware to protect the routes below

// Create a new question
router.post('/questions', questionController.createQuestion);

// Edit a question (only the owner can edit)
router.put('/questions/:questionId', authenticateUser,authorizeUser,questionController.editQuestion);

// Answer a question
router.post('/questions/:questionId/answers', questionController.answerQuestion);

// Mark an answer as accepted (only the owner can mark)
router.put('/questions/:questionId/answers/:answerId/accept', questionController.markAnswerAsAccepted);

module.exports = router;
