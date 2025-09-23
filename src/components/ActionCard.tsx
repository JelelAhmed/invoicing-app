import React from "react";

interface ActionCardProps {
  variant?: "blue" | "white";
  icon: React.ElementType | string; // Accepts component or image
  title: string;
  description: string;
  onClick?: () => void;
}

export default function ActionCard({
  variant = "blue",
  icon,
  title,
  description,
  onClick,
}: ActionCardProps) {
  const isBlue = variant === "blue";
  const isImage = typeof icon === "string"; // Detect if PNG path

  // Capitalize dynamically to use in JSX
  const IconComponent = icon as React.ElementType;

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col justify-center items-start px-10 py-8 gap-4 isolate
        w-[339px] h-[217px] rounded-[24px] transition-all duration-200 cursor-pointer
        ${
          isBlue
            ? "bg-[#003EFF] text-white"
            : "bg-white text-[#1F1F23] border border-gray-100"
        } hover:shadow-lg`}
    >
      {/* Icon - support both image and component */}
      {isImage ? (
        <img
          src={icon as string}
          alt={title}
          className="w-[60px] h-[60px] object-contain"
        />
      ) : (
        <IconComponent
          className={`w-[60px] h-[60px] ${
            isBlue ? "text-white/80" : "text-gray-400"
          }`}
        />
      )}

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[21px] font-semibold leading-[27px]">{title}</h3>
        <p
          className={`text-[14px] leading-[22px] tracking-[0.003em] ${
            isBlue ? "text-[#F6F8FA]" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
