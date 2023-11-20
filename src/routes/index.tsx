import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "../components";
import {
  AddChoices,
  AddQuestion,
  CourseQuizzes,
  CreateQuiz,
  DashBoard,
  EditAnswerCorrectness,
  Login,
  QuizResults,
  QuizSummary,
  StudentQuizSelection,
  StudentTakeQuiz,
  StudentAnswer
} from "../pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoard />} />
        {/* instructor routes */}
        <Route path="/course/:id" element={<CourseQuizzes />} />
        <Route path="/course/:courseId/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/:quizId/results" element={<QuizResults />} />
        <Route path="/quiz/:quizId/add-question" element={<AddQuestion />} />
        <Route path="/question/:questionId" element={<AddChoices />} />
        <Route path="/quiz/:quizId/summary" element={<QuizSummary />} />
        <Route
          path="/question/:questionId/edit"
          element={<EditAnswerCorrectness />}
        />

        {/* student routes */}
        <Route
          path="/student-quiz-selection/:id"
          element={<StudentQuizSelection />}
        />
        <Route path="/student-takeQuiz/:quizId" element={<StudentTakeQuiz />} />
        <Route path="/student-answer/:quizId" element={<StudentAnswer />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
