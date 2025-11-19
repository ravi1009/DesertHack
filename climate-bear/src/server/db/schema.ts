import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  decimal,
} from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  organizationName: text("organization_name").notNull().unique(),
  serverCount: integer("server_count").notNull(),
});

export const servers = pgTable("servers", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  serverName: text("server_name").notNull(),
  cpuArchitecture: text("cpu_architecture").notNull(),
  powerConsumption: decimal("power_consumption", {
    mode: "number",
    precision: 100,
    scale: 2,
  }).notNull(),
  cpuUtilization: decimal("cpu_utilization", {
    mode: "number",
    precision: 100,
    scale: 2,
  }).notNull(),
  memoryUtilization: decimal("memory_utilization", {
    mode: "number",
    precision: 100,
    scale: 2,
  }).notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const organizationRelations = relations(organizations, ({ many }) => ({
  servers: many(servers),
}));

export const serverRelations = relations(servers, ({ one }) => ({
  organization: one(organizations, {
    references: [organizations.id],
    fields: [servers.organizationId],
  }),
}));
