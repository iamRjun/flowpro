import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "review" | "done";
}

function MyTasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (!userId) return;
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("id, title, status")
      .eq("user_id", userId)
      .limit(5);

    if (data) setTasks(data);
  };

  const getIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "in_progress":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="mt-8 px-3 py-2">
      {/* Header with toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition"
      >
        <span>My Tasks</span>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Task list */}
      {isOpen && (
        <div className="mt-2 space-y-1">
          {tasks.length === 0 ? (
            <p className="text-xs text-muted-foreground px-3 py-1">
              No tasks assigned
            </p>
          ) : (
            tasks.map((task) => (
              <Link
                key={task.id}
                to={`/tasks/${task.id}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-foreground hover:bg-muted transition"
              >
                {getIcon(task.status)}
                <span className="truncate">{task.title}</span>
              </Link>
            ))
          )}
          <Link
            to="/tasks"
            className="block text-xs text-primary hover:underline px-3 py-1"
          >
            View all tasks →
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyTasksList;

//implement tanstack query later
