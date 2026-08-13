import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ChevronDown } from "lucide-react";

interface Project {
  id: string;
  name: string;
}

function MyProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("projects")
      .select("id, name")
      .eq("user_id", user.id)
      .limit(5);

    if (data) setProjects(data);
  };

  return (
    <div className="mt-6 px-3 py-2">
      {/* Header with toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition"
      >
        <span>Projects</span>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Project list */}
      {isOpen && (
        <div className="mt-2 space-y-1">
          {projects.length === 0 ? (
            <p className="text-xs text-muted-foreground px-3 py-1">
              No projects yet
            </p>
          ) : (
            projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-foreground hover:bg-muted transition"
              >
                <FolderKanban className="w-4 h-4 text-primary" />
                <span className="truncate">{project.name}</span>
              </Link>
            ))
          )}
          <Link
            to="/projects"
            className="block text-xs text-primary hover:underline px-3 py-1"
          >
            View all projects →
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyProjectsList;
