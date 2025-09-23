import * as React from "react";

export const HelpCenterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 18.43H13L8.55 21.39C7.89 21.83 7 21.36 7 20.56V18.43C4 18.43 2 16.43 2 13.43V7.43C2 4.43 4 2.43 7 2.43H17C20 2.43 22 4.43 22 7.43V13.43C22 16.43 20 18.43 17 18.43Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity={0.4}
      d="M12 11.36V11.15C12 10.47 12.42 10.11 12.84 9.82C13.25 9.54 13.66 9.18 13.66 8.52C13.66 7.6 12.92 6.86 12 6.86C11.08 6.86 10.34 7.6 10.34 8.52"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity={0.4}
      d="M11.9955 13.75H12.0045"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
