import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { ProtectedRoute } from "../components";
import { DashBoard, Login } from "../pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoard />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
