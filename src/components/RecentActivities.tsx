import ActivityItem from "./ActivityItem";
import ActivityAvatar from "../assets/icons/activityAvatar.png";
import Button from "./ui/Button";

export default function RecentActivities() {
  const activities = [
    {
      id: 1,
      userName: "Olaniyi Ojo Adewale",
      activityName: "Invoice Creation",
      message: "Created invoice 00239434/Olaniyi Ojo Adewale",
      time: "Yesterday, 12:05 PM",
    },
    {
      id: 2,
      userName: "John Doe",
      activityName: "Invoice Creation",
      message: "Created invoice 00239434/John Doe",
      time: "May 19th, 2023",
    },
    {
      id: 1,
      userName: "Chika Ikenna",
      activityName: "Invoice Creation",
      message: "Created invoice 00239434/Chika Ikenna",
      time: "Yesterday, 12:05 PM",
    },
    {
      id: 2,
      userName: "John Musk",
      activityName: "Invoice Creation",
      message: "Created invoice 00239434/John Musk",
      time: "May 19th, 2023",
    },
  ];
  return (
    <div className="flex flex-col items-start p-8 gap-6 w-[431px] h-full bg-white rounded-[40px]">
      {/* Header */}
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

      {/* Activities List */}
      <div className="flex flex-col gap-4 flex-1 overflow-auto">
        {activities.map((act) => (
          <ActivityItem
            key={act.id}
            userName={act.userName}
            activityName={act.activityName}
            message={act.message}
            time={act.time}
            avatar={ActivityAvatar}
          />
        ))}
      </div>
    </div>
  );
}
