import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  size?: number;
}

function SearchInput({ placeholder, size }: SearchInputProps) {
  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-muted-foreground">
      <Search size={size} />
      <span className="text-sm">{placeholder}</span>
    </div>
  );
}

export default SearchInput;
