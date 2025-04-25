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

export function NavMain() {
  return (
    <SidebarGroup>
      {/* Dashboard - Top Level */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Kelembagaan Section */}
      <SidebarMenu>
        <Collapsible className="w-full">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <Landmark className="h-4 w-4" />
                <span>Kelembagaan</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <a href="/kelembagaan/profil">
                      <span>Profil</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <a href="/kelembagaan/mudir">
                      <span>Mudir / Pimpinan</span>
                    </a>
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
              <SidebarMenuButton>
                <GraduationCap className="h-4 w-4" />
                <span>Santri</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <a href="/santri/daftar">
                      <span>Daftar Santri</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                {/* Nested Akademik submenu */}
                <SidebarMenuSubItem>
                  <Collapsible className="w-full">
                    <CollapsibleTrigger className="w-full">
                      <SidebarMenuSubButton className="w-full flex items-center justify-between">
                        <span>Akademik</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                      </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-4 border-l border-sidebar-border pl-2 py-1 space-y-1">
                        <a
                          href="/santri/akademik/kenaikan-kelas"
                          className="flex h-7 items-center rounded-md px-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                          <span>Kenaikan Kelas</span>
                        </a>
                        <a
                          href="/santri/akademik/kelulusan"
                          className="flex h-7 items-center rounded-md px-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                          <span>Kelulusan</span>
                        </a>
                        <a
                          href="/santri/akademik/alumni"
                          className="flex h-7 items-center rounded-md px-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                          <span>Daftar Alumni</span>
                        </a>
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
              <SidebarMenuButton>
                <Users className="h-4 w-4" />
                <span>Ustadz</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <a href="/ustadz/daftar">
                      <span>Daftar Ustadz</span>
                    </a>
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
              <SidebarMenuButton>
                <BookOpen className="h-4 w-4" />
                <span>Buku Pelajaran</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <a href="/buku-pelajaran/daftar">
                      <span>Buku Pelajaran</span>
                    </a>
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
