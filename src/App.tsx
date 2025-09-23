import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import InvoicePage from "./pages/InvoicePage";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </MainLayout>
  );
}
