import "client-only";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";

interface Data {
  utilization: number;
  createdAt: string;
}

interface MemoryChartProps {
  data: Data[];
}

export const MemoryChart = ({ data }: MemoryChartProps) => {
  const config = {
    memory: {
      label: "Memory Utilization",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const formatXAxis = (value: string) => {
    const date = new Date(value);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Memory Utilization</CardTitle>
        <CardDescription>Average memory utilization per hour</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              tickLine
              axisLine
              tickMargin={8}
              minTickGap={30}
              dataKey="createdAt"
              tickFormatter={formatXAxis}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine
              axisLine
              tickMargin={8}
              minTickGap={30}
              domain={[0, 100]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="utilization"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
