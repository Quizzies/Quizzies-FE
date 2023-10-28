import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "../components";
import { CourseQuizzes, DashBoard, Login } from "../pages";
import Step1 from "../pages/create-quiz/step1";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/course/:id" element={<CourseQuizzes />} />
        <Route path="/course/:courseId/create-quiz" element={<Step1 />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
