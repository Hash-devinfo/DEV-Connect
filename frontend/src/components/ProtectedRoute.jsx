import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  // not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // wrong role → redirect to their correct dashboard
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === "user" ? "/user" : "/developer"} />;
  }

  return children;
};

export default ProtectedRoute;