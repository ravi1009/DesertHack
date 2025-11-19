/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { useParams } from "next/navigation";
import { api, type RouterOutputs } from "~/trpc/react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CpuChart } from "~/features/server/components/cpu-chart";
import { MemoryChart } from "~/features/server/components/memory-chart";
import { PowerConsumptionChart } from "~/features/server/components/power-consumption-chart";
import {
  ServerCO2Chart,
  ServerEnergyChart,
} from "~/features/server/components/server-emissisons-chart";
import { useMemo } from "react";
import { calculateEmissions } from "~/lib/calculate-emmissions";

type DashboardProps = {
  initialData: RouterOutputs["server"]["getServerData"];
};

export const Dashboard = ({ initialData }: DashboardProps) => {
  const { slug, server } = useParams<{ slug: string; server: string }>();

  const { data } = api.server.getServerData.useQuery(
    { slug, server },
    {
      initialData,
      refetchInterval: 30_000,
    },
  );

  const totalEmissions = useMemo(() => {
    if (!data) return 0;

    return data.reduce((acc, curr) => {
      const emissions = calculateEmissions(
        { power: curr.powerConsumption },
        1800,
      );

      return acc + emissions.co2Kg;
    }, 0);
  }, [data]);

  const averagePowerConsumption = useMemo(() => {
    if (!data) return 0;

    return (
      data.reduce((acc, curr) => {
        return acc + curr.powerConsumption;
      }, 0) / data.length
    ).toFixed(2);
  }, [data]);

  const averageCpuUtilization = useMemo(() => {
    if (!data) return 0;

    return (
      data.reduce((acc, curr) => {
        return acc + curr.cpuUtilization;
      }, 0) / data.length
    ).toFixed(2);
  }, [data]);

  const averageMemoryUtilization = useMemo(() => {
    if (!data) return 0;

    return (
      data.reduce((acc, curr) => {
        return acc + curr.memoryUtilization;
      }, 0) / data.length
    ).toFixed(2);
  }, [data]);

  const cpuData = useMemo(() => {
    if (!data) return [];

    return data.map((server) => ({
      utilization: server.cpuUtilization,
      createdAt: server.createdAt.toISOString(),
    }));
  }, [data]);

  const memoryData = useMemo(() => {
    if (!data) return [];

    return data.map((server) => ({
      utilization: server.memoryUtilization,
      createdAt: server.createdAt.toISOString(),
    }));
  }, [data]);
  const powerConsumptionData = useMemo(() => {
    if (!data) return [];

    return data.map((server) => ({
      wattage: server.powerConsumption,
      createdAt: server.createdAt.toISOString(),
    }));
  }, [data]);

  const emissionsData = useMemo(() => {
    if (!data) return [];

    return data.map((server) => ({
      emissions: calculateEmissions({ power: server.powerConsumption }, 1800),
      createdAt: server.createdAt.toISOString(),
    }));
  }, [data]);

  return (
    <>
      <div className="flex gap-4" data-slot="server-statistics">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-2xl">
              {totalEmissions.toFixed(2)} Kg
            </CardTitle>
            <CardDescription>Total CO2 Emissions per hour</CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-2xl">
              {averagePowerConsumption} W
            </CardTitle>
            <CardDescription>
              Average power consumption per hour
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-2xl">{averageCpuUtilization}%</CardTitle>
            <CardDescription>Average CPU utilization per hour</CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-2xl">
              {averageMemoryUtilization}%
            </CardTitle>
            <CardDescription>
              Average memory utilization per hour
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex gap-4">
        <CpuChart data={cpuData} />
        <MemoryChart data={memoryData} />
        <PowerConsumptionChart data={powerConsumptionData} />
      </div>
      <div className="flex gap-4">
        <ServerEnergyChart data={emissionsData} />
        <ServerCO2Chart data={emissionsData} />
      </div>
    </>
  );
};
