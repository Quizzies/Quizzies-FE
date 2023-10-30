// import { Request } from 'express'

module.exports = function (req, res, next) {
  console.log(req.url);
  if (req.url === "/quiz-answers/1") {
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
          answerId: 1,
          answerValue: "b ^ 2",
          isCorrect: false,
        },
        {
          answerId: 2,
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
  if (req.url === "/quizzes/29/results" && (req.method === "GET")) {
    // quiz get results from student responses
    return res.status(201).json({
      quizId: 29,
      quizName: "Quiz 1",
      courseName: "cs 1980 - Data structures and algorithms",
      studentResults: [ 
        {
          fullName: "Stephen Devaney",
          submissionDate: "08/03/2023",
          totalScore: "5/8"
        },
        {
          fullName: "Tiffany Williams",
          submissionDate: "08/02/2023",
          totalScore: "8/8"
        },
        {
          fullName: "Timoty Spees",
          submissionDate: "08/05/2023",
          totalScore: "0/8"
        }
      ]

    });
  }
  if (req.url === "/quizzes/29" && (req.method === "GET")) {
    // quiz get
    return res.status(201).json({
      quizId: 29,
      courseId: 1,
      quizName: "Quiz 1",
      courseName: "cs 1980 - Data structures and algorithms",
      quizDescription: "Quiz for lectures 1 and 2",
      timeLimit: "60",
      isPosted: false,
      dueDate: "08/03/2023",
      questions: [
        {
          questionId: 1,
          questionTypeId: 3,
          questionTxt: "What is the time complexity of merge sort?",
          answers: [
            { 
              answerId: 1,
              answerValue: "b ^ 2",
              isCorrect: true,
            },
            {
              answerId: 2,
              answerValue: "log n",
              isCorrect: false,
            },
          ],
        },
        {
          questionId: 2,
          questionTypeId: 2,
          questionTxt: "What is bogo sort?",
          answers: [
            { 
              answerId: 3,
              answerValue: "Worst algorithm ever",
              isCorrect: false,
            },
            {
              answerId: 4,
              answerValue: "Best algorithm ever",
              isCorrect: true,
            },
          ],
        }
      ]

    });
  }
  if (req.url === "/quizzes" && (req.method === "POST" || req.method === "PUT")) {
    // quiz update / post
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
