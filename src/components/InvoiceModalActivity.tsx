import { GenericActivityItem } from "./ActivityItem";
import senderAvatar from "../assets/icons/activityAvatar.png";

interface InvoiceModalActivityProps {
  activities: Array<{
    type: string;
    user: string;
    timestamp: string;
    description: string;
    amount?: number;
    avatar?: string;
  }>;
}

export default function InvoiceModalActivity({
  activities,
}: InvoiceModalActivityProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-lg">Invoice Activity</h3>
      {activities.map((act, i) => (
        <GenericActivityItem
          key={i}
          user={act.user}
          timestamp={act.timestamp}
          description={act.description}
          amount={act.amount}
          avatar={senderAvatar}
        />
      ))}
    </div>
  );
}
