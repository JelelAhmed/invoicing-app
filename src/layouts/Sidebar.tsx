import { NavLink } from "react-router-dom";

import { GetStartedIcon } from "../assets/icons/GetStartedIcon";
import { OverviewIcon } from "../assets/icons/OveviewIcon";
import { AccountsIcon } from "../assets/icons/AcccountsIcon";
import { InvoiceIcon } from "../assets/icons/InvoiceIcon";
import { HelpCenterIcon } from "../assets/icons/HelpCenterIcon";
import { SettingsIcon } from "../assets/icons/SettingsIcon";
import { UsersIcon } from "../assets/icons/UsersIcon";

const navItems = [
  { label: "Getting Started", icon: GetStartedIcon, to: "/getting-started" },
  { label: "Overview", icon: OverviewIcon, to: "/" },
  { label: "Accounts", icon: AccountsIcon, to: "/accounts" },
  { label: "Invoice", icon: InvoiceIcon, to: "/invoice" },
  { label: "Beneficiary Management", icon: UsersIcon, to: "/beneficiaries" },
  { label: "Help Center", icon: HelpCenterIcon, to: "/help" },
  { label: "Settings", icon: SettingsIcon, to: "/settings" },
];

function SidebarNav() {
  return (
    <aside className="w-sidebar min-h-screen bg-white flex flex-col items-center justify-between py-10 px-6">
      {/* Top section */}
      <div className="flex flex-col gap-10 w-full">
        {/* Logo */}
        <div className="h-6 w-[8px] bg-primary rounded-sm text-white flex items-center justify-center text-xs font-bold"></div>

        {/* Nav Links */}
        <nav className="flex flex-col items-start p-0 gap-3 w-[232px] h-[452px]">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to} end>
              {({ isActive }) => (
                <div
                  className={isActive ? "p-2 bg-[#F8F8FB] rounded-[32px]" : ""}
                >
                  <div
                    className={`flex flex-row items-center px-4 py-[14px] gap-2 w-[232px] h-[52px] rounded-[32px] transition-colors
                      ${
                        isActive
                          ? "bg-white text-text-active"
                          : "text-text-inactive hover:bg-[#F8F8FB]"
                      }`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="font-sans font-normal text-sm leading-[17px] tracking-[0.0057em]">
                      {item.label}
                    </span>
                  </div>
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default SidebarNav;
