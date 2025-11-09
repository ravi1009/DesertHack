import * as fs from "fs";

interface Organization {
  organization_name: string;
  server_count: number;
  servers: Server[];
}

interface Server {
  server_name: string;
  cpu_architecture: string;
  average_power_consumption: number;
  service_count: number;
  cpu_utilization: number;
  memory_utilization: number;
  disk_utilization: number;
}

const cpuPowerData = fs.readFileSync("cpu-power-consumption.csv", "utf8");

console.log(cpuPowerData);

// Parse CPU power data
const cpuPowerLines = cpuPowerData.split("\n");
const cpuPowerRecords = cpuPowerLines
  .slice(1)
  .filter((line) => line.trim())
  .map((line) => {
    const [cputype, cpupct, npts, sum, sum2, avgpower] = line.split(",");
    return {
      cputype: cputype.trim(),
      avgpower: parseFloat(avgpower),
    };
  });

const sysResourceData = fs.readFileSync("system-resources.csv", "utf8");
// Parse system resources data
const sysResourceLines = sysResourceData.split("\n");
const sysResourceRecords = sysResourceLines
  .slice(1)
  .filter((line) => line.trim())
  .map((line) => {
    const [index, cpu, ram, disk, network] = line.split(",");
    return {
      cpu: parseInt(cpu),
      ram: parseInt(ram),
      disk: parseInt(disk),
    };
  });

// Get unique CPU architectures
const cpuArchitectures = [...new Set(cpuPowerRecords.map((r) => r.cputype))];

// Generate organizations
const organizations: Organization[] = [];
const orgNames = [
  "TechCorp",
  "DataSystems",
  "CloudServices",
  "NetOps",
  "ServerFarm",
  "DigitalWorks",
];

let serverIndex = 0;

for (const orgName of orgNames) {
  const serverCount = Math.floor(Math.random() * 30) + 20; // 20-50 servers
  const servers: Server[] = [];

  for (
    let i = 0;
    i < serverCount && serverIndex < sysResourceRecords.length;
    i++
  ) {
    const sysResource = sysResourceRecords[serverIndex];
    const cpuArch =
      cpuArchitectures[Math.floor(Math.random() * cpuArchitectures.length)];

    // Get base power for this architecture
    const archRecords = cpuPowerRecords.filter((r) => r.cputype === cpuArch);
    const basePower =
      archRecords.length > 0
        ? archRecords[Math.floor(Math.random() * archRecords.length)].avgpower
        : 150;

    // Service count 1-12
    const serviceCount = Math.floor(Math.random() * 12) + 1;

    // Adjust power based on service count and utilization
    const utilizationFactor =
      (sysResource.cpu + sysResource.ram + sysResource.disk) / 300;
    const serviceFactor = 1 + (serviceCount - 1) * 0.15; // 15% increase per service
    const averagePower = parseFloat(
      (basePower * serviceFactor * (0.7 + utilizationFactor * 0.6)).toFixed(2),
    );

    servers.push({
      server_name: `${orgName.toLowerCase()}-srv-${String(i + 1).padStart(
        3,
        "0",
      )}`,
      cpu_architecture: cpuArch,
      average_power_consumption: averagePower,
      service_count: serviceCount,
      cpu_utilization: sysResource.cpu,
      memory_utilization: sysResource.ram,
      disk_utilization: sysResource.disk,
    });

    serverIndex++;
  }

  organizations.push({
    organization_name: orgName,
    server_count: servers.length,
    servers,
  });
}

// Write to JSON file
const output = JSON.stringify(organizations, null, 2);
fs.writeFileSync("server_data.json", output);

console.log(
  `Generated ${organizations.length} organizations with ${serverIndex} total servers`,
);
