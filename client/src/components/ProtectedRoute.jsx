import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (<div style={{ display:"flex",justifyContent:"center",alignItems:"center",minHeight:"80vh" }}><div className="spinner spinner-lg"></div></div>);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
export default ProtectedRoute;
