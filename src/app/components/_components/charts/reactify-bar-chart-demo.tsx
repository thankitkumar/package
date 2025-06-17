
'use client';
import { ReactifyBarChart, type BarChartDataKey } from '@/components/reactify/charts/reactify-bar-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const dataKeys: BarChartDataKey[] = [
  { key: 'desktop', label: 'Desktop Users', color: 'hsl(var(--chart-1))', radius: [4,4,0,0] },
  { key: 'mobile', label: 'Mobile Users', color: 'hsl(var(--chart-2))', radius: [4,4,0,0] },
];

const stackedData = [
  { date: '2024-01', new: 50, returning: 30, inactive: 10 },
  { date: '2024-02', new: 65, returning: 40, inactive: 12 },
  { date: '2024-03', new: 70, returning: 55, inactive: 8 },
];
const stackedConfig = {
  new: { label: 'New', color: 'hsl(var(--chart-1))' },
  returning: { label: 'Returning', color: 'hsl(var(--chart-2))' },
  inactive: { label: 'Inactive', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;
const stackedDataKeys: BarChartDataKey[] = [
  { key: 'new', stackId: 'a', radius: [0,0,0,0] },
  { key: 'returning', stackId: 'a', radius: [0,0,0,0] },
  { key: 'inactive', stackId: 'a', radius: [4,4,0,0] }, // Topmost stack has radius
];


export default function ReactifyBarChartDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Bar Chart</CardTitle>
          <CardDescription>Monthly active users by device type.</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyBarChart
            data={chartData}
            config={chartConfig}
            categoryKey="month"
            dataKeys={dataKeys}
            yAxisLabel="Active Users"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stacked Bar Chart</CardTitle>
          <CardDescription>User segments over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyBarChart
            data={stackedData}
            config={stackedConfig}
            categoryKey="date"
            dataKeys={stackedDataKeys}
            yAxisLabel="User Count"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horizontal Bar Chart</CardTitle>
          <CardDescription>Feature usage comparison.</CardDescription>
        </CardHeader>
        <CardContent>
           <ReactifyBarChart
            data={[
              { feature: "Feature A", usage: 75 },
              { feature: "Feature B", usage: 90 },
              { feature: "Feature C", usage: 45 },
            ]}
            config={{ usage: { label: "Usage", color: "hsl(var(--chart-3))" } }}
            categoryKey="feature"
            dataKeys={[{ key: 'usage', radius: [0,4,4,0] }]}
            layout="horizontal"
            xAxisLabel="Usage Score"
            className="h-[250px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compact Bar Chart</CardTitle>
          <CardDescription>Quick overview of sales figures (compact mode).</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyBarChart
            data={chartData.slice(0,3)}
            config={chartConfig}
            categoryKey="month"
            dataKeys={dataKeys.map(dk => ({...dk, radius: [2,2,0,0]}))}
            className="h-[200px]"
            compact
            showLegend={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
