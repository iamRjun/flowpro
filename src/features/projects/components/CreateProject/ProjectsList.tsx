import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  priority?: string;
  created_at: string;
}

interface ProjectsListProps {
  searchQuery: string;
  statusFilter: string;
  priorityFilter: string;
}

function ProjectsList({
  searchQuery,
  statusFilter,
  priorityFilter,
}: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    // If priorityFilter is set, check if project has priority
    const matchesPriority =
      priorityFilter === "all" ||
      (project.priority && project.priority === priorityFilter);

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      {filteredProjects.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
            ? "No projects match your filters"
            : "No projects yet. Create your first project!"}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition"
            >
              <div>
                <p className="font-medium text-foreground">{project.name}</p>
                {project.description && (
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                )}
              </div>
              <span className="text-sm text-muted-foreground capitalize">
                {project.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsList;
