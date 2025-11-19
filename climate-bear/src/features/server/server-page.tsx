import { Dashboard } from "~/features/server/components/dashboard";
import { api } from "~/trpc/server";

export const ServerPage = async ({ params }: PageProps<"/[slug]/[server]">) => {
  const { slug, server } = await params;

  const servers = await api.server.getServerData({ slug, server });

  return (
    <main className="flex flex-col gap-4">
      <Dashboard initialData={servers} />
    </main>
  );
};
