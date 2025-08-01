import React from 'react';
import type { User } from '../types/User';

interface UserTableProps {
  users: User[];
  onRowClick: (user: User) => void;
  sortBy: keyof User;
  sortOrder: 'asc' | 'desc';
  onSort: (field: keyof User) => void;
}

// Responsive row height: more for mobile, less for desktop
const useResponsiveRowHeight = () => {
  const [rowHeight, setRowHeight] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 640 ? 70 : 48
  );
  React.useEffect(() => {
    const handleResize = () => {
      setRowHeight(window.innerWidth < 640 ? 70 : 48);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return rowHeight;
};
const VIRTUALIZE_THRESHOLD = 50;

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onRowClick,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const ROW_HEIGHT = useResponsiveRowHeight();
  // Sort handler for header click
  const handleSort = (field: keyof User) => {
    onSort(field);
  };

  // Table row renderer
  const renderUserRow = (user: User, style?: React.CSSProperties) => (
    <tr
      key={user.id}
      style={style}
      className="hover:bg-blue-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400"
      onClick={() => onRowClick(user)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${user.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onRowClick(user);
        }
      }}
    >
      <td className="border border-gray-300 px-4 py-2">{user.name}</td>
      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
      <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
    </tr>
  );

  // Virtualized row renderer (CSS grid, minmax columns, consistent spacing)
  const renderVirtualRow = (user: User, style?: React.CSSProperties) => {
    return (
      <div
        key={user.id}
        style={{
          ...style,
          display: 'grid',
          gridTemplateColumns: 'minmax(120px,1fr) minmax(240px,2.5fr) minmax(120px,1fr)',
          width: '100%',
          alignItems: 'center',
          boxSizing: 'border-box',
          borderBottom: '1px solid #d1d5db',
          background: '#fff',
          outline: 'none',
          transition: 'background 0.2s',
        }}
        className="hover:bg-blue-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400"
        onClick={() => onRowClick(user)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onRowClick(user);
          }
        }}
      >
        <div style={{padding: '0 1rem', height: ROW_HEIGHT - 2, display: 'flex', alignItems: 'center', borderRight: '1px solid #d1d5db', overflowWrap:'break-word', wordBreak:'break-all'}}>{user.name}</div>
        <div style={{padding: '0 1rem', height: ROW_HEIGHT - 2, display: 'flex', alignItems: 'center', borderRight: '1px solid #d1d5db', overflowWrap:'break-word', wordBreak:'break-all'}}>{user.email}</div>
        <div style={{padding: '0 1rem', height: ROW_HEIGHT - 2, display: 'flex', alignItems: 'center', overflowWrap:'break-word', wordBreak:'break-all'}}>{user.phone}</div>
      </div>
    );
  };

  // Load react-window's FixedSizeList only if needed
  const [List, setList] = React.useState<any>(null);
  React.useEffect(() => {
    let mounted = true;
    if (users.length > VIRTUALIZE_THRESHOLD) {
      import('react-window').then((mod) => {
        if (mounted) setList(() => mod.FixedSizeList);
      });
    } else {
      setList(null);
    }
    return () => {
      mounted = false;
    };
  }, [users.length]);

  // Row renderer for virtualization
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const user = users[index];
    if (!user) return null;
    return renderVirtualRow(user, style);
  };

  // Table columns
  const columns: Array<{ key: keyof User; label: string }> = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];

  // Header renderer for both table and grid
  const renderHeader = (isGrid = false) =>
    isGrid ? (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(120px,1fr) minmax(240px,2.5fr) minmax(120px,1fr)',
          fontWeight: 600,
          background: '#f9fafb',
          borderBottom: '1px solid #d1d5db',
          minHeight: ROW_HEIGHT,
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 2,
        }}
      >
        {columns.map((col, idx) => (
          <div
            key={col.key}
            style={{
              padding: '0 1rem',
              height: ROW_HEIGHT - 2,
              display: 'flex',
              alignItems: 'center',
              borderRight: idx < columns.length - 1 ? '1px solid #d1d5db' : undefined,
              cursor: 'pointer',
              userSelect: 'none',
            }}
            tabIndex={0}
            aria-sort={
              sortBy === col.key
                ? sortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
            onClick={() => handleSort(col.key)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSort(col.key);
              }
            }}
          >
            {col.label}
            {sortBy === col.key ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
          </div>
        ))}
      </div>
    ) : (
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col.key)}
              className="cursor-pointer border border-gray-300 px-4 py-2 text-left select-none"
              aria-sort={
                sortBy === col.key
                  ? sortOrder === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSort(col.key);
                }
              }}
            >
              {col.label}
              {sortBy === col.key ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
    );

  // Main table rendering
  return (
    <div className="overflow-x-auto w-full" role="region" aria-label="User Table">
      <table className="min-w-full border-collapse border border-gray-300 table-auto" aria-label="User List" role="table">
        {users.length > VIRTUALIZE_THRESHOLD && List
          ? null
          : renderHeader(false)}
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
          {users.length > VIRTUALIZE_THRESHOLD && List ? (
            <tr>
              <td colSpan={3} style={{padding:0, border:'none'}}>
                <div style={{width:'100%'}}>
                  {renderHeader(true)}
                  <List
                    height={Math.min(users.length, 10) * ROW_HEIGHT}
                    itemCount={users.length}
                    itemSize={ROW_HEIGHT}
                    width={"100%"}
                    role="listbox"
                    aria-label="Virtualized User List"
                  >
                    {Row}
                  </List>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => renderUserRow(user))
          )}
        </tbody>
      </table>
    </div>
  );
};
