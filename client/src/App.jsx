import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import AIRecommendationPage from "./pages/AIRecommendationPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (<div style={{ display:"flex",justifyContent:"center",alignItems:"center",minHeight:"80vh" }}><div className="spinner spinner-lg"></div></div>);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><EmployeeListPage /></ProtectedRoute>} />
        <Route path="/employees/new" element={<ProtectedRoute><EmployeeFormPage /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AIRecommendationPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;