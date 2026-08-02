import type { Task } from "./types";
import { ClipboardList, Clock } from "lucide-react";

interface RecentTasksProps {
  tasks: Task[];
  isLoading?: boolean;
}

const priorityColors = {
  low: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  medium:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};

const statusBadges = {
  todo: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
  in_progress:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  review:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
  done: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
};

function RecentTasks({ tasks, isLoading = false }: RecentTasksProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-2"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Tasks
        </h2>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View All
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No tasks yet. Create your first task!
        </p>
      ) : (
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                  <ClipboardList className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
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
