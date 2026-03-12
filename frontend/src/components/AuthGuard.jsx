import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  // Use Redux state instead of localStorage directly
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  // Use both Redux state and a fallback check for reliability
  const hasToken = token || localStorage.getItem("mpay_token");

  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;