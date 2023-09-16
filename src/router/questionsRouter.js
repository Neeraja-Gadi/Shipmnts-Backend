const express = require('express');


const router = express.Router();

const {authenticateUser,authorizeUser} = require('../Middlewares/auth');

const questionController = require('../Controllers/questionController');

// Create a new question
router.post('/questions',authenticateUser, questionController.createQuestion);

// Edit a question (only the author can edit)
router.put('/questions/:questionId', authenticateUser,authorizeUser,questionController.editQuestion);

// Answer a question
router.post('/questions/:questionId/answers',authenticateUser, questionController.answerQuestion);

// Mark an answer as accepted (only the author can mark)
router.put('/questions/:questionId/answers/:answerId/accept', authenticateUser,authorizeUser,questionController.markAnswerAsAccepted);

module.exports = router;
