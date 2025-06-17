
'use client';
import { ReactifyLineChart, type LineChartDataKey } from '@/components/reactify/charts/reactify-line-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { date: "2024-01-01", pageViews: 2000, uniqueVisitors: 800 },
  { date: "2024-01-02", pageViews: 2200, uniqueVisitors: 850 },
  { date: "2024-01-03", pageViews: 1800, uniqueVisitors: 700 },
  { date: "2024-01-04", pageViews: 2500, uniqueVisitors: 950 },
  { date: "2024-01-05", pageViews: 2300, uniqueVisitors: 900 },
  { date: "2024-01-06", pageViews: 2700, uniqueVisitors: 1050 },
  { date: "2024-01-07", pageViews: 3000, uniqueVisitors: 1100 },
];

const chartConfig = {
  pageViews: {
    label: "Page Views",
    color: "hsl(var(--chart-1))",
  },
  uniqueVisitors: {
    label: "Unique Visitors",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const dataKeys: LineChartDataKey[] = [
  { key: 'pageViews', label: 'Page Views', color: 'hsl(var(--chart-1))' },
  { key: 'uniqueVisitors', label: 'Unique Visitors', color: 'hsl(var(--chart-2))', strokeDasharray: "4 4" },
];

export default function ReactifyLineChartDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Traffic Overview</CardTitle>
          <CardDescription>Daily page views and unique visitors.</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyLineChart
            data={chartData}
            config={chartConfig}
            categoryKey="date"
            dataKeys={dataKeys}
            yAxisLabel="Count"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stock Price (Compact)</CardTitle>
          <CardDescription>Daily closing price (compact mode).</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyLineChart
            data={[
              { day: "Mon", price: 150 },
              { day: "Tue", price: 152 },
              { day: "Wed", price: 148 },
              { day: "Thu", price: 155 },
              { day: "Fri", price: 153 },
            ]}
            config={{ price: { label: "Price", color: "hsl(var(--chart-3))" } }}
            categoryKey="day"
            dataKeys={[{ key: 'price' }]}
            className="h-[200px]"
            compact
            showLegend={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
