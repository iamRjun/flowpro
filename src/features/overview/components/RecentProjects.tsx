import { type Project } from "../../dashboard/components/types";
import { FolderKanban } from "lucide-react";

interface RecentProjectsProps {
  projects: Project[];
  isLoading?: boolean;
}

function RecentProjects({ projects, isLoading = false }: RecentProjectsProps) {
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
        <h2 className="text-lg font-semibold text-foreground">
          Recent Projects
        </h2>
        <button className="text-sm text-primary hover:underline">
          View All
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No projects yet. Create your first project!
        </p>
      ) : (
        <div className="space-y-3">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FolderKanban className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {project.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{project.task_count} tasks</span>
                    <span>•</span>
                    <span className="capitalize">{project.status}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium shrink-0
                ${
                  project.status === "completed"
                    ? "bg-success/10 text-success"
                    : ""
                }
                ${
                  project.status === "active"
                    ? "bg-primary/10 text-primary"
                    : ""
                }
                ${
                  project.status === "archived"
                    ? "bg-muted text-muted-foreground"
                    : ""
                }
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
