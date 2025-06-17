
'use client';

import type { ReactNode, HTMLAttributes } from 'react';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption } from '@/components/ui/table';
import { ReactifyButton } from './button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, Filter, Columns, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export interface ColumnDef<TData extends Record<string, any>> {
  key: keyof TData | string;
  header: ReactNode;
  cell?: (row: TData, rowIndex: number) => ReactNode;
  enableResizing?: boolean; // Defaults to true if not specified
  enableReordering?: boolean; // Defaults to true if not specified
  minWidth?: number;
  width?: number;
}

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
  enableColumnResizing?: boolean; // Global flag for table-wide resizing
  enableColumnReordering?: boolean; // Global flag for table-wide reordering
  onColumnOrderChange?: (newOrder: string[]) => void;
  onColumnResize?: (columnKey: string, newWidth: number) => void;
  onFilterChange?: (filters: any) => void;
  onRowClick?: (row: TData) => void;
}

interface ReactifyAdvancedTableProps<TData extends Record<string, any>>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    AdvancedTableSpecificProps<TData> {}

export function ReactifyAdvancedTable<TData extends Record<string, any>>(
  allProps: ReactifyAdvancedTableProps<TData>
): JSX.Element {
  const {
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
    enableColumnResizing = true, // Global table prop, defaults to true
    enableColumnReordering = true, // Global table prop, defaults to true
    onColumnOrderChange,
    onColumnResize,
    onRowClick,
    className,
    ...htmlDivAttributes
  } = allProps;

  const [columnOrder, setColumnOrder] = useState<string[]>(() => initialColumns.map(col => String(col.key)));
  
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    initialColumns.forEach(col => {
      widths[String(col.key)] = col.width || col.minWidth || 150;
    });
    return widths;
  });

  const [resizingColumn, setResizingColumn] = useState<{ key: string; startX: number; startWidth: number } | null>(null);
  const [draggedColumnKey, setDraggedColumnKey] = useState<string | null>(null);
  const [dropTargetInfo, setDropTargetInfo] = useState<{ targetKey: string; position: 'before' | 'after' } | null>(null);

  const handleResizeMouseDown = useCallback((key: string, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const currentWidth = columnWidths[key] || initialColumns.find(c => String(c.key) === key)?.width || 150;
    setResizingColumn({ key, startX: event.clientX, startWidth: currentWidth });
  }, [columnWidths, initialColumns]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!resizingColumn) return;
      const diffX = event.clientX - resizingColumn.startX;
      let newWidth = resizingColumn.startWidth + diffX;
      const colDefFromInitial = initialColumns.find(c => String(c.key) === resizingColumn.key);
      const minWidth = colDefFromInitial?.minWidth || 50;
      if (newWidth < minWidth) {
        newWidth = minWidth;
      }
      setColumnWidths(prev => ({ ...prev, [resizingColumn.key]: newWidth }));
    };

    const handleMouseUp = () => {
      if (resizingColumn) {
        onColumnResize?.(resizingColumn.key, columnWidths[resizingColumn.key]);
        setResizingColumn(null);
      }
    };

    if (resizingColumn) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumn, columnWidths, initialColumns, onColumnResize]);

  const handleDragStart = useCallback((event: React.DragEvent<HTMLTableCellElement>, key: string) => {
    event.dataTransfer.setData('text/plain', key);
    event.dataTransfer.effectAllowed = 'move';
    setDraggedColumnKey(key);
    event.currentTarget.setAttribute('data-dragging', 'true');
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLTableCellElement>, targetKey: string) => {
    event.preventDefault();
    if (!draggedColumnKey || draggedColumnKey === targetKey) {
      setDropTargetInfo(null);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    setDropTargetInfo({ targetKey, position: event.clientX < midpoint ? 'before' : 'after' });
    event.dataTransfer.dropEffect = 'move';
  }, [draggedColumnKey]);
  
  const handleDragLeave = useCallback(() => {
     setDropTargetInfo(null);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLTableCellElement>, dropKey: string) => {
    event.preventDefault();
    const sourceKey = event.dataTransfer.getData('text/plain');
    setDropTargetInfo(null);
    setDraggedColumnKey(null);
    
    document.querySelectorAll('th[data-dragging="true"]').forEach(el => el.removeAttribute('data-dragging'));
    const targetTh = event.currentTarget as HTMLTableCellElement;
    targetTh.removeAttribute('data-dragging');

    if (sourceKey && sourceKey !== dropKey) {
      let newOrder = [...columnOrder];
      const sourceIndex = newOrder.indexOf(sourceKey);
      if (sourceIndex > -1) {
        newOrder.splice(sourceIndex, 1);
      }
      
      let dropIndex = newOrder.indexOf(dropKey);
      const rect = targetTh.getBoundingClientRect();
      const midpoint = rect.left + rect.width / 2;

      if (event.clientX >= midpoint) {
        dropIndex++;
      }
      
      newOrder.splice(dropIndex, 0, sourceKey);
      setColumnOrder(newOrder);
      onColumnOrderChange?.(newOrder);
    }
  }, [columnOrder, onColumnOrderChange]);

  const handleDragEnd = useCallback((event: React.DragEvent<HTMLTableCellElement>) => {
    event.currentTarget.removeAttribute('data-dragging');
    setDraggedColumnKey(null);
    setDropTargetInfo(null);
  }, []);

  const currentOrderedColumns = useMemo(() => {
    return initialColumns
      .map(col => {
        const perColumnResizingEnabled = col.enableResizing !== false;
        const perColumnReorderingEnabled = col.enableReordering !== false;
        return {
          ...col,
          isEffectivelyResizable: enableColumnResizing && perColumnResizingEnabled,
          isEffectivelyReorderable: enableColumnReordering && perColumnReorderingEnabled,
          currentWidth: columnWidths[String(col.key)] || col.width || 150,
        };
      })
      .sort((a, b) => {
        const aIndex = columnOrder.indexOf(String(a.key));
        const bIndex = columnOrder.indexOf(String(b.key));
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
  }, [initialColumns, columnOrder, columnWidths, enableColumnResizing, enableColumnReordering]);


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
              {currentOrderedColumns.map((colDef) => (
                <TableHead
                  key={String(colDef.key)}
                  data-key={String(colDef.key)}
                  className={cn(
                    "relative group whitespace-nowrap",
                    colDef.isEffectivelyReorderable && "cursor-grab",
                    draggedColumnKey === String(colDef.key) && "opacity-50"
                  )}
                  style={{ width: colDef.currentWidth, minWidth: colDef.minWidth }}
                  draggable={colDef.isEffectivelyReorderable}
                  onDragStart={(e) => colDef.isEffectivelyReorderable && handleDragStart(e, String(colDef.key))}
                  onDragOver={(e) => colDef.isEffectivelyReorderable && handleDragOver(e, String(colDef.key))}
                  onDrop={(e) => colDef.isEffectivelyReorderable && handleDrop(e, String(colDef.key))}
                  onDragEnd={(e) => colDef.isEffectivelyReorderable && handleDragEnd(e)}
                  onDragLeave={(e) => colDef.isEffectivelyReorderable && handleDragLeave(e)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {colDef.isEffectivelyReorderable && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                               <GripVertical size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" onMouseDown={(e) => e.stopPropagation()} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Drag to reorder column</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {colDef.header}
                    </div>
                  </div>
                   {colDef.isEffectivelyResizable && (
                    <div
                        onMouseDown={(e) => handleResizeMouseDown(String(colDef.key), e)}
                        className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize select-none touch-none opacity-0 group-hover:opacity-100 bg-primary/30 transition-opacity z-10"
                        title="Resize column"
                    />
                   )}
                   {dropTargetInfo && dropTargetInfo.targetKey === String(colDef.key) && draggedColumnKey && draggedColumnKey !== String(colDef.key) && colDef.isEffectivelyReorderable && (
                    <div
                        className={cn(
                        "absolute top-0 bottom-0 w-0.5 bg-primary z-20 pointer-events-none",
                        dropTargetInfo.position === 'before' ? "left-0" : "right-0"
                        )}
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
                  {currentOrderedColumns.map((colDef) => (
                    <TableCell
                      key={`skeleton-cell-${String(colDef.key)}-${rowIndex}`}
                      style={{ width: colDef.currentWidth, minWidth: colDef.minWidth }}
                    >
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
                  {currentOrderedColumns.map((colDef) => (
                    <TableCell
                      key={`cell-${String(colDef.key)}-${(row as any).id || rowIndex}`}
                      className="whitespace-nowrap"
                      style={{ width: colDef.currentWidth, minWidth: colDef.minWidth }}
                    >
                      {colDef.cell ? colDef.cell(row, rowIndex) : String(row[colDef.key as keyof TData] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={currentOrderedColumns.length} className="h-24 text-center text-muted-foreground">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pageCount > 1 && onPageChange && (
        <div className="flex items-center justify-between pt-3 flex-wrap gap-4">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {pageCount}
          </div>
           <div className="flex items-center gap-2">
            {onPageSizeChange && (
              <div className="flex items-center gap-2">
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
              </div>
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

