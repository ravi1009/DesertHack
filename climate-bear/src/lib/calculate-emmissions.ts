interface CPUType {
  cpu_architecture: string;
  average_power: number;
}

interface CPUEmissions {
  energyKwh: number;
  co2Kg: number;
}

function calculateEmissions(
  data: CPUType[],
  timeIntervalSeconds: number,
  emissionFactor: number,
): Record<string, CPUEmissions> {
  const totals: Record<string, CPUEmissions> = {};

  const intervalHours = timeIntervalSeconds / 3600;

  data.forEach((row) => {
    const energy = (row.average_power * intervalHours) / 1000;
    const co2 = energy * emissionFactor;

    const cpuTotal = totals[row.cpu_architecture] ?? { energyKwh: 0, co2Kg: 0 };

    cpuTotal.energyKwh += energy;
    cpuTotal.co2Kg += co2;
    totals[row.cpu_architecture] = cpuTotal;
  });

  return totals;
}

export { type CPUType, type CPUEmissions, calculateEmissions };
