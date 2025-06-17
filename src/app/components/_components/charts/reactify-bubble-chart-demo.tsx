
'use client';
import { ReactifyBubbleChart } from '@/components/reactify/charts/reactify-bubble-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';

const generateBubbleData = (seriesName: string, count: number, xOffset: number, yOffset: number, zFactor: number) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `${seriesName}-${i + 1}`,
    performance: xOffset + Math.random() * 50, // X: Performance Score
    satisfaction: yOffset + Math.random() * 60, // Y: User Satisfaction
    budget: (Math.random() * 500 + 100) * zFactor,    // Z: Project Budget
  }));
};

const bubbleChartData = {
  projectAlpha: generateBubbleData('Alpha', 5, 10, 20, 1),
  projectBeta: generateBubbleData('Beta', 6, 25, 30, 1.2),
  projectGamma: generateBubbleData('Gamma', 4, 5, 10, 0.8),
};

const bubbleChartConfig = {
  projectAlpha: {
    label: "Project Alpha",
    color: "hsl(var(--chart-1))",
  },
  projectBeta: {
    label: "Project Beta",
    color: "hsl(var(--chart-2))",
  },
  projectGamma: {
    label: "Project Gamma",
    color: "hsl(var(--chart-3))",
  },
  // This key 'budget' will be used by ZAxis for its name in tooltips if defined.
  // The ZAxis dataKey prop in ReactifyBubbleChart is 'zKey' which is 'budget' here.
  budget: { 
    label: "Budget ($K)" // Tooltip label for the Z-axis (size)
  }
} satisfies ChartConfig;


const singleSeriesData = {
  allProjects: [
    ...generateBubbleData('Omega', 3, 50, 60, 1.5),
    ...generateBubbleData('Sigma', 4, 60, 50, 1.1),
  ]
};
const singleSeriesConfig = {
  allProjects: {
    label: "All Projects",
    color: "hsl(var(--chart-4))",
  },
  budget: { label: "Est. Budget ($K)"}
} satisfies ChartConfig;


export default function ReactifyBubbleChartDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6"> {/* Changed to 1 column for better display of larger charts */}
      <Card>
        <CardHeader>
          <CardTitle>Project Portfolio Overview</CardTitle>
          <CardDescription>Performance vs. Satisfaction, sized by Budget. (Multi-Series)</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyBubbleChart
            data={bubbleChartData}
            config={bubbleChartConfig}
            xKey="performance"
            yKey="satisfaction"
            zKey="budget"
            nameKey="name"
            xAxisLabel="Performance Score"
            yAxisLabel="User Satisfaction"
            sizeRange={[100, 2000]} // Area range for bubbles
            className="h-[450px]" // Increased height
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Combined Project Data (Compact)</CardTitle>
          <CardDescription>A single series view of projects. (Compact Mode)</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactifyBubbleChart
            data={singleSeriesData}
            config={singleSeriesConfig}
            xKey="performance"
            yKey="satisfaction"
            zKey="budget"
            nameKey="name"
            xAxisLabel="Perf. Score"
            yAxisLabel="User Sat."
            className="h-[350px]"
            compact
            showLegend={false} // Often hidden in compact or single-series views
          />
        </CardContent>
      </Card>
    </div>
  );
}
