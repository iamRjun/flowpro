import StatsCard from "./StatsCard";
import { type DashboardStats } from "../../dashboard/components/types";

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
            className="bg-card rounded-xl border border-border p-6 animate-pulse"
          >
            <div className="h-4 bg-muted rounded w-1/2 mb-2" />
            <div className="h-8 bg-muted rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="Total Projects" value={stats.totalProjects} />
      <StatsCard title="Total Tasks" value={stats.totalTasks} />
      <StatsCard title="Completed Tasks" value={stats.completedTasks} />
      <StatsCard title="In Progress" value={stats.inProgressTasks} />
    </div>
  );
}

export default StatsGrid;
