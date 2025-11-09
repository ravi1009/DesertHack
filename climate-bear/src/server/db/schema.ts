import { pgTable, serial, text, integer, real } from "drizzle-orm/pg-core";

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
  serverName: text("server_name").notNull().unique(),
  cpuArchitecture: text("cpu_architecture").notNull(),
  averagePowerConsumption: real("average_power_consumption").notNull(),
  serviceCount: integer("service_count").notNull(),
  cpuUtilization: integer("cpu_utilization").notNull(),
  memoryUtilization: integer("memory_utilization").notNull(),
  diskUtilization: integer("disk_utilization").notNull(),
});
