module.exports = function (req, res, next) {
  console.log('URL requested is:', req.url); // Remove this after checking

  if (req.method === 'GET') {
    if (req.url === "/courses/1980") {
      return res.status(200).json({
        courseId: 1980,
        courseName: "Data structures and algorithms",
        quizzes: [
          {
            quizId: 1,
            quizName: "Quiz 1",
            dueDate: "2023-08-03"
          },
          {
            quizId: 2,
            quizName: "Quiz 2",
            dueDate: "2023-12-05"
          },
        ]
      });
    } else if (req.url === "/courses/2023") {
      return res.status(200).json({
        courseId: 2023,
        courseName: "Advanced topics in Software Engineering",
        quizzes: [
          {
            quizId: 3,
            quizName: "Quiz 1",
            dueDate: "2023-12-26"
          }
        ]
      });
    } else if (req.url === "/courses/9098") {
      return res.status(200).json({
        courseId: 9098,
        courseName: "Machine learning",
        quizzes: [
          {
            quizId: 4,
            quizName: "Quiz 1",
            dueDate: "2023-11-21"
          },
          {
            quizId: 5,
            quizName: "Quiz 2",
            dueDate: "2023-12-08"
          },
          {
            quizId: 6,
            quizName: "Quiz 3",
            dueDate: "2023-12-24"
          }
        ]
      });
    } 
    else {
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
      });
    }
  } else {
    next();
  }
};
