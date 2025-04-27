import { Navigate, Route, Routes } from "react-router";
import MainLayout from "./MainLayout";
import DashboardPage from "../dashboard/DashboardPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
