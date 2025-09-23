// DashboardLayout.tsx
import React from "react";
import DashboardHeader from "../components/DashboardHeader";

export default function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="ml-sidebar bg-content-bg min-h-screen">
      {/* Content wrapper */}
      <div className="max-w-content w-full px-10 pt-0 pb-[22px]">
        <DashboardHeader title={title} />
        <main className="mt-6 space-y-8">{children}</main>
      </div>
    </div>
  );
}
