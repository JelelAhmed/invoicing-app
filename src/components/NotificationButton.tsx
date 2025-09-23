export default function NotificationButton() {
  return (
    <button className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-text-dark"
      >
        <path
          d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-40"
        />
        <path
          d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.93 6 11V16L4 18V19H20V18L18 16Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
