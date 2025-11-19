"use client";

import { ClimateBear } from "~/components/climate-bear";
import { Sidebar, SidebarHeader } from "~/components/ui/sidebar";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center">
          <ClimateBear width={56} height={56} />
          <div className="text-foreground text-xl font-bold">
            climate <span className="text-primary">bear</span>
          </div>
        </div>
      </SidebarHeader>
    </Sidebar>
  );
};

export { AppSidebar as Sidebar };
