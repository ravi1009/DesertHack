import "server-only";
import { db } from "~/server/db";

export async function getSlug(slug: string) {
  const org = await db.query.organizations.findFirst({
    where: (org, { eq }) => eq(org.slug, slug),
    with: {
      servers: {
        where: (server, { and, gte, lte }) =>
          and(
            lte(server.createdAt, new Date()),
            gte(
              server.createdAt,
              new Date(new Date().setHours(new Date().getHours() - 1)),
            ),
          ),
      },
    },
  });

  if (!org) return null;

  const servers = org.servers.reduce(
    (acc, curr) => {
      if (!acc[curr.serverName]) {
        acc[curr.serverName] = {
          id: curr.id,
          serverName: curr.serverName,
          cpuArchitecture: curr.cpuArchitecture,
          powerConsumption: curr.powerConsumption,
          cpuUtilization: curr.cpuUtilization,
          memoryUtilization: curr.memoryUtilization,
          count: 1,
        };
      } else {
        const existing = acc[curr.serverName]!;
        existing.id = curr.id;
        existing.powerConsumption += curr.powerConsumption;
        existing.cpuUtilization += curr.cpuUtilization;
        existing.memoryUtilization += curr.memoryUtilization;
        existing.count += 1;
      }
      return acc;
    },
    {} as Record<
      string,
      {
        id: number;
        serverName: string;
        cpuArchitecture: string;
        powerConsumption: number;
        cpuUtilization: number;
        memoryUtilization: number;
        count: number;
      }
    >,
  );

  // Calculate averages
  const averagedServers = Object.values(servers).map((server) => ({
    id: server.id,
    serverName: server.serverName,
    cpuArchitecture: server.cpuArchitecture,
    powerConsumption: (server.powerConsumption / server.count).toFixed(2),
    cpuUtilization: (server.cpuUtilization / server.count).toFixed(2),
    memoryUtilization: (server.memoryUtilization / server.count).toFixed(2),
  }));

  return { ...org, servers: averagedServers };
}
