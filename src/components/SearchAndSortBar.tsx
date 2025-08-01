

import Button from './Button';
import type { User } from '../types/User';

interface SearchAndSortBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  sortBy: keyof User;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: keyof User) => void;
}


export const SearchAndSortBar: React.FC<SearchAndSortBarProps> = ({
  search,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  // Only allow sorting by 'name' or 'email' fields
  const handleSortClick = (field: keyof User) => {
    onSortChange(field);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by Name or Email"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search"
        className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
      />
      <div className="flex gap-4">
        {(['name', 'email'] as Array<keyof User>).map((field) => (
          <Button
            key={field}
            onClick={() => handleSortClick(field)}
            className={
              sortBy === field
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }
            aria-pressed={sortBy === field}
          >
            Sort by {field} {sortBy === field ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </Button>
        ))}
      </div>
    </div>
  );
};
