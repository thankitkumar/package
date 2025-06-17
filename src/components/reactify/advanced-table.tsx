
'use client';

import type { ReactNode, HTMLAttributes } from 'react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils'; // Using the project-standard alias
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption } from '@/components/ui/table';
import { ReactifyButton } from './button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, Filter, Columns, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';

export interface ColumnDef<TData extends Record<string, any>> {
  key: keyof TData | string;
  header: ReactNode;
  cell?: (row: TData, rowIndex: number) => ReactNode;
  enableResizing?: boolean;
  enableReordering?: boolean;
  minWidth?: number;
  width?: number | string;
}

// Interface for specific functional props of the AdvancedTable
interface AdvancedTableSpecificProps<TData extends Record<string, any>> {
  columns: ColumnDef<TData>[];
  data: TData[];
  caption?: string;
  isLoading?: boolean;
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  availablePageSizes?: number[];
  onColumnOrderChange?: (newOrder: string[]) => void;
  onColumnResize?: (columnKey: string, newWidth: number) => void;
  onFilterChange?: (filters: any) => void;
  onRowClick?: (row: TData) => void;
}

// Combine specific props with standard HTMLDivElement attributes
interface ReactifyAdvancedTableProps<TData extends Record<string, any>>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, // Omit 'children' as it's not directly passed to the root div
    AdvancedTableSpecificProps<TData> {}

export function ReactifyAdvancedTable<TData extends Record<string, any>>(
  allProps: ReactifyAdvancedTableProps<TData>
): JSX.Element {
  const {
    // Specific functional props are destructured first
    columns: initialColumns,
    data,
    caption,
    isLoading = false,
    pageCount = 1,
    currentPage = 1,
    onPageChange,
    pageSize = 10,
    onPageSizeChange,
    availablePageSizes = [10, 20, 50, 100],
    // onColumnOrderChange, // Not fully implemented in demo
    // onColumnResize, // Not fully implemented in demo
    // onFilterChange, // Not fully implemented in demo
    onRowClick,
    // Standard HTML attributes for the root div
    className,
    // Capture all other props that could be HTML attributes for the div
    ...htmlDivAttributes // These are the remaining props for the div
  } = allProps;

  const [columnOrder, setColumnOrder] = useState<string[]>(() => initialColumns.map(col => String(col.key)));

  const orderedColumns = useMemo(() => {
    return initialColumns.map(col => ({
      ...col,
      enableResizing: col.enableResizing !== false,
      enableReordering: col.enableReordering !== false,
    })).sort((a, b) => {
      const aIndex = columnOrder.indexOf(String(a.key));
      const bIndex = columnOrder.indexOf(String(b.key));
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, [initialColumns, columnOrder]);

  const handlePreviousPage = () => {
    if (onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (onPageChange && currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={cn("space-y-4", className)} {...htmlDivAttributes}>
      {/* Toolbar Placeholder */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 border-b">
        <div className="flex items-center gap-2">
          <Input placeholder="Global Search..." className="h-9 max-w-xs" disabled title="Global search not implemented"/>
          <ReactifyButton variant="outline" size="sm" disabled title="Custom filters not implemented">
            <Filter size={16} className="mr-1.5" /> Filters
          </ReactifyButton>
        </div>
        <div className="flex items-center gap-2">
           <ReactifyButton variant="outline" size="sm" disabled title="Column grouping not implemented">
            <Columns size={16} className="mr-1.5" /> Group
          </ReactifyButton>
          <ReactifyButton variant="outline" size="sm" disabled title="Add new row not implemented">
            <PlusCircle size={16} className="mr-1.5" /> Add Row
          </ReactifyButton>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto border rounded-md">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {orderedColumns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className="relative group whitespace-nowrap"
                  style={{ width: col.width, minWidth: col.minWidth }}
                >
                  <div className="flex items-center gap-1.5">
                    {col.enableReordering && (
                      <GripVertical size={14} className="cursor-grab opacity-50 group-hover:opacity-100 transition-opacity" title="Drag to reorder (not implemented)"/>
                    )}
                    {col.header}
                  </div>
                   {col.enableResizing && (
                    <div
                        className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize select-none touch-none opacity-0 group-hover:opacity-100 bg-primary/30"
                        title="Resize column (not implemented)"
                    />
                   )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {orderedColumns.map((col, colIndex) => (
                    <TableCell key={`skeleton-cell-${String(col.key)}-${rowIndex}-${colIndex}`}>
                      <div className="h-5 bg-muted rounded animate-pulse"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow
                  key={(row as any).id || `row-${rowIndex}`}
                  onClick={() => onRowClick?.(row)}
                  className={cn(onRowClick && "cursor-pointer hover:bg-muted/50")}
                >
                  {orderedColumns.map((col) => (
                    <TableCell key={`cell-${String(col.key)}-${(row as any).id || rowIndex}`} className="whitespace-nowrap">
                      {col.cell ? col.cell(row, rowIndex) : String(row[col.key as keyof TData] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={orderedColumns.length} className="h-24 text-center text-muted-foreground">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {pageCount > 1 && onPageChange && (
        <div className="flex items-center justify-between pt-3 flex-wrap gap-4">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {pageCount}
          </div>
           <div className="flex items-center gap-2">
            {onPageSizeChange && (
              <Select
                value={String(pageSize)}
                onValueChange={(value) => onPageSizeChange(Number(value))}
              >
                <SelectTrigger className="h-9 w-[70px]">
                  <SelectValue placeholder={String(pageSize)} />
                </SelectTrigger>
                <SelectContent side="top">
                  {availablePageSizes.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <span className="text-sm text-muted-foreground">rows per page</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <ReactifyButton
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || isLoading}
              leftIcon={<ChevronLeft size={16}/>}
            >
              Previous
            </ReactifyButton>
            <ReactifyButton
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === pageCount || isLoading}
              rightIcon={<ChevronRight size={16}/>}
            >
              Next
            </ReactifyButton>
          </div>
        </div>
      )}
    </div>
  );
}
