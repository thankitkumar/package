
'use client';

import { useState, useEffect, useMemo } from 'react';
import { ReactifyAdvancedTable, type ColumnDef } from '@/components/reactify/advanced-table';
import { ReactifyCard, ReactifyCardContent, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription } from '@/components/reactify/card';
import { ReactifyBadge } from '@/components/reactify/badge';
import { ReactifyButton } from '@/components/reactify/button';
import { RefreshCw, Edit3, Trash2, Shield, User } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Editor';
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string; // ISO string
}

// Simulate API data fetching
const allUsers: User[] = Array.from({ length: 123 }, (_, i) => ({
  id: i + 1,
  name: `User ${String.fromCharCode(65 + (i % 26))}${i}`,
  email: `user${i + 1}@example.com`,
  role: (['Admin', 'User', 'Editor'] as UserRole[])[i % 3],
  status: (['Active', 'Inactive', 'Pending'] as UserStatus[])[i % 3],
  createdAt: new Date(Date.now() - Math.random() * 1e10).toISOString(),
}));

type UserRole = 'Admin' | 'User' | 'Editor';
type UserStatus = 'Active' | 'Inactive' | 'Pending';


export default function ReactifyAdvancedTableDemo() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const pageCount = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 750));
      
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      setData(allUsers.slice(start, end));
      setTotalItems(allUsers.length);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, pageSize]);

  const columns = useMemo((): ColumnDef<User>[] => [
    {
      key: 'id',
      header: 'ID',
      width: 80,
      minWidth: 60,
    },
    {
      key: 'name',
      header: 'Name',
      width: 200,
      minWidth: 150,
      cell: (row) => {
        const icon =
          row.role === 'Admin' ? <Shield size={14} className="text-primary" />
          : row.role === 'Editor' ? <Edit3 size={14} className="text-amber-600" />
          : <User size={14} className="text-muted-foreground" />;
        return (
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium">{row.name}</span>
          </div>
        );
      },
    },
    {
      key: 'email',
      header: 'Email',
      width: 250,
      minWidth: 200,
    },
    {
      key: 'role',
      header: 'Role',
      width: 120,
      cell: (row) => {
        let variant: 'primary' | 'secondary' | 'warning' = 'secondary';
        if (row.role === 'Admin') variant = 'primary';
        if (row.role === 'Editor') variant = 'warning';
        return <ReactifyBadge variant={variant} size="sm">{row.role}</ReactifyBadge>;
      },
    },
    {
      key: 'status',
      header: 'Status',
      width: 120,
      cell: (row) => {
        let variant: 'success' | 'destructive' | 'outline' = 'outline';
        if (row.status === 'Active') variant = 'success';
        if (row.status === 'Inactive') variant = 'destructive';
        return <ReactifyBadge variant={variant} size="sm">{row.status}</ReactifyBadge>;
      },
    },
    {
      key: 'createdAt',
      header: 'Created At',
      width: 180,
      cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
        key: 'actions',
        header: 'Actions',
        width: 150,
        enableReordering: false,
        enableResizing: false,
        cell: (row) => (
            <div className="flex gap-1.5">
                <ReactifyButton variant="ghost" size="sm" className="p-1 h-auto" onClick={(e) => {e.stopPropagation(); alert(`Edit user ${row.id}`)}} title="Edit (not implemented)">
                    <Edit3 size={16} />
                </ReactifyButton>
                <ReactifyButton variant="ghost" size="sm" className="p-1 h-auto text-destructive hover:text-destructive/80" onClick={(e) => {e.stopPropagation(); alert(`Delete user ${row.id}`)}} title="Delete (not implemented)">
                    <Trash2 size={16} />
                </ReactifyButton>
            </div>
        )
    }
  ], []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };
  
  const handleRefresh = () => {
    // Re-trigger useEffect
    setCurrentPage(prev => prev); 
    setData([]); // Clear current data to show loading state properly
    // This is a bit of a hack for demo; ideally, you'd re-fetch or re-trigger the effect.
    // A more robust way would be to have a dedicated fetch function called here and in useEffect.
    const current = currentPage;
    setCurrentPage(0); // force re-render for useEffect
    setTimeout(() => setCurrentPage(current), 0);
  };

  return (
    <ReactifyCard className="w-full">
      <ReactifyCardHeader>
        <div className="flex justify-between items-center">
            <ReactifyCardTitle>Advanced User Table</ReactifyCardTitle>
            <ReactifyButton variant="outline" size="sm" onClick={handleRefresh} leftIcon={<RefreshCw size={14}/>} isLoading={isLoading}>
                Refresh
            </ReactifyButton>
        </div>
        <ReactifyCardDescription>
          Showing a feature-rich table with server-side pagination simulation. 
          Placeholders for column resizing, reordering, grouping, and custom filters are included.
          Cells can have custom renderers and actions.
        </ReactifyCardDescription>
      </ReactifyCardHeader>
      <ReactifyCardContent>
        <ReactifyAdvancedTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          caption={`Displaying ${data.length} of ${totalItems} users.`}
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          availablePageSizes={[5, 10, 20, 30]}
          onRowClick={(row) => alert(`Clicked on user: ${row.name}`)}
        />
      </ReactifyCardContent>
    </ReactifyCard>
  );
}
