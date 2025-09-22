import React from "react";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-dashboard-bg font-sans">
      {/* Sidebar: fixed width, full height */}
      <Sidebar />

      {/* Main content (dashboard area) */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
