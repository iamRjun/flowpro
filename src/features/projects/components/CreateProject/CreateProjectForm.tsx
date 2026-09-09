import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, User, Users, X, ChevronDown } from "lucide-react";

interface CreateProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface UserProfile {
  id: string;
  email: string;
  name?: string;
}

function CreateProjectForm({ onSuccess, onCancel }: CreateProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("planning");
  const [priority, setPriority] = useState("medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectLead, setProjectLead] = useState("");
  const [teamMembers, setTeamMembers] = useState<UserProfile[]>([]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dropdown states
  const [isLeadDropdownOpen, setIsLeadDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [teamSearchQuery, setTeamSearchQuery] = useState("");

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setIsLeadDropdownOpen(false);
      setIsTeamDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, name");
      if (error) throw error;
      setAllUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in");

      const { error: supabaseError } = await supabase.from("projects").insert({
        name: name.trim(),
        description: description.trim() || null,
        status: status,
        priority: priority,
        start_date: startDate || null,
        end_date: endDate || null,
        project_lead: projectLead || null,
        user_id: user.id,
      });

      if (supabaseError) throw supabaseError;

      // If team members selected, add them to project_team table
      if (teamMembers.length > 0) {
        // Note: You'll need to get the project ID from the created project
        // This is a simplified version
        console.log("Team members:", teamMembers);
      }

      // Reset form
      setName("");
      setDescription("");
      setStatus("planning");
      setPriority("medium");
      setStartDate("");
      setEndDate("");
      setProjectLead("");
      setTeamMembers([]);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const addTeamMember = (user: UserProfile) => {
    if (!teamMembers.find((m) => m.id === user.id)) {
      setTeamMembers([...teamMembers, user]);
    }
    setTeamSearchQuery("");
    setIsTeamDropdownOpen(false);
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
  };

  const getLeadName = (id: string) => {
    const user = allUsers.find((u) => u.id === id);
    return user ? user.name || user.email : "No lead";
  };

  // Get display name for user
  const getDisplayName = (user: UserProfile) => {
    return user.name || user.email;
  };

  // Filter users for team dropdown
  const filteredTeamUsers = allUsers.filter(
    (user) =>
      user.email.toLowerCase().includes(teamSearchQuery.toLowerCase()) &&
      !teamMembers.find((m) => m.id === user.id) &&
      user.id !== projectLead, // Don't show project lead as team member
  );

  // Filter users for lead dropdown
  const filteredLeadUsers = allUsers.filter(
    (user) => !teamMembers.find((m) => m.id === user.id),
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
          {error}
        </div>
      )}

      {/* Project Name */}
      <div>
        <label
          htmlFor="project-name"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Project Name <span className="text-danger">*</span>
        </label>
        <input
          id="project-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., E-Commerce Website"
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          required
          autoFocus
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="project-description"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Description{" "}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </label>
        <textarea
          id="project-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the project..."
          rows={3}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
        />
      </div>

      {/* Status & Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on_hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Start Date & End Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            />
          </div>
        </div>
      </div>

      {/* Project Lead - Dropdown */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Project Lead
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLeadDropdownOpen(!isLeadDropdownOpen);
              setIsTeamDropdownOpen(false);
            }}
            className="w-full pl-9 pr-10 py-2 bg-background border border-border rounded-lg text-foreground text-left focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition flex items-center justify-between"
          >
            <span
              className={
                projectLead ? "text-foreground" : "text-muted-foreground"
              }
            >
              {projectLead ? getLeadName(projectLead) : "Select project lead"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${isLeadDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Lead Dropdown Options */}
          {isLeadDropdownOpen && (
            <div className="absolute z-20 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {/* Clear option */}
              <button
                type="button"
                onClick={() => {
                  setProjectLead("");
                  setIsLeadDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-muted transition text-sm text-muted-foreground"
              >
                No lead
              </button>
              {filteredLeadUsers.length === 0 ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No users available
                </div>
              ) : (
                filteredLeadUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => {
                      setProjectLead(user.id);
                      setIsLeadDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-muted transition text-sm text-foreground ${
                      projectLead === user.id
                        ? "bg-primary/10 text-primary"
                        : ""
                    }`}
                  >
                    {getDisplayName(user)}
                    <span className="text-xs text-muted-foreground ml-2">
                      {user.email}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Team Members - Dropdown with Multi-Select */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Team Members
        </label>

        {/* Selected Team Members */}
        {teamMembers.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {teamMembers.map((member) => (
              <span
                key={member.id}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {getDisplayName(member)}
                <button
                  type="button"
                  onClick={() => removeTeamMember(member.id)}
                  className="hover:text-danger transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add Team Member Dropdown */}
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsTeamDropdownOpen(!isTeamDropdownOpen);
              setIsLeadDropdownOpen(false);
            }}
            className="w-full pl-9 pr-10 py-2 bg-background border border-border rounded-lg text-foreground text-left focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition flex items-center justify-between"
          >
            <span className="text-muted-foreground">
              {teamMembers.length > 0
                ? `${teamMembers.length} member${teamMembers.length > 1 ? "s" : ""} selected`
                : "Add team members"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${isTeamDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Team Dropdown Options */}
          {isTeamDropdownOpen && (
            <div className="absolute z-20 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {/* Search input inside dropdown */}
              <div className="sticky top-0 bg-background p-2 border-b border-border">
                <input
                  type="text"
                  value={teamSearchQuery}
                  onChange={(e) => setTeamSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full px-3 py-1.5 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {filteredTeamUsers.length === 0 ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  {teamSearchQuery ? "No users found" : "All users added"}
                </div>
              ) : (
                filteredTeamUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => addTeamMember(user)}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition text-sm text-foreground flex items-center justify-between"
                  >
                    <span>{getDisplayName(user)}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {teamMembers.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            {teamMembers.length} member{teamMembers.length > 1 ? "s" : ""} added
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="px-6 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </div>
    </form>
  );
}

export default CreateProjectForm;
