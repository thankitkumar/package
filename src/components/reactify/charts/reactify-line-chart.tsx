
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
  label?: string; // Will be taken from ChartConfig if not provided here
  color?: string; // e.g., 'hsl(var(--chart-1))', will be taken from ChartConfig if not here
  strokeDasharray?: string; // e.g., "5 5" for dashed line
  type?: 'monotone' | 'linear' | 'step' | 'natural'; // Recharts line types
  connectNulls?: boolean;
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
    <Component className={cn('w-full h-[300px] md:h-[350px]', className)} {...props}>
      <ChartContainer config={config} className={cn("w-full h-full", chartClassName)}>
        <RechartsLineChart
          accessibilityLayer
          data={data}
          margin={compact ? { top: 5, right: 5, left: -25, bottom: -10 } : { top: 5, right: 20, left: compact ? -10: 0, bottom: xAxisLabel ? 15 : 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.5} />}
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
          {showTooltip && <ChartTooltip content={<ChartTooltipContent hideLabel={compact}/>} cursor={!compact} />}
          {showLegend && <ChartLegend content={<ChartLegendContent />} wrapperStyle={compact ? { fontSize: '0.7rem', paddingTop: '10px', paddingBottom: '0px' } : {paddingTop: '10px'}} />}
          {dataKeys.map((dk) => (
            <Line
              key={dk.key}
              dataKey={dk.key}
              name={dk.label || config[dk.key]?.label || dk.key}
              type={dk.type || "monotone"}
              stroke={dk.color || `var(--color-${dk.key})`}
              strokeWidth={2}
              dot={compact ? false : { r: 3, fill: dk.color || `var(--color-${dk.key})`, strokeWidth: 1 }}
              activeDot={compact ? false : { r: 5, fill: dk.color || `var(--color-${dk.key})`, strokeWidth: 1 }}
              strokeDasharray={dk.strokeDasharray}
              connectNulls={dk.connectNulls}
            />
          ))}
        </RechartsLineChart>
      </ChartContainer>
    </Component>
  );
}
