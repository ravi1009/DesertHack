import { db } from "../src/server/db";
import { organizations, servers } from "../src/server/db/schema";
import serverData from "../data/_server_data.json";
import { adjectives, nouns } from "data/words";

// --- Slug Generator Function ---
function generateUniqueSlug(existingSlugs: Set<string>): string {
  let slug: string;
  let counter = 0; // To ensure uniqueness if random combinations repeat

  do {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000); // 0-999

    // Format the number to always have two digits (e.g., 3 becomes 03)
    const paddedNumber = String(randomNumber).padStart(2, "0");

    slug = `${adjective}-${noun}-${paddedNumber}.climate-bear`;
    counter++;
    // Add a safeguard to prevent infinite loops in extremely rare cases
    // if all possible slugs are generated (not likely with these lists)
    if (counter > 1000) {
      console.warn("Could not generate a unique slug after many attempts.");
      break;
    }
  } while (existingSlugs.has(slug));

  return slug;
}
// --- End Slug Generator Function ---

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(servers);
    await db.delete(organizations);

    const existingSlugs = new Set<string>(); // Keep track of slugs generated in this run

    // Insert organizations and their servers
    for (const orgData of serverData) {
      console.log(`Inserting organization: ${orgData.organization_name}`);

      const newSlug = generateUniqueSlug(existingSlugs);
      existingSlugs.add(newSlug); // Add the newly generated slug to our set

      const [org] = await db
        .insert(organizations)
        .values({
          organizationName: orgData.organization_name,
          serverCount: orgData.server_count,
          slug: newSlug, // Add the generated slug here
        })
        .returning();

      console.log(`  -> Generated slug: ${newSlug}`);
      console.log(
        `Inserting ${orgData.servers.length} servers for ${orgData.organization_name}...`,
      );

      await db.insert(servers).values(
        orgData.servers.map((server) => ({
          organizationId: org!.id,
          serverName: server.server_name,
          cpuArchitecture: server.cpu_architecture,
          averagePowerConsumption: server.average_power_consumption,
          serviceCount: server.service_count,
          cpuUtilization: server.cpu_utilization,
          memoryUtilization: server.memory_utilization,
          diskUtilization: server.disk_utilization,
        })),
      );
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    process.exit(0);
  }
}

await seed();
