import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../../store";
import MainLayout from "../../hoc/main-layout";

/**
 * Useful to protect routes that require user to be authenticated
 */
export const ProtectedRoute = () => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedRoute;
