import React from "react";
import { Link } from "react-router-dom";
import { Home, FileText, Users, Settings, HelpCircle } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Home, to: "/" },
  { label: "Invoices", icon: FileText, to: "/invoices" },
  { label: "Accounts", icon: Users, to: "/accounts" },
  { label: "Beneficiaries", icon: Users, to: "/beneficiaries" },
  { label: "Help Center", icon: HelpCircle, to: "/help" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar() {
  return (
    <aside
      className="flex flex-col justify-between py-10 px-6 w-[280px] min-h-screen"
      style={{
        background: "linear-gradient(180deg, #DAF0FA 0%, #FFFCE2 100%)",
      }}
    >
      {/* Top section: logo + nav */}
      <div>
        <div className="mb-8">
          <div className="text-2xl font-bold text-text-dark">Youverify</div>
        </div>

        <nav className="space-y-2">
          {navItems.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-dark hover:bg-white/50"
            >
              <n.icon className="w-4 h-4" />
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom section: profile */}
      <div className="pt-6 border-t border-white/40">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <div className="text-sm font-semibold">Abduljelel</div>
            <div className="text-xs text-muted">Frontend</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
