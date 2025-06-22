
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
