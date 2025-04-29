import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "./auth/AuthRoutes";
import ProtectedRoute from "./components/ProtectedRoutes";
import MainRoutes from "./MainApp/MainRoutes";
import NotFound from "./NotFound";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* / → /auth/login */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* /auth/* → your auth routes */}
        <Route path="auth/*" element={<AuthRoutes />} />

        {/* Protected Dashboard route */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <MainRoutes />
            </ProtectedRoute>
          }
        />

        {/* anything else → /auth/login */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
