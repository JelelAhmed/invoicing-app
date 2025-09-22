import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between py-4">
      {/* Left: title + subtitle */}
      <div>
        <h1 className="text-2xl font-semibold text-text-dark">Dashboard</h1>
        <p className="text-sm text-muted">
          Overview of invoices and recent activities
        </p>
      </div>

      {/* Right: search, actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white/80 px-3 py-2 rounded-full shadow-sm">
          <Search className="w-4 h-4 text-muted mr-2" />
          <input
            className="outline-none text-sm bg-transparent"
            placeholder="Search invoices..."
          />
        </div>

        <button className="px-5 py-2 rounded-full bg-primary text-white font-medium">
          Create
        </button>

        <button
          aria-label="Notifications"
          className="p-2 rounded-full hover:bg-white/50"
        >
          <Bell className="w-5 h-5 text-muted" />
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="h-10 w-10 rounded-full border"
        />
      </div>
    </div>
  );
}
