import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "../components";
import { AddQuestion, CourseQuizzes, DashBoard, Login } from "../pages";
import { CreateQuiz } from "../pages/create-quiz/create-quiz";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/course/:id" element={<CourseQuizzes />} />
        <Route path="/course/:courseId/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/:quizId/add-question" element={<AddQuestion />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
