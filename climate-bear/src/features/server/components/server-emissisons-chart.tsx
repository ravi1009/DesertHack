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
  emissions: {
    energyKwh: number;
    co2Kg: number;
  };
  createdAt: string;
}

interface ServerEmissionsChartProps {
  data: Data[];
}

export const ServerEnergyChart = ({ data }: ServerEmissionsChartProps) => {
  const config = {
    energyKwh: {
      label: "Energy (kWh)",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  // Flatten the data structure for the chart
  const chartData = data
    .map((item) => ({
      createdAt: new Date(item.createdAt).getTime(),
      energyKwh: item.emissions.energyKwh,
    }))
    .sort((a, b) => a.createdAt - b.createdAt);

  // Set up time domain for the last hour
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  // Generate ticks every 5 minutes
  const ticks = [];
  for (let i = 0; i <= 60; i += 10) {
    ticks.push(oneHourAgo + i * 60 * 1000);
  }

  const formatXAxis = (value: number) => {
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
        <CardTitle>Energy Consumption</CardTitle>
        <CardDescription>Server energy usage per hour</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[344px] w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              type="number"
              domain={[oneHourAgo, now]}
              ticks={ticks}
              tickLine
              axisLine
              tickMargin={8}
              tickFormatter={formatXAxis}
            />
            <YAxis tickLine axisLine tickMargin={8} domain={[0, 0.15]} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => formatXAxis(value as number)}
                  className="[&_.flex.justify-between]:gap-4"
                />
              }
            />
            <Line
              dataKey="energyKwh"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const ServerCO2Chart = ({ data }: ServerEmissionsChartProps) => {
  const config = {
    co2Kg: {
      label: "CO2 (kg)",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  // Flatten the data structure for the chart
  const chartData = data
    .map((item) => ({
      createdAt: new Date(item.createdAt).getTime(),
      co2Kg: item.emissions.co2Kg,
    }))
    .sort((a, b) => a.createdAt - b.createdAt);

  // Set up time domain for the last hour
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  // Generate ticks every 5 minutes
  const ticks = [];
  for (let i = 0; i <= 60; i += 10) {
    ticks.push(oneHourAgo + i * 60 * 1000);
  }

  const formatXAxis = (value: number) => {
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
        <CardTitle>CO2 Emissions</CardTitle>
        <CardDescription>Server carbon emissions per hour</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[344px] w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              type="number"
              domain={[oneHourAgo, now]}
              ticks={ticks}
              tickLine
              axisLine
              tickMargin={8}
              tickFormatter={formatXAxis}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => formatXAxis(value as number)}
                  className="[&_.flex.justify-between]:gap-4"
                />
              }
            />
            <Line
              dataKey="co2Kg"
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
