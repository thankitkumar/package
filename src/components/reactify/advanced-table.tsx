
'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption } from '@/components/ui/table';
import { ReactifyButton } from './button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, ArrowUpDown, Filter, Columns, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';

export interface ColumnDef<TData> {
  key: keyof TData | string; // Allow string for custom/action columns
  header: ReactNode;
  cell?: (row: TData, rowIndex: number) => ReactNode;
  enableResizing?: boolean;
  enableReordering?: boolean;
  minWidth?: number;
  width?: number | string;
}

interface ReactifyAdvancedTableProps<TData> extends ReactifyComponentProps {
  columns: ColumnDef<TData>[];
  data: TData[];
  caption?: string;
  isLoading?: boolean;

  // Server-side pagination
  pageCount?: number; // Total number of pages
  currentPage?: number; // Current page (1-indexed)
  onPageChange?: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  availablePageSizes?: number[];

  // Placeholder props for future features
  onColumnOrderChange?: (newOrder: string[]) => void;
  onColumnResize?: (columnKey: string, newWidth: number) => void;
  onFilterChange?: (filters: any) => void; // Define filter structure later
  onRowClick?: (row: TData) => void;
}

export function ReactifyAdvancedTable<TData extends object>({
  columns: initialColumns,
  data,
  caption,
  className,
  isLoading = false,
  pageCount = 1,
  currentPage = 1,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,
  availablePageSizes = [10, 20, 50, 100],
  as: Component = 'div',
  ...props
}: ReactifyAdvancedTableProps<TData>) {

  // Basic state for demonstrating column interaction placeholders
  const [columns, setColumns] = useState(initialColumns);


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
    <Component className={cn("space-y-4", className)} {...props}>
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

      <div className="overflow-x-auto border rounded-md">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {columns.map((col, index) => (
                <TableHead 
                  key={String(col.key)} 
                  className="relative group whitespace-nowrap"
                  style={{ width: col.width, minWidth: col.minWidth }}
                >
                  <div className="flex items-center gap-1.5">
                    {col.enableReordering !== false && (
                      <GripVertical size={14} className="cursor-grab opacity-50 group-hover:opacity-100 transition-opacity" title="Drag to reorder (not implemented)"/>
                    )}
                    {col.header}
                    {/* Basic sort indicator placeholder */}
                    {/* <ArrowUpDown size={12} className="ml-1 opacity-30 hover:opacity-100 cursor-pointer" title="Sort (not implemented)"/> */}
                  </div>
                   {col.enableResizing !== false && (
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
                <TableRow key={`skeleton-${rowIndex}`}>
                  {columns.map((col) => (
                    <TableCell key={`skeleton-cell-${String(col.key)}-${rowIndex}`}>
                      <div className="h-5 bg-muted rounded animate-pulse"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={`row-${rowIndex}`} onClick={() => props.onRowClick?.(row)} className={cn(props.onRowClick && "cursor-pointer")}>
                  {columns.map((col) => (
                    <TableCell key={`cell-${String(col.key)}-${rowIndex}`} className="whitespace-nowrap">
                      {col.cell ? col.cell(row, rowIndex) : String(row[col.key as keyof TData] ?? '')}
                      {/* Placeholder for editable cell icon */}
                      {/* {col.editable && <Pencil size={12} className="inline-block ml-2 opacity-20 cursor-pointer" />} */}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Placeholder */}
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
                  <SelectValue placeholder={pageSize} />
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
    </Component>
  );
}
