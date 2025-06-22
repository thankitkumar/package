
'use client';

import type { ReactNode } from 'react';
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { ReactifyComponentProps } from '../common-props';
import { cn } from '../utils';

export interface BarChartDataKey {
  key: string;
  label?: string;
  color?: string; // e.g., 'hsl(var(--chart-1))'
  stackId?: string;
  radius?: number | [number, number, number, number]; // For rounded corners [tl, tr, br, bl]
}

interface ReactifyBarChartProps extends ReactifyComponentProps {
  data: any[];
  config: ChartConfig;
  categoryKey: string; // Key for x-axis categories
  dataKeys: BarChartDataKey[];
  chartClassName?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  layout?: 'horizontal' | 'vertical';
  compact?: boolean; // For a more compact view if needed
}

export function ReactifyBarChart({
  data,
  config,
  categoryKey,
  dataKeys,
  className,
  chartClassName,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisLabel,
  yAxisLabel,
  layout = 'vertical',
  compact = false,
  as: Component = 'div', // Wrapper div for the chart
  ...props
}: ReactifyBarChartProps) {
  return (
    <Component className={cn('w-full h-[300px] md:h-[350px]', className)} {...props}>
      <ChartContainer config={config} className={cn("w-full h-full", chartClassName)}>
        <RechartsBarChart
          accessibilityLayer
          data={data}
          layout={layout}
          margin={compact ? { top: 5, right: 5, left: -25, bottom: -10 } : { top: 5, right: 20, left: compact ? -10 : 0, bottom: xAxisLabel ? 15 : 5 }}
        >
          {showGrid && <CartesianGrid vertical={layout === 'vertical'} horizontal={layout === 'horizontal'} strokeDasharray="3 3" opacity={0.5} />}
          
          {layout === 'vertical' ? (
            <>
              <XAxis
                dataKey={categoryKey}
                tickLine={false}
                axisLine={false}
                tickMargin={compact ? 2 : 8}
                fontSize={compact ? 10 : 12}
                label={xAxisLabel && !compact ? { value: xAxisLabel, position: 'insideBottom', offset: -15, fontSize: compact ? 10 : 12 } : undefined}
                interval={compact && data.length > 10 ? 'preserveStartEnd' : 0}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={compact ? 2 : 5}
                fontSize={compact ? 10 : 12}
                label={yAxisLabel && !compact ? { value: yAxisLabel, angle: -90, position: 'insideLeft', offset: compact ? 5 : 10, fontSize: compact ? 10 : 12 } : undefined}
              />
            </>
          ) : (
             <>
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickMargin={compact ? 2 : 8}
                fontSize={compact ? 10 : 12}
                label={xAxisLabel && !compact ? { value: xAxisLabel, position: 'insideBottom', offset: -15, fontSize: compact ? 10 : 12 } : undefined}
              />
              <YAxis
                dataKey={categoryKey}
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={compact ? 2 : 5}
                fontSize={compact ? 10 : 12}
                width={compact ? 60 : 80}
                interval={compact && data.length > 7 ? 'preserveStartEnd' : 0}
                label={yAxisLabel && !compact ? { value: yAxisLabel, angle: -90, position: 'insideLeft', offset: compact ? 5 : 10, fontSize: compact ? 10 : 12 } : undefined}
              />
            </>
          )}

          {showTooltip && <ChartTooltip content={<ChartTooltipContent hideLabel={compact} />} cursor={!compact} />}
          
          {showLegend && <ChartLegend content={<ChartLegendContent />} wrapperStyle={compact ? { fontSize: '0.7rem', paddingTop: '10px', paddingBottom: '0px' } : {paddingTop: '10px'}} />}
          
          {dataKeys.map((dk) => (
            <Bar
              key={dk.key}
              dataKey={dk.key}
              name={dk.label || config[dk.key]?.label || dk.key}
              fill={dk.color || `var(--color-${dk.key})`}
              stackId={dk.stackId}
              radius={dk.radius}
              barSize={compact ? (layout === 'horizontal' ? 10 : 12) : undefined}
            />
          ))}
        </RechartsBarChart>
      </ChartContainer>
    </Component>
  );
}
