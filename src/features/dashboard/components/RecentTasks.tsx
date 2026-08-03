import type { Task } from "./types";
import { ClipboardList, Clock } from "lucide-react";

interface RecentTasksProps {
  tasks: Task[];
  isLoading?: boolean;
}

const priorityColors = {
  low: "bg-primary/10 text-primary",
  medium: "bg-warning/10 text-warning",
  high: "bg-danger/10 text-danger",
};

const statusBadges = {
  todo: "bg-muted text-muted-foreground",
  in_progress: "bg-primary/10 text-primary",
  review: "bg-secondary/10 text-secondary-foreground",
  done: "bg-success/10 text-success",
};

function RecentTasks({ tasks, isLoading = false }: RecentTasksProps) {
  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/4 mb-4" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 bg-muted rounded mb-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Tasks</h2>
        <button className="text-sm text-primary hover:underline">
          View All
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No tasks yet. Create your first task!
        </p>
      ) : (
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <ClipboardList className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {task.project_name && <span>{task.project_name}</span>}
                    <span>•</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full ${priorityColors[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                    {task.due_date && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${statusBadges[task.status]}`}
              >
                {task.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentTasks;
