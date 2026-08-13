import { useLocation } from "react-router-dom";
import { LayoutDashboard, FolderKanban, Settings, Users } from "lucide-react";
import SidebarItem from "./SidebarItem";
import MyProjectsLists from "../../projects/components/MyProjectsLists";
import MyTasksLists from "./MyTasksLists";

const sidebarItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    id: "teams",
    label: "Teams",
    icon: Users,
    path: "/teams",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          P
        </div>
        <span className="text-xl font-bold text-foreground">FlowPro</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={isActive(item.path)}
          />
        ))}
        <MyTasksLists />
        <MyProjectsLists />
      </nav>
    </aside>
  );
}

export default Sidebar;
