import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/UserDashboard";
import DevDashboard from "./pages/DevDashboard";
import Navbar from "./components/Navbar";
import MyBidsPage from "./pages/MyBidsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/developer"
          element={
            <ProtectedRoute allowedRole="developer">
              <DevDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/developer/bids"
          element={
            <ProtectedRoute allowedRole="developer">
              <MyBidsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
