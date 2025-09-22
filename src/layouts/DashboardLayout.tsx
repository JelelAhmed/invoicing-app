import React from "react";
import DashboardHeader from "../components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1160px] w-full mx-auto px-[40px] pt-0 pb-[22px]">
      {/* Header lives inside dashboard frame */}
      <DashboardHeader />

      {/* Content blocks */}
      <main className="mt-6 space-y-8">{children}</main>
    </div>
  );
}
