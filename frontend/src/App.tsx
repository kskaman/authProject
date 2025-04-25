import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "./auth/AuthRoutes";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* / → /auth/login */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* /auth/* → your auth routes */}
        <Route path="auth/*" element={<AuthRoutes />} />

        {/* anything else → /auth/login */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
