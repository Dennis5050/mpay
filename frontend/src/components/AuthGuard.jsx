import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("authToken");

  // If user is not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → allow requested page
  return children;
};

export default AuthGuard;
