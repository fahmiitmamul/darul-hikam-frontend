"use client";
import * as React from "react";
import { BookOpen, Landmark, User2, House } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { OrgHeader } from "@/components/org-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserCheck } from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "Itmamul Fahmi",
    email: "itmamul2004@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  org: [
    {
      name: "DARUL HIKAM TPQ",
      logo: "/darul-hikam.png",
      plan: "Majelis Ta'lim",
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrgHeader org={data.org} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
