"use client";

import { useEffect, useState } from "react";
import { ActivityItem } from "./ActivityItem";
import ActivityAvatar from "../assets/icons/activityAvatar.png";
import Button from "./ui/Button";
import type { Activity, BackendInvoice } from "../types/invoice";
import { formatTimestamp } from "../utils/formatTimestamp";
import { mapActivityType } from "../utils/mapActivityType";
import {
  onInvoiceCreated,
  offInvoiceCreated,
} from "../lib/socket-client/socket";

// Extend Activity with invoice info
interface BackendActivity extends Activity {
  invoiceNumber: string;
  customerName: string;
}

export default function RecentActivities({ limit = 5 }: { limit?: number }) {
  const [activities, setActivities] = useState<BackendActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const extractActivities = (invoices: BackendInvoice[]): BackendActivity[] => {
    return invoices
      .flatMap((inv) =>
        (inv.activities || []).map((act) => ({
          ...act,
          invoiceNumber: inv.invoiceNumber,
          customerName: inv.customerName,
        }))
      )
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, limit); // apply limit
  };

  // Keep a state for the full invoices (BackendInvoice[]) for mapping
  const [, setAllInvoices] = useState<BackendInvoice[]>([]);

  useEffect(() => {
    // Initial fetch
    fetch("http://localhost:4000/invoices")
      .then((res) => res.json())
      .then((data: BackendInvoice[]) => {
        setAllInvoices(data);
        setActivities(extractActivities(data));
      })
      .catch((err) => console.error("Failed to fetch activities:", err))
      .finally(() => setLoading(false));

    // Socket listener
    const handleNewInvoice = (inv: BackendInvoice) => {
      setAllInvoices((prev) => {
        const updated = [inv, ...prev];
        setActivities(extractActivities(updated));
        return updated;
      });
    };

    onInvoiceCreated(handleNewInvoice);
    return () => {
      offInvoiceCreated(handleNewInvoice);
    };
  }, [limit]);

  if (loading) return <p>Loading activities...</p>;
  if (!activities || activities.length === 0)
    return <p>No recent activities</p>;

  return (
    <div className="flex flex-col items-start p-8 gap-6 w-[431px] h-full bg-white rounded-[40px]">
      <div className="flex justify-between items-center w-[367px] h-[60px]">
        <h2 className="text-[20px] font-semibold leading-[25px] text-[#1F1F23]">
          Recent Activities
        </h2>
        <Button
          textColor="#003EFF"
          variant="outlined"
          size="md"
          className="w-[112px] h-[60px]"
        >
          View all
        </Button>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-auto">
        {activities.map((act) => (
          <ActivityItem
            key={act.id}
            userName={act.user}
            activityName={mapActivityType(act.type)}
            message={act.description}
            time={formatTimestamp(act.timestamp)}
            avatar={ActivityAvatar}
          />
        ))}
      </div>
    </div>
  );
}
