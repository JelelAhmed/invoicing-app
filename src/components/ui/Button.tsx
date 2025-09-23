import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "outlined" | "filled";
  size?: "sm" | "md" | "lg";
  textColor?: string;
  className?: string;
};

export default function Button({
  children,
  variant = "filled",
  size = "lg",
  textColor,
  className,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 rounded-full uppercase font-semibold tracking-[0.02em] transition",
        {
          "h-[60px] px-4 text-[12px] leading-[16px] tracking-[0.07em]":
            size === "md",
          "h-[68px] px-[120px] text-[14px] leading-[17px]": size === "sm",
          "h-[68px] px-10 text-[16px] leading-[20px]": size === "lg",
          "bg-white border border-[#E3E6EF] text-[#697598]":
            variant === "outlined" && !textColor,
          "bg-white border border-[#E3E6EF]":
            variant === "outlined" && textColor,
          "bg-[#003EFF] text-white hover:bg-[#002FCC]": variant === "filled",
        },
        className
      )}
      style={textColor ? { color: textColor } : undefined}
    >
      {children}
    </button>
  );
}
