import { useState } from "react";
import QuickActions from "../components/QuickActions";
import ProjectFilters from "../components/ProjectFilters";

function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const handleCreateProject = () => {
    console.log("Create project");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground text-sm">
            Manage and track your projects
          </p>
        </div>
        <QuickActions onCreateProject={handleCreateProject} />
      </div>

      <ProjectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
      />
    </div>
  );
}

export default ProjectsPage;
//make separate folder for different pages of dashboard
