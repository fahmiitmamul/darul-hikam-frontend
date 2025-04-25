"use client";
import {
  ChevronRight,
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Landmark } from "lucide-react";
import Link from "next/link";

export function NavMain() {
  return (
    <SidebarGroup>
      {/* Dashboard - Top Level */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Dashboard" asChild>
            <Link href="/">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Kelembagaan Section */}
      <SidebarMenu>
        <Collapsible className="w-full">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip="Kelembagaan"
                className="cursor-pointer"
              >
                <Landmark className="h-4 w-4" />
                <span>Kelembagaan</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/profil">
                      <span>Profil</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/mudir-atau-pimpinan">
                      <span>Mudir / Pimpinan</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>

      {/* Santri Section with nested submenu */}
      <SidebarMenu>
        <Collapsible className="w-full">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Santri" className="cursor-pointer">
                <GraduationCap className="h-4 w-4" />
                <span>Santri</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/daftar-santri">
                      <span>Daftar Santri</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                {/* Nested Akademik submenu */}
                <SidebarMenuSubItem>
                  <Collapsible className="w-full">
                    <CollapsibleTrigger className="w-full">
                      <SidebarMenuSubButton className="w-full flex items-center justify-between cursor-pointer">
                        <span>Akademik</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                      </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-4 border-l border-sidebar-border pl-2 py-1 space-y-1">
                        <Link
                          href="/akademik/kenaikan-kelas"
                          className="flex h-7 items-center rounded-md px-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                          <span>Kenaikan Kelas</span>
                        </Link>
                        <Link
                          href="/akademik/kelulusan"
                          className="flex h-7 items-center rounded-md px-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                          <span>Kelulusan</span>
                        </Link>
                        <Link
                          href="/akademik/daftar-alumni"
                          className="flex h-7 items-center rounded-md px-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                          <span>Daftar Alumni</span>
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>

      {/* Ustadz Section */}
      <SidebarMenu>
        <Collapsible className="w-full">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Ustadz" className="cursor-pointer">
                <Users className="h-4 w-4" />
                <span>Ustadz</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/daftar-ustadz">
                      <span>Daftar Ustadz</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>

      {/* Buku Pelajaran Section */}
      <SidebarMenu>
        <Collapsible className="w-full">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip="Buku Pelajaran"
                className="cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Buku Pelajaran</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/buku-pelajaran">
                      <span>Buku Pelajaran</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
