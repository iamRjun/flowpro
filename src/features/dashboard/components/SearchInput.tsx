import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  size?: number;
}

function SearchInput({ placeholder, size }: SearchInputProps) {
  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-muted-foreground">
      <Search size={size} />
      <input
        type="search"
        placeholder={placeholder}
        className="bg-transparent outline-none border-none text-sm text-foreground placeholder:text-muted-foreground w-full"
      ></input>
    </div>
  );
}

export default SearchInput;
