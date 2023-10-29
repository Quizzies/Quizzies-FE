// import { Request } from 'express'

module.exports = function (req, res, next) {
  console.log(req.url);
  if (req.url === "/quiz-answers/1" && req.method === "POST") {
    // question answer post
    return res.status(201).json({
      courseName: "cs 1980 - Data structures and algorithms",
      quizName: "Quiz 1",
      questionId: 1,
      quizId: 29,
      questionTypeId: 3,
      questionTxt: "What is the time complexity of merge sort?",
      answers: [
        {
          answerValue: "b ^ 2",
          isCorrect: false,
        },
        {
          answerValue: "log n",
          isCorrect: false,
        },
      ],
    });
  }
  if (req.url === "/quiz-questions" && req.method === "POST") {
    // question post
    return res.status(201).json({
      questionId: 1,
      quizID: 29,
      questionTypeId: 1,
      questionTxt: "What is the time complexity of merge sort?",
    });
  }
  if (req.url === "/quizzes" && req.method === "PUT") {
    // quiz update
    return res.status(201).json({
      quizId: 29,
      courseName: "cs 1980 - Data structures and algorithms",
      quizName: "Quiz 1",
      quizDescription: "Quiz for lectures 1 and 2",
      timeLimit: "60",
      dueDate: "08/03/2023",
    });
  }
  if (req.url === "/login" && req.body.email === "error") {
    // mock an error response
    res.status(500).json([
      {
        errors: ["email should have email format"],
        field: "email",
      },
    ]);
  }
  next();
};
