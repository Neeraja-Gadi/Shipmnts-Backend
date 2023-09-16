const Question = require('../Models/questionsModels');
const Answer = require('../Models/answerModel');

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    const newQuestion = new Question({
      title,
      body,
      tags,
       user :req.user.userId
    });

    await newQuestion.save();

    res.status(201).json({status: "true", data : newQuestion ,message: 'Question posted successfully' });
  } catch (error) {
    res.status(500).json({ status: "false", error: error.message });
  }
};

// Edit a question (only the owner can edit)
const editQuestion = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const { questionId } = req.params;

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { title, body, tags },
      { new: true } 
    );

    if (!updatedQuestion) {
      return res.status(404).json({status: "false", message: 'Question not found' });
    }

    res.status(200).json({status: "true", message: 'Question updated successfully', data: updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({status: "false", error: error.message });
  }
};


// Answer a question
const answerQuestion = async (req, res) => {
  try {
    const { body  } = req.body;
    const { questionId } = req.params;

    const question = await Question.findById(questionId);
    if(!question) return res.status(400).json({status:false, message: "No Such Question Found"})

    const newAnswer = new Answer({
      body,
      user: req.user.userId,
      question: questionId,
    });

    await newAnswer.save();

    res.status(201).json({status: "true",data : newAnswer, message: 'Answer posted successfully'  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "false", error: error.message});
  }
};

// Mark an answer as accepted (only the owner can mark)
const markAnswerAsAccepted = async (req, res) => {
  try {
    const { questionId, answerId } = req.params;

    const question = await Question.findById(questionId);
    if(!question) return res.status(400).json({status:false, message: "No Such Question Found"})

    if (question.user.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const answer = await Answer.findById(answerId);
    if(!answer) return res.status(400).json({status:false, message: "No Such Answer Found"})

    question.AcceptedAnswerId = answerId;

    await question.save();

    res.status(200).json({ status: "true",data:question , message: 'Answer marked as accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "false", error: error.message });
  }
};

module.exports = {
  createQuestion,
  editQuestion,
  answerQuestion,
  markAnswerAsAccepted,
};
