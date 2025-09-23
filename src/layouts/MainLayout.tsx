import React from "react";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar: fixed width, full height */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 bg-content-bg">{children}</div>
    </div>
  );
}
