import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getSlug } from "~/server/queries/get-slug";

export const SlugPage = async ({ params }: PageProps<"/[slug]">) => {
  const { slug } = await params;

  const org = await getSlug(slug);

  if (!org) notFound();

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="border-border overflow-auto rounded-md border">
        <Table className="whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead>Server Name</TableHead>
              <TableHead>CPU Architecture</TableHead>
              <TableHead>Power Consumption</TableHead>
              <TableHead>CPU Utilization</TableHead>
              <TableHead>Memory Utilization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {org.servers.map((server) => (
              <TableRow key={server.id}>
                <TableCell>
                  <Link
                    href={`/${server.serverName}` as Route}
                    className="hover:text-primary"
                  >
                    {server.serverName}
                  </Link>
                </TableCell>
                <TableCell>{server.cpuArchitecture}</TableCell>
                <TableCell>{server.powerConsumption} W</TableCell>
                <TableCell>{server.cpuUtilization}%</TableCell>
                <TableCell>{server.memoryUtilization}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
