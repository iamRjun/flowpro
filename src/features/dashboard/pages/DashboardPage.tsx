import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import StatsGrid from "../components/StatsGrid";
import RecentProjects from "../components/RecentProjects";
import RecentTasks from "../components/RecentTasks";
import QuickActions from "..//components/QuickActions";
import { supabase } from "../../../lib/supabase";
import type { Project, Task } from "../components/types";

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch projects
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Fetch tasks
      const { data: tasksData } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setProjects(projectsData || []);
      setTasks(tasksData || []);

      // Calculate stats
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

  const handleCreateProject = () => {
    // TODO: Open create project modal
    console.log("Create project");
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
          <QuickActions onCreateProject={handleCreateProject} />
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} isLoading={loading} />

        {/* Recent Projects & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentProjects projects={projects} isLoading={loading} />
          <RecentTasks tasks={tasks} isLoading={loading} />
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;
