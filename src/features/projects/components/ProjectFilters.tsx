import SearchInput from "../../dashboard/components/SearchInput";
import StatusDropdown from "./StatusDropdown";
import PriorityDropdown from "./PriorityDropdown";

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
}

function ProjectFilters({
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <SearchInput placeholder="Search projects..." size={18} />
      <div className="flex gap-3 w-full sm:w-auto">
        <StatusDropdown value={selectedStatus} onChange={onStatusChange} />
        <PriorityDropdown
          value={selectedPriority}
          onChange={onPriorityChange}
        />
      </div>
    </div>
  );
}

export default ProjectFilters;
