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
  wattage: number;
  createdAt: string;
}

interface PowerConsumptionChartProps {
  data: Data[];
}

export const PowerConsumptionChart = ({ data }: PowerConsumptionChartProps) => {
  const config = {
    power: {
      label: "Power Consumption",
      color: "var(--chart-3)",
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
        <CardTitle>Power Consumption</CardTitle>
        <CardDescription>Average power consumption per hour</CardDescription>
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
              domain={[0, 500]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="wattage"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
