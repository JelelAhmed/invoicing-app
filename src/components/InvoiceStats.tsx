import { useEffect, useState } from "react";
import StatCard from "./shared/StatCard";
import { OverviewIcon } from "../assets/icons/OveviewIcon";

type StatsResponse = {
  totalPaidCount: number;
  totalPaidAmount: number;
  totalOverdueCount: number;
  totalOverdueAmount: number;
  totalDraftCount: number;
  totalDraftAmount: number;
  totalUnpaidCount: number;
  totalUnpaidAmount: number;
};

export default function InvoiceStats() {
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  const cardsData = [
    {
      label: "Total Paid",
      count: stats.totalPaidCount,
      amount: stats.totalPaidAmount,
      status: "PAID" as const,
    },
    {
      label: "Total Overdue",
      count: stats.totalOverdueCount,
      amount: stats.totalOverdueAmount,
      status: "OVERDUE" as const,
    },
    {
      label: "Total Draft",
      count: stats.totalDraftCount,
      amount: stats.totalDraftAmount,
      status: "DRAFT" as const,
    },
    {
      label: "Total Unpaid",
      count: stats.totalUnpaidCount,
      amount: stats.totalUnpaidAmount,
      status: "PARTIAL" as const, // we can pick PARTIAL to match color, backend decides actual status
    },
  ];

  return (
    <div className="mt-10 flex flex-wrap gap-8 max-w-[1080px]">
      {cardsData.map((c) => (
        <StatCard
          key={c.label}
          label={c.label}
          count={c.count}
          amount={c.amount}
          status={c.status}
          icon={<OverviewIcon className="w-10 h-10 text-[#292D32]" />}
        />
      ))}
    </div>
  );
}
