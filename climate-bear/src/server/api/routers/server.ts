import { TRPCError } from "@trpc/server";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const server = createTRPCRouter({
  getServerData: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        server: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { slug, server: serverName } = input;

      const org = await ctx.db.query.organizations.findFirst({
        where: (org, { eq }) => eq(org.slug, slug),
      });

      if (!org)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Organization with slug "${slug}" not found`,
        });

      const servers = await ctx.db.query.servers.findMany({
        where: (server, { eq, and, gte, lte }) =>
          and(
            eq(server.organizationId, org.id),
            eq(server.serverName, serverName),
            and(
              lte(server.createdAt, new Date()),
              gte(
                server.createdAt,
                new Date(new Date().setHours(new Date().getHours() - 1)),
              ),
            ),
          ),
      });

      if (!servers.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Server "${serverName}" not found in organization "${slug}"`,
        });
      }

      return servers;
    }),
});
