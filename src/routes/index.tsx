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
  DashBoard,
  EditAnswerCorrectness,
  Login,
  QuizResults,
} from "../pages";
import { CreateQuiz } from "../pages/quiz/create-quiz";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/course/:id" element={<CourseQuizzes />} />
        <Route path="/course/:courseId/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/:quizId/add-question" element={<AddQuestion />} />
        <Route path="/question/:questionId" element={<AddChoices />} />
        <Route path="/quiz/:quizId/results" element={<QuizResults />} />
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
