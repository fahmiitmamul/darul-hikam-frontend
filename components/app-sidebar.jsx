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
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: House,
    },
    {
      title: "Kelembagaan",
      url: "/",
      icon: Landmark,
      items: [
        {
          title: "Profil",
          url: "/",
        },
        {
          title: "Mudir / Pimpinan",
          url: "/",
        },
      ],
    },
    {
      title: "Santri",
      url: "/",
      icon: User2,
      items: [
        {
          title: "Daftar Santri",
          url: "/",
          icon: User2,
        },
        {
          title: "Akademik",
          url: "/",
        },
      ],
    },
    {
      title: "Ustadz",
      url: "/",
      icon: UserCheck,
      items: [
        {
          title: "Daftar Ustadz",
          url: "/",
        },
      ],
    },
    {
      title: "Buku Pelajaran",
      url: "/",
      icon: BookOpen,
      items: [
        {
          title: "Buku Pelajaran",
          url: "/",
        },
      ],
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
