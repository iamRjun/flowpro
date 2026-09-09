import { useState, useEffect } from "react";
import StatsGrid from "../components/StatsGrid";
import RecentProjects from "../components/RecentProjects";
import RecentTasks from "../components/RecentTasks";
import { supabase } from "@/lib/supabase";
import type { Project, Task } from "../../dashboard/components/types";
import NewProjectButton from "../../dashboard/components/NewProjectButton";
import Modal from "@/features/components/ui/Modal";
import CreateProjectForm from "../../projects/components/CreateProject/CreateProjectForm";

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const { data: tasksData } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setProjects(projectsData || []);
      setTasks(tasksData || []);

      const completed =
        tasksData?.filter((t) => t.status === "done").length || 0;
      const inProgress =
        tasksData?.filter((t) => t.status === "in_progress").length || 0;

      setStats({
        totalProjects: projectsData?.length || 0,
        totalTasks: tasksData?.length || 0,
        completedTasks: completed,
        inProgressTasks: inProgress,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCreateProject = () => {
    setIsModalOpen(true);
  };

  const handleProjectCreated = () => {
    setIsModalOpen(false);
    setRefreshKey((prev) => prev + 1);
    fetchDashboardData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <NewProjectButton onCreateProject={handleCreateProject} />
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={stats} isLoading={loading} />

      {/* Recent Projects & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentProjects
          key={`projects-${refreshKey}`}
          projects={projects}
          isLoading={loading}
        />
        <RecentTasks tasks={tasks} isLoading={loading} />
      </div>

      {/* Create Project Modal */}
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

export default DashboardPage;
