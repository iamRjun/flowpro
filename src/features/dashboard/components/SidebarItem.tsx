import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  active?: boolean;
}

function SidebarItem({ icon: Icon, label, path, active }: SidebarItemProps) {
  return (
    <Link
      to={path}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
        ${
          active
            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `}
    >
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      <span>{label}</span>
    </Link>
  );
}

export default SidebarItem;
