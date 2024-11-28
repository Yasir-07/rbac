import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

const RestoreRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const lastRoute = localStorage.getItem("lastRoute");
    if (lastRoute) {
      navigate(lastRoute);
    }
  }, [navigate]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <RestoreRoute />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
