import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "outlined" | "filled";
  size?: "sm" | "lg";
  className?: string;
};

export default function Button({
  children,
  variant = "filled",
  size = "lg",
  className,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 rounded-full uppercase font-medium tracking-[0.02em]",
        {
          // figma sizing mapping
          "h-[68px] px-[120px] text-[14px] leading-[17px]": size === "sm", // outlined one
          "h-[68px] px-10 text-[16px] leading-[20px]": size === "lg", // filled one
        },
        {
          // === Variants ===
          "bg-white border border-[#E3E6EF] text-[#697598]":
            variant === "outlined",
          "bg-[#003EFF] text-white": variant === "filled",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
