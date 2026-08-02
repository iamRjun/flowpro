import { FolderPlus } from "lucide-react";

interface QuickActionsProps {
  onCreateProject: () => void;
}

function QuickActions({ onCreateProject }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onCreateProject}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
      >
        <FolderPlus className="w-4 h-4" />
        New Project
      </button>
    </div>
  );
}

export default QuickActions;
