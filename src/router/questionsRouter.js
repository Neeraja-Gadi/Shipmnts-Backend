const express = require('express');

const router = express.Router();

const {authenticateUser,authorizeUser} = require('../Middlewares/auth');

const questionController = require('../Controllers/questionController');

router.post('/questions',authenticateUser, questionController.createQuestion);

// Edit a question (only the author can edit)
router.put('/questions/:questionId', authenticateUser,authorizeUser,questionController.editQuestion);

router.post('/questions/:questionId/answers',authenticateUser, questionController.answerQuestion);

router.get('/questions/:questionId/answers',authenticateUser, questionController.getAllAnswers);


// Mark an answer as accepted (only the author can mark)
router.put('/questions/:questionId/answers/:answerId/accept', authenticateUser,authorizeUser,questionController.markAnswerAsAccepted);

router.get('/questions',questionController.getQuestions)

module.exports = router;
