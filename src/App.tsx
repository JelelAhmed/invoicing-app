import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import InvoicePage from "./pages/InvoicePage";
import AuthPage from "./pages/authPage";

import { useAuth } from "./lib/useAuth";

export default function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {session ? (
        <MainLayout>
          <Routes>
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Routes>
        </MainLayout>
      ) : (
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}

// export default function App() {
//   return (
//     <MainLayout>
//       <Routes>
//         <Route path="/invoice" element={<InvoicePage />} />
//         <Route path="*" element={<div>404 - Not Found</div>} />
//       </Routes>
//     </MainLayout>
//   );
// }
