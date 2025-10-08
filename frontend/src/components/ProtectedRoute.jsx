import { Navigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/ContextProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  const location = useLocation();

  // If no user, redirect to login with a state message
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute;
