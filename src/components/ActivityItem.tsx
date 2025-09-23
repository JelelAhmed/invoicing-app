interface ActivityItemProps {
  userName: string;
  time: string;
  message: string;
  activityName: string;
  avatar?: string;
}

export default function ActivityItem({
  avatar,
  time,
  message,
  activityName,
}: ActivityItemProps) {
  // Split message at the first occurrence of "Created invoice "
  const splitIndex =
    message.indexOf("Created invoice ") + "Created invoice ".length;
  const prefix = message.slice(0, splitIndex);
  const boldPart = message.slice(splitIndex);

  return (
    <div className="flex flex-row items-start gap-4 w-[367px]">
      {/* Avatar */}
      <div className="relative flex justify-center items-center w-[48px] h-[48px] rounded-[30px] overflow-hidden">
        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>

      {/* Right Section: ActivityName + Time + Message */}
      <div className="flex flex-col gap-2 w-[303px]">
        {/* Activity Name & Time */}
        <div className="flex flex-col gap-1">
          <span
            className="text-[18px] font-medium leading-[22px] text-[#000000] w-[136px] h-[22px] flex items-center whitespace-nowrap"
            style={{ flex: "none", order: 0, flexGrow: 0 }}
          >
            {activityName}
          </span>
          <span
            className="text-[14px] font-normal leading-[160%] text-[#697598] w-[131px] h-[22px] whitespace-nowrap"
            style={{
              letterSpacing: "0.003em",
              flex: "none",
              order: 1,
              flexGrow: 0,
            }}
          >
            {time}
          </span>
        </div>

        {/* Message Box */}
        <div
          className="flex flex-col items-start p-4 gap-1 w-[303px] h-[76px] bg-[#F6F8FA] rounded-[16px]"
          style={{ flex: "none", order: 2, alignSelf: "stretch", flexGrow: 0 }}
        >
          <p
            className="text-[14px] font-normal leading-[160%] text-[#697598] w-[271px] h-[44px]"
            style={{ letterSpacing: "0.003em" }}
          >
            {prefix}
            <span className="font-medium">{boldPart}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
