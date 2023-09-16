const Question = require('../Models/questionsModels');
const Answer = require('../Models/answerModel');

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { title, body, tags ,user} = req.body;

    const newQuestion = new Question({
      title,
      body,
      tags,
      user :req.user._id
    });

    await newQuestion.save();

    res.status(201).json({ message: 'Question posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
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
      return res.status(404).json({ message: 'Question not found' });
    }

    if (updatedQuestion.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// Answer a question
const answerQuestion = async (req, res) => {
  try {
    const { body  } = req.body;
    const { questionId } = req.params;

    const question = await Question.findById(questionId);

    const newAnswer = new Answer({
      body,
      user: req.user._id,
      question: questionId,
    });

    await newAnswer.save();
    await question.save();

    res.status(201).json({ message: 'Answer posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark an answer as accepted (only the owner can mark)
const markAnswerAsAccepted = async (req, res) => {
  try {
    const { questionId, answerId } = req.params;

    const question = await Question.findById(questionId);

    if (question.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    question.acceptedAnswer = answerId;

    await question.save();

    res.status(200).json({ message: 'Answer marked as accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createQuestion,
  editQuestion,
  answerQuestion,
  markAnswerAsAccepted,
};
