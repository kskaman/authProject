import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "./auth/AuthRoutes";
import ProtectedRoute from "./components/ProtectedRoutes";
import MainRoutes from "./MainApp/MainRoutes";
import NotFound from "./NotFound";
import { useAuth } from "./auth/hooks/useAuth";

const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* ---- default landing: send to the right place ---- */}
        <Route
          path="/"
          element={
            <Navigate to={user ? "/app/dashboard" : "/auth/login"} replace />
          }
        />

        {/* ---- AUTH ---- */}
        {!user && <Route path="/auth/*" element={<AuthRoutes />} />}
        {/* / → /auth/login */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* Protected Dashboard route */}
        {user && (
          <Route
            path="/app/*"
            element={
              <ProtectedRoute>
                <MainRoutes />
              </ProtectedRoute>
            }
          />
        )}

        {/* anything else → /auth/login */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
