
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
  { key: 'desktop', radius: [4,4,0,0] },
  { key: 'mobile', radius: [4,4,0,0] },
];

const stackedData = [
  { date: 'Jan', new: 50, returning: 30, inactive: 10 },
  { date: 'Feb', new: 65, returning: 40, inactive: 12 },
  { date: 'Mar', new: 70, returning: 55, inactive: 8 },
  { date: 'Apr', new: 60, returning: 45, inactive: 15 },
  { date: 'May', new: 75, returning: 60, inactive: 5 },
];
const stackedConfig = {
  new: { label: 'New', color: 'hsl(var(--chart-1))' },
  returning: { label: 'Returning', color: 'hsl(var(--chart-2))' },
  inactive: { label: 'Inactive', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

// Radius array is [topLeft, topRight, bottomRight, bottomLeft]
const stackedDataKeys: BarChartDataKey[] = [
  { key: 'new', stackId: 'a', radius: [0,0,4,4] },      // Bottom-most bar: round bottom-left and bottom-right corners
  { key: 'returning', stackId: 'a', radius: [0,0,0,0] }, // Middle bar: no rounding
  { key: 'inactive', stackId: 'a', radius: [4,4,0,0] }, // Top-most bar: round top-left and top-right corners
];

const horizontalData = [
  { feature: "Feature A", usage: 75, adoption: 90 },
  { feature: "Feature B", usage: 90, adoption: 60 },
  { feature: "Feature C", usage: 45, adoption: 70 },
  { feature: "Feature D", usage: 60, adoption: 50 },
];
const horizontalConfig = {
  usage: { label: "Usage Score", color: "hsl(var(--chart-4))" },
  adoption: { label: "Adoption Rate", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;
const horizontalDataKeys: BarChartDataKey[] = [
  { key: 'usage', radius: [0,4,4,0] },
  { key: 'adoption', radius: [0,4,4,0] },
];


export default function ReactifyBarChartDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Bar Chart</CardTitle>
          <CardDescription>Monthly active users by device type. (Vertical Layout)</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyBarChart
            data={chartData}
            config={chartConfig}
            categoryKey="month"
            dataKeys={dataKeys}
            yAxisLabel="Active Users"
            xAxisLabel="Month"
            className="h-[350px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stacked Bar Chart</CardTitle>
          <CardDescription>User segments over time. (Vertical Layout, Rounded Stack)</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyBarChart
            data={stackedData}
            config={stackedConfig}
            categoryKey="date"
            dataKeys={stackedDataKeys}
            yAxisLabel="User Count"
            xAxisLabel="Month"
            className="h-[350px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horizontal Bar Chart</CardTitle>
          <CardDescription>Feature comparison. (Horizontal Layout)</CardDescription>
        </CardHeader>
        <CardContent>
           <ReactifyBarChart
            data={horizontalData}
            config={horizontalConfig}
            categoryKey="feature"
            dataKeys={horizontalDataKeys}
            layout="horizontal"
            xAxisLabel="Score / Rate"
            yAxisLabel="Feature"
            className="h-[350px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compact Bar Chart</CardTitle>
          <CardDescription>Quick overview of sales figures (compact mode, vertical).</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyBarChart
            data={chartData.slice(0,3)}
            config={chartConfig}
            categoryKey="month"
            dataKeys={dataKeys.map(dk => ({...dk, radius: [2,2,0,0]}))}
            className="h-[250px]"
            compact
            showLegend={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}

