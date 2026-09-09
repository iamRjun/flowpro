import { useState } from "react";
import NewProjectButton from "@/features/dashboard/components/NewProjectButton";
import ProjectFilters from "../components/ProjectFilters";
import ProjectsList from "../components/CreateProject/ProjectsList";
import Modal from "@/features/components/ui/Modal";
import CreateProjectForm from "../components/CreateProject/CreateProjectForm";

function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateProject = () => {
    setIsModalOpen(true);
  };

  const handleProjectCreated = () => {
    setIsModalOpen(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground text-sm">
            Manage and track your projects
          </p>
        </div>
        <NewProjectButton onCreateProject={handleCreateProject} />
      </div>

      {/* Filters */}
      <ProjectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
      />

      {/* Projects List */}
      <ProjectsList
        key={refreshKey}
        searchQuery={searchQuery}
        statusFilter={selectedStatus}
        priorityFilter={selectedPriority}
      />

      {/* Create Project Modal - 2xl for more space */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        maxWidth="2xl"
      >
        <CreateProjectForm
          onSuccess={handleProjectCreated}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default ProjectsPage;
