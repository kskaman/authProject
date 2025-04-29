import { Routes, Route, Navigate } from "react-router";
import AuthPage from "./AuthPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

export function AuthRoutes() {
  return (
    <Routes>
      {/* 
        This Route now matches exactly "/auth/*" 
        because AuthRoutes is mounted at "auth/*" in App.tsx
      */}
      <Route path="" element={<AuthPage />}>
        {/* /auth        → /auth/login */}
        <Route index element={<Navigate to="login" replace />} />

        {/* /auth/login */}
        <Route path="login" element={<Login />} />

        {/* /auth/signup */}
        <Route path="signup" element={<Signup />} />

        {/* /auth/forgot-password */}
        <Route path="forgot-password" element={<ForgotPassword />} />

        {/* /auth/reset-password */}
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}
