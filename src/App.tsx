import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/Dashboardpage";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </MainLayout>
  );
}
