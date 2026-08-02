export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: 'active' | 'completed' | 'archived';
  task_count: number;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  project_id: string;
  project_name?: string;
  due_date: string | null;
  created_at: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
}