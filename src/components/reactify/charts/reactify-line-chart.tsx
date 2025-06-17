
'use client';

import type { ReactNode } from 'react';
import {
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
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

export interface LineChartDataKey {
  key: string;
  label?: string;
  color?: string; // e.g., 'hsl(var(--chart-1))'
  strokeDasharray?: string; // e.g., "5 5" for dashed line
  type?: 'monotone' | 'linear' | 'step' | 'natural'; // Recharts line types
}

interface ReactifyLineChartProps extends ReactifyComponentProps {
  data: any[];
  config: ChartConfig;
  categoryKey: string; // Key for x-axis categories
  dataKeys: LineChartDataKey[];
  chartClassName?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  compact?: boolean;
}

export function ReactifyLineChart({
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
  compact = false,
  as: Component = 'div', // Wrapper div for the chart
  ...props
}: ReactifyLineChartProps) {
  return (
    <Component className={cn('w-full h-[300px] md:h-[400px]', className)} {...props}>
      <ChartContainer config={config} className={cn("w-full h-full", chartClassName)}>
        <RechartsLineChart
          accessibilityLayer
          data={data}
          margin={compact ? { top: 5, right: 5, left: -25, bottom: -10 } : { top: 5, right: 20, left: 0, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey={categoryKey}
            tickLine={false}
            axisLine={false}
            tickMargin={compact ? 2 : 8}
            fontSize={compact ? 10 : 12}
            label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5, fontSize: compact ? 10 : 12 } : undefined}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={compact ? 2 : 5}
            fontSize={compact ? 10 : 12}
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 10, fontSize: compact ? 10 : 12 } : undefined}
          />
          {showTooltip && <ChartTooltip content={<ChartTooltipContent hideLabel={compact}/>} cursor={!compact} />}
          {showLegend && <ChartLegend content={<ChartLegendContent />} wrapperStyle={compact ? { fontSize: '0.75rem', paddingTop: '10px' } : {}} />}
          {dataKeys.map((dk) => (
            <Line
              key={dk.key}
              dataKey={dk.key}
              name={dk.label || dk.key}
              type={dk.type || "monotone"}
              stroke={dk.color || `var(--color-${dk.key})`}
              strokeWidth={2}
              dot={compact ? false : { r: 4, fill: dk.color || `var(--color-${dk.key})`, strokeWidth: 2, fillOpacity: 1 }}
              activeDot={compact ? undefined : { r: 6, fill: dk.color || `var(--color-${dk.key})`, strokeWidth: 2 }}
              strokeDasharray={dk.strokeDasharray}
            />
          ))}
        </RechartsLineChart>
      </ChartContainer>
    </Component>
  );
}
