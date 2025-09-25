import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

interface ProfileBlockProps {
  initials: string;
}

export default function ProfileBlock({ initials }: ProfileBlockProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Main profile block */}
      <div
        className="flex items-center justify-between px-3 py-2 bg-white rounded-[40px] w-[88px] h-[64px] gap-3 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Initials circle */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary">
          <span className="text-white font-bold text-[14px] leading-[18px] capitalize">
            {initials}
          </span>
        </div>

        {/* Dropdown chevron */}
        <ChevronDown className="w-4 h-4 text-[#697598]" />
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md py-2 z-10">
          <button
            onClick={handleSignOut}
            className="flex items-center text-red gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
