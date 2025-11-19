"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { Sidebar } from "~/features/app/components/sidebar";

export const AppLayout = ({ children }: LayoutProps<"/[slug]">) => {
  const { slug, server } = useParams<{ slug: string; server?: string }>();

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <div className="px-4 pt-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbLink asChild>
                <Link href="/">{slug}</Link>
              </BreadcrumbLink>
              {server && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbLink asChild>
                    <Link href={`/${server}`}>{server}</Link>
                  </BreadcrumbLink>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
