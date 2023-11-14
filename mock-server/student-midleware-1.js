module.exports = function (req, res, next) {
  if (req.method === 'GET') {
    if (req.url.startsWith("/courses/")) {
      const courseId = req.url.split("/")[2];
      let courseData = {};

      if (courseId === "1980") {
        courseData = {
          courseId: 1980,
          courseName: "Data structures and algorithms",
          quizzes: [
            {
              quizId: 1,
              quizName: "Quiz 1",
              dueDate: "2023-08-03",
              timeLimit: 60,
            },
            {
              quizId: 2,
              quizName: "Quiz 2",
              dueDate: "2023-12-05",
              timeLimit: 90,
            },
          ]
        };
      } else if (courseId === "2023") {
        courseData = {
          courseId: 2023,
          courseName: "Advanced topics in Software Engineering",
          quizzes: [
            {
              quizId: 3,
              quizName: "Quiz 1",
              dueDate: "2023-12-26",
              timeLimit: 75,
            }
          ]
        };
      } else if (courseId === "9098") {
        courseData = {
          courseId: 9098,
          courseName: "Machine learning",
          quizzes: [
            {
              quizId: 4,
              quizName: "Quiz 1",
              dueDate: "2023-11-21",
              timeLimit: 130,
            },
            {
              quizId: 5,
              quizName: "Quiz 2",
              dueDate: "2023-12-08",
              timeLimit: 30,
            },
            {
              quizId: 6,
              quizName: "Quiz 3",
              dueDate: "2023-12-24",
              timeLimit: 15,
            }
          ]
        };
      }
      return res.status(200).json(courseData);
    } else if (req.url.startsWith("/quizzes/")) {
      const quizId = req.url.split("/")[2];
      let quizData = {};

      if (quizId === "1") {
        quizData = {
          quizId: 1,
          quizName: "Quiz 1",
          questions: [
            {
              "questionId": 1,
              "questionTypeId": 3,
              "questionTxt": "What is the time complexity of merge sort?",
              "answers": [
                {
                  "answerId": 1,
                  "answerValue": "b ^ 2",
                  "isCorrect": true
                },
                {
                  "answerId": 2,
                  "answerValue": "log n",
                  "isCorrect": false
                }
              ]
            },
            {
              "questionId": 2,
              "questionTypeId": 2,
              "questionTxt": "What is bogo sort?",
              "answers": [
                {
                  "answerId": 3,
                  "answerValue": "Worst algorithm ever",
                  "isCorrect": false
                },
                {
                  "answerId": 4,
                  "answerValue": "Best algorithm ever",
                  "isCorrect": true
                }
              ]
            }
          ],
          timeLimit: 60
        };
      } else if (quizId === "2") {
        quizData = {
          quizId: 2,
          quizName: "Quiz 2",
          questions: [
            {
              "questionId": 1,
              "questionTypeId": 3,
              "questionTxt": "Question number 2 test?",
              "answers": [
                {
                  "answerId": 1,
                  "answerValue": "Answer option #1",
                  "isCorrect": true
                },
                {
                  "answerId": 2,
                  "answerValue": "Answer option #2",
                  "isCorrect": false
                },
                {
                  "answerId": 3,
                  "answerValue": "Answer option #3",
                  "isCorrect": false
                }
              ]
            },
            {
              "questionId": 2,
              "questionTypeId": 2,
              "questionTxt": "What is bogo sort?",
              "answers": [
                {
                  "answerId": 3,
                  "answerValue": "Worst algorithm ever",
                  "isCorrect": false
                },
                {
                  "answerId": 4,
                  "answerValue": "Best algorithm ever",
                  "isCorrect": true
                }
              ]
            }
            
          ],
          timeLimit: 90
        };
      }
      
      return res.status(200).json(quizData);
    } else {
      next();
    }
  } else if (req.method === 'POST' && req.url === '/login') {
    const { email, password } = req.body;
    if (email === 'test@gmail.com' && password === 'testpassword') {
      res.status(200).json({
        userToken: 'studenttoken123',
        userType: 'S',
      });
    } else {
      res.status(401).json({
        error: 'Invalid credentials',
      });}
  } else {
    next();
  }
};
