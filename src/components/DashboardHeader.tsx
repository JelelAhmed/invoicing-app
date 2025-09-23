// DashboardHeader.tsx
import ProfileBlock from "./ProfileBlock";
import NotificationButton from "./NotificationButton";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between w-full max-w-[1080px] h-[100px] border-b border-[rgba(162,184,255,0.2)]">
      {/* Left: Dynamic Page Title */}
      <h1 className="text-[28px] leading-[35px] font-medium tracking-[0.12em] uppercase text-text-dark">
        {title}
      </h1>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        <NotificationButton />
        <ProfileBlock initials="KO" />
      </div>
    </header>
  );
}
