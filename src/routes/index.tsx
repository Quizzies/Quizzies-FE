import {
  createBrowserRouter
} from "react-router-dom";
import { Login, DashBoard } from "../pages";


const router = createBrowserRouter([
  {
    path: "/",
    element: DashBoard,
  },
  {
    path: "/login",
    element: Login,
  },
]);

export default router;