import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "../components";
import StudQuizSelect from "../pages/student-quiz-selection";
import StudentTakeQuiz from "../pages/student-takeQuiz";
import {
  AddChoices,
  AddQuestion,
  CourseQuizzes,
  CreateQuiz,
  DashBoard,
  EditAnswerCorrectness,
  Login,
  QuizResults,
  QuizSummary
} from "../pages";
import StudentAnswer from "../pages/studentAnswer";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/course/:id" element={<CourseQuizzes />} />
        <Route path="/course/:courseId/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/:quizId/results" element={<QuizResults />} />
        <Route path="/quiz/:quizId/add-question" element={<AddQuestion />} />
        <Route path="/question/:questionId" element={<AddChoices />} />
        <Route path="/quiz/:quizId/summary" element={<QuizSummary />} />
        <Route path="/student-quiz-selection/:id" element={<StudQuizSelect />} />
        <Route path="/student-takeQuiz/:quizNumber" element={<StudentTakeQuiz />} />
        <Route path="/student-answer/:id" element={<StudentAnswer />} />
        <Route
          path="/question/:questionId/edit"
          element={<EditAnswerCorrectness />}
        />
      </Route>

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
