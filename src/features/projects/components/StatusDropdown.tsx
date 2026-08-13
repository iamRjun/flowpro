import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

function StatusDropdown({ value, onChange }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current label
  const currentLabel =
    statusOptions.find((opt) => opt.value === value)?.label || "All Status";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-muted transition"
      >
        <span>{currentLabel}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg overflow-hidden">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition ${
                option.value === value
                  ? "bg-primary/10 text-primary"
                  : "text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusDropdown;
