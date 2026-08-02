import { type Project } from "./types";
import { FolderKanban } from "lucide-react";

interface RecentProjectsProps {
  projects: Project[];
  isLoading?: boolean;
}

function RecentProjects({ projects, isLoading = false }: RecentProjectsProps) {
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
          Recent Projects
        </h2>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View All
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No projects yet. Create your first project!
        </p>
      ) : (
        <div className="space-y-3">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <FolderKanban className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {project.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{project.task_count} tasks</span>
                    <span>•</span>
                    <span className="capitalize">{project.status}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium shrink-0
                ${project.status === "completed" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : ""}
                ${project.status === "active" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" : ""}
                ${project.status === "archived" ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400" : ""}
              `}
              >
                {project.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentProjects;
