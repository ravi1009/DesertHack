import { TRPCError } from "@trpc/server";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { servers } from "~/server/db/schema";

export const webhook = createTRPCRouter({
  server: publicProcedure
    .input(
      z.object({
        organization_id: z.number(),
        server_name: z.string(),
        cpu_architecture: z.string(),
        cpu_utilization: z.number(),
        memory_utilization: z.number(),
        power_consumption: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id } = input;

      await ctx.db.transaction(async (tx) => {
        const org = await tx.query.organizations.findFirst({
          columns: { organizationName: true },
          where: (org, { eq }) => eq(org.id, organization_id),
        });

        if (!org)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Organization not found",
          });

        const [server] = await tx
          .insert(servers)
          .values({
            organizationId: organization_id,
            serverName: input.server_name,
            cpuArchitecture: input.cpu_architecture,
            cpuUtilization: input.cpu_utilization,
            memoryUtilization: input.memory_utilization,
            powerConsumption: input.power_consumption,
            createdAt: new Date(),
          })
          .returning({ id: servers.id });

        if (!server)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to insert server record",
          });

        return server;
      });
    }),
});
