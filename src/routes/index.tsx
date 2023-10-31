import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { ProtectedRoute } from "../components";
import { CourseQuizzes, DashBoard, Login } from "../pages";
import CreateQuiz from "../pages/create-quiz";
import StudentDashboard from "../pages/student-dashboard";
import StudQuizSelect from "../pages/student-quiz-selection";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/course/:id" element={<CourseQuizzes />} />
        <Route path="/course/:courseId/create-quiz" element={<CreateQuiz />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-quiz-selection" element={<StudQuizSelect />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
