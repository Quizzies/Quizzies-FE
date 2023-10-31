import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { ProtectedRoute } from "../components";
import { CourseQuizzes, DashBoard, Login } from "../pages";
import CreateQuiz from "../pages/create-quiz";
import StudentDashboard from "../pages/student-dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/course/:id" element={<CourseQuizzes />} />
        <Route path="/course/:courseId/create-quiz" element={<CreateQuiz />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
