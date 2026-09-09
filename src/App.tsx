import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/SignInPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import DashboardPage from "./features/overview/pages/DashboardPage";
import ProjectsPage from "./features/projects/pages/ProjectsPage";
import TeamsPage from "./features/Teams/pages/TeamsPage";
import SettingsPage from "./features/settings/pages/SettingsPage";
import Layout from "./features/layouts/Layout";
import LandingPage from "./features/landing/pages/LandingPage";
import ProtectedRoute from "./features/components/ProtectedRoute";
import AuthInitializer from "@/features/auth/AuthInitializer";

function App() {
  return (
    <AuthInitializer>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes - Wrapped with Layout AND ProtectedRoute */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all - Redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthInitializer>
  );
}

export default App;
