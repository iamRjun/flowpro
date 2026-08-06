import { Menu, Bell, Moon, Sun, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import SearchInput from "./SearchInput";

interface HeaderProps {
  toggleSidebar?: () => void;
}

function Header({ toggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-background border-b border-border px-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-muted text-foreground"
        >
          <Menu size={24} />
        </button>

        {/* Search - Placeholder for now */}
        <SearchInput placeholder="Search projects, tasks.." size={18} />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-muted text-foreground"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-muted text-foreground">
          <Bell size={20} />
        </button>

        {/* User Avatar */}
        <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
          <User size={18} />
        </button>
      </div>
    </header>
  );
}

export default Header;
