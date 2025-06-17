
'use client';
import { ReactifyLineChart, type LineChartDataKey } from '@/components/reactify/charts/reactify-line-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';

const websiteTrafficData = [
  { date: "2024-01-01", pageViews: 2000, uniqueVisitors: 800 },
  { date: "2024-01-02", pageViews: 2200, uniqueVisitors: 850 },
  { date: "2024-01-03", pageViews: 1800, uniqueVisitors: 700, bounceRate: 45 },
  { date: "2024-01-04", pageViews: 2500, uniqueVisitors: 950, bounceRate: 42 },
  { date: "2024-01-05", pageViews: 2300, uniqueVisitors: 900 },
  { date: "2024-01-06", pageViews: 2700, uniqueVisitors: 1050, bounceRate: 38 },
  { date: "2024-01-07", pageViews: 3000, uniqueVisitors: 1100, bounceRate: 35 },
];

const websiteTrafficConfig = {
  pageViews: {
    label: "Page Views",
    color: "hsl(var(--chart-1))",
  },
  uniqueVisitors: {
    label: "Unique Visitors",
    color: "hsl(var(--chart-2))",
  },
  bounceRate: {
    label: "Bounce Rate (%)",
    color: "hsl(var(--chart-3))",
  }
} satisfies ChartConfig;

const websiteTrafficDataKeys: LineChartDataKey[] = [
  { key: 'pageViews', type: 'monotone' },
  { key: 'uniqueVisitors', type: 'monotone', strokeDasharray: "3 3" },
  { key: 'bounceRate', type: 'linear', connectNulls: true } // Example with connectNulls
];

const stockPriceData = [
  { day: "Mon", price: 150.50 },
  { day: "Tue", price: 152.00 },
  { day: "Wed", price: 148.75 },
  { day: "Thu", price: 155.20 },
  { day: "Fri", price: 153.90 },
  { day: "Sat", price: 154.10 },
  { day: "Sun", price: 154.00 },
];
const stockPriceConfig = {
  price: { label: "Stock Price ($)", color: "hsl(var(--chart-4))" }
} satisfies ChartConfig;
const stockPriceDataKeys: LineChartDataKey[] = [
  { key: 'price', type: 'natural' },
];


export default function ReactifyLineChartDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Traffic Overview</CardTitle>
          <CardDescription>Daily page views, unique visitors, and bounce rate.</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyLineChart
            data={websiteTrafficData}
            config={websiteTrafficConfig}
            categoryKey="date"
            dataKeys={websiteTrafficDataKeys}
            yAxisLabel="Count / Percentage"
            xAxisLabel="Date"
            className="h-[350px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stock Price Trend (Compact)</CardTitle>
          <CardDescription>Daily closing price (compact mode, no legend).</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyLineChart
            data={stockPriceData}
            config={stockPriceConfig}
            categoryKey="day"
            dataKeys={stockPriceDataKeys}
            className="h-[250px]"
            compact
            showLegend={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
