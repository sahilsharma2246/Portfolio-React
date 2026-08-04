import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userKey = localStorage.getItem("userKey");

  return userKey
    ? children
    : <Navigate to="/login" replace />;
}

export default PrivateRoute;