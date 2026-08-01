import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn === "true"
    ? children
    : <Navigate to="/login" replace />;
}

export default PrivateRoute;