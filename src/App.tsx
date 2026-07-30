import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/SignInPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<DashboardPage />} />
        <Route path="/tasks" element={<DashboardPage />} />
        <Route path="/settings" element={<DashboardPage />} />
        <Route path="/profile" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
