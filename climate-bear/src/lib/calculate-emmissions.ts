interface CPUType {
  power: number;
}

interface CPUEmissions {
  energyKwh: number;
  co2Kg: number;
}

function calculateEmissions(
  data: CPUType,
  timeIntervalSeconds: number,
  emissionFactor = 0.37,
) {
  const intervalHours = timeIntervalSeconds / 3600;

  const energy = (data.power * intervalHours) / 1000;
  const co2 = energy * emissionFactor;

  const cpuTotal: CPUEmissions = { energyKwh: 0, co2Kg: 0 };

  cpuTotal.energyKwh += energy;
  cpuTotal.co2Kg += co2;

  return { energyKwh: cpuTotal.energyKwh, co2Kg: cpuTotal.co2Kg };
}

export { type CPUType, type CPUEmissions, calculateEmissions };
