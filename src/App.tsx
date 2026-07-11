import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./features/auth/login/LoginForm";
import SignUpForm from "./features/auth/login/SignUpForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
