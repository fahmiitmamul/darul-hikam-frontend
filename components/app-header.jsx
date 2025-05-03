"use client";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { useTheme } from "next-themes";
import { Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import { useState, useEffect } from "react";
import { DynamicBreadcrumb } from "./dynamic-breadcrumbs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function AppHeader() {
  const { setTheme, theme } = useTheme();

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb
            homeLabel="Dashboard"
            capitalizeItems={true}
            maxItems={3}
          />
        </div>
        <div className="flex gap-2 mr-5">
          <div>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
              onClick={() => {
                if (theme === "light") {
                  setTheme("dark");
                } else {
                  setTheme("light");
                }
              }}
            >
              {mounted &&
                (theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                ))}
            </Button>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  <span className="hidden md:inline">Itmamul Fahmi</span>
                  <User2 className="md:ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Daftar Akun
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Daftar Akses Lembaga
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Ganti Password
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    toast("Logout Berhasil", {
                      description: "Anda akan diarahkan ke halaman login",
                    });
                    signOut({ callbackUrl: "/login" });
                  }}
                >
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
