
'use client';

import React, { type ReactNode, useId } from 'react';
import {
  ScatterChart as RechartsScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  Scatter,
  Label,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { ReactifyComponentProps } from '../common-props';
import { cn } from '../utils';

interface BubblePoint {
  [key: string]: any; 
}

interface ReactifyBubbleChartProps extends ReactifyComponentProps {
  data: { [seriesName: string]: BubblePoint[] };
  config: ChartConfig;
  xKey: string;
  yKey: string;
  zKey: string;
  nameKey: string; 
  xAxisLabel?: string;
  yAxisLabel?: string;
  sizeRange?: [number, number];
  chartClassName?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  compact?: boolean;
}

export function ReactifyBubbleChart({
  data,
  config,
  xKey,
  yKey,
  zKey,
  nameKey,
  xAxisLabel,
  yAxisLabel,
  sizeRange = [64, 750], 
  className,
  chartClassName,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  compact = false,
  as: Component = 'div',
  ...props
}: ReactifyBubbleChartProps) {
  const chartId = useId();
  const filterId = `bubble-shadow-${chartId.replace(/:/g, '')}`;

  return (
    <Component className={cn('w-full h-[350px] md:h-[450px]', className)} {...props}>
      <ChartContainer config={config} className={cn("w-full h-full", chartClassName)}>
        <svg style={{ width: 0, height: 0, position: 'absolute' }}>
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgb(0 0 0 / 0.2)" />
            </filter>
          </defs>
        </svg>
        <RechartsScatterChart
          margin={compact ? { top: 5, right: 10, left: -20, bottom: xAxisLabel ? 5 : -10 } : { top: 20, right: 20, left: 0, bottom: xAxisLabel ? 20 : 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.5} />}
          
          <XAxis
            type="number"
            dataKey={xKey}
            tickLine={false}
            axisLine={!compact}
            tickMargin={compact ? 2 : 8}
            fontSize={compact ? 10 : 12}
            name={xAxisLabel || xKey}
            label={xAxisLabel && !compact ? { value: xAxisLabel, position: 'insideBottom', offset: -15, fontSize: compact ? 10: 12 } : undefined}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            type="number"
            dataKey={yKey}
            tickLine={false}
            axisLine={!compact}
            tickMargin={compact ? 2 : 5}
            fontSize={compact ? 10 : 12}
            name={yAxisLabel || yKey}
            label={yAxisLabel && !compact ? { value: yAxisLabel, angle: -90, position: 'insideLeft', offset: compact ? 10 : 15, fontSize: compact ? 10 : 12 } : undefined}
            domain={['dataMin', 'dataMax']}
          />
          <ZAxis 
            type="number" 
            dataKey={zKey} 
            range={sizeRange} 
            name={config[zKey]?.label || zKey} 
          />

          {showTooltip && (
            <RechartsTooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              content={<ChartTooltipContent 
                hideLabel={compact} 
                nameKey={nameKey} 
                formatter={(value, name, entry) => {
                  if (name === xKey || name === yKey || name === zKey) {
                    let displayName = name;
                    if (name === xKey) displayName = xAxisLabel || xKey;
                    if (name === yKey) displayName = yAxisLabel || yKey;
                    if (name === zKey) displayName = config[zKey]?.label || zKey;
                    return [value, displayName];
                  }
                  if (entry.payload && entry.payload[nameKey]) {
                     return [entry.payload[nameKey], config[entry.name]?.label || entry.name];
                  }
                  return [value, name];
                }}
              />} 
            />
          )}
          
          {showLegend && <RechartsLegend content={<ChartLegendContent />} wrapperStyle={compact ? { fontSize: '0.7rem', paddingTop: '10px' } : {paddingTop: '10px'}} />}
          
          {Object.keys(data).map((seriesId) => (
            <Scatter
              key={seriesId}
              data={data[seriesId]}
              name={config[seriesId]?.label || seriesId}
              fill={`var(--color-${seriesId})`} 
              shape="circle" 
              filter={`url(#${filterId})`}
            />
          ))}
        </RechartsScatterChart>
      </ChartContainer>
    </Component>
  );
}

