import { Search } from "lucide-react";

interface SearchBarProps {
  currentSearch: string;
  setCurrentSearch: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchBar = ({
  currentSearch,
  setCurrentSearch,
}: SearchBarProps) => {
  return (
    <div className="relative rounded-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="search"
        name="currentSearch"
        id="currentSearch"
        value={!currentSearch ? "" : currentSearch}
        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF751F] sm:text-sm sm:leading-6"
        placeholder="Rechercher"
        onChange={(event) => {
          setCurrentSearch(event.target.value);
        }}
      />
    </div>
  );
};
