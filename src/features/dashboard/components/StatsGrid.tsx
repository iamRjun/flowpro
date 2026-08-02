import { FolderKanban, ClipboardList, CheckCircle, Timer } from "lucide-react";
import StatsCard from "./StatsCard";
import { type DashboardStats } from "./types";

interface StatsGridProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

function StatsGrid({ stats, isLoading = false }: StatsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Projects"
        value={stats.totalProjects}
        icon={FolderKanban}
        iconColor="text-blue-600"
        iconBg="bg-blue-50 dark:bg-blue-900/30"
      />
      <StatsCard
        title="Total Tasks"
        value={stats.totalTasks}
        icon={ClipboardList}
        iconColor="text-purple-600"
        iconBg="bg-purple-50 dark:bg-purple-900/30"
      />
      <StatsCard
        title="Completed Tasks"
        value={stats.completedTasks}
        icon={CheckCircle}
        iconColor="text-green-600"
        iconBg="bg-green-50 dark:bg-green-900/30"
      />
      <StatsCard
        title="In Progress"
        value={stats.inProgressTasks}
        icon={Timer}
        iconColor="text-orange-600"
        iconBg="bg-orange-50 dark:bg-orange-900/30"
      />
    </div>
  );
}

export default StatsGrid;
