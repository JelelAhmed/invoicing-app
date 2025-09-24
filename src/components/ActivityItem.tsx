interface ActivityItemProps {
  userName: string;
  time: string;
  message: string;
  activityName: string;
  avatar?: string;
}

export function ActivityItem({
  avatar,
  time,
  message,
  activityName,
}: ActivityItemProps) {
  const splitIndex =
    message.indexOf("Created invoice ") + "Created invoice ".length;
  const prefix = message.slice(0, splitIndex);
  const boldPart = message.slice(splitIndex);

  return (
    <div className="flex flex-row items-start gap-4 w-[367px]">
      {avatar && (
        <div className="relative flex justify-center items-center w-[48px] h-[48px] rounded-[30px] overflow-hidden">
          <img
            src={avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 w-[303px]">
        <div className="flex flex-col gap-1">
          <span className="text-[18px] font-medium leading-[22px] text-[#000000]">
            {activityName}
          </span>
          <span className="text-[14px] font-normal leading-[160%] text-[#697598]">
            {time}
          </span>
        </div>
        <div className="flex flex-col items-start p-4 gap-1 w-[303px] h-[76px] bg-[#F6F8FA] rounded-[16px]">
          <p className="text-[14px] font-normal leading-[160%] text-[#697598] w-[271px] h-[44px]">
            {prefix}
            <span className="font-medium">{boldPart}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

interface GenericActivityItemProps {
  user: string;
  timestamp: string;
  description: string;
  amount?: number;
  avatar?: string;
}

export function GenericActivityItem({
  user,
  timestamp,
  description,
  amount,
  avatar,
}: GenericActivityItemProps) {
  const slashIndex = description.indexOf("/") + 1;
  const prefix = description.slice(0, slashIndex); // e.g., "00239434/"
  const boldPart = description.slice(slashIndex); // e.g., "Olaniyi Ojo Adewale ..."

  return (
    <div className="relative flex flex-row items-start gap-4 w-[367px]">
      {/* Avatar + Connector */}
      <div className="relative flex flex-col items-center">
        {avatar && (
          <div className="relative flex justify-center items-center w-[48px] h-[48px] rounded-[30px] overflow-hidden z-10">
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Vertical line: starts just below avatar */}
        <div className="absolute top-[60px] left-[22px] w-[1px] h-[70px] bg-[#E3E6EF] z-0"></div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-2 w-[303px]">
        {/* Name & Timestamp */}
        <div className="flex flex-col gap-1">
          <span className="text-[18px] font-medium leading-[22px] text-[#000000]">
            {user}
          </span>
          <span className="text-[14px] font-normal leading-[160%] text-[#697598]">
            {timestamp}
          </span>
        </div>

        {/* Message Box */}
        <div className="flex flex-col items-start p-4 gap-1 w-[303px] bg-[#F6F8FA] rounded-[16px]">
          <p className="text-[14px] font-normal leading-[160%] text-[#697598]">
            {prefix}
            <span className="font-medium">{boldPart}</span>
            {amount && (
              <span className="font-medium"> ${amount.toLocaleString()}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
