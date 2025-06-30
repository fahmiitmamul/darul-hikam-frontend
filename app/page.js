"use client";
import Sidebar from "@/components/sidebar-wrapper";
import AppHeader from "@/components/app-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { Info } from "lucide-react";
import { Volume2 } from "lucide-react";
import { LayoutTemplate } from "lucide-react";
import { UsersRound } from "lucide-react";
import { useSession } from "next-auth/react";
import http from "@/helpers/http.helper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [globalFilter, setGlobalFilter] = useState("");
  const { data } = useSession();

  const getDataSantri = async (page, limit, search) => {
    const { data } = await http().get(
      `/santri?page=${page}&limit=${limit}&search=${search}`
    );

    return data.results;
  };

  const { data: santriData } = useQuery({
    queryKey: ["santri", pageIndex, pageSize, globalFilter],
    queryFn: () => getDataSantri(pageIndex, pageSize, globalFilter),
    keepPreviousData: true,
  });

  const getDataUstadz = async (page, limit, search) => {
    const { data } = await http().get(
      `/ustadz?page=${page}&limit=${limit}&search=${search}`
    );

    return data.results;
  };

  const { data: ustadzData } = useQuery({
    queryKey: ["ustadz", pageIndex, pageSize, globalFilter],
    queryFn: () => getDataUstadz(pageIndex, pageSize, globalFilter),
    keepPreviousData: true,
  });

  console.log(ustadzData);

  return (
    <Sidebar>
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="w-full">
          <AppHeader />
        </div>

        {/* Content */}
        <div className="p-5">
          <div>
            <Card className="w-full border-l-8">
              <CardHeader>
                <CardTitle>
                  <h1 className="uppercase font-bold tracking-light">
                    Selamat Datang,
                  </h1>
                </CardTitle>
                <CardDescription>
                  <h1 className="uppercase font-bold text-xl tracking-light">
                    {data?.user?.name}
                  </h1>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 pt-10 gap-5">
            <div className="w-full">
              <Card className="w-full border-l-8">
                <CardHeader>
                  <CardTitle>
                    <div className="flex gap-2 items-center">
                      <div>
                        <Info />
                      </div>
                      <h1 className="uppercase font-bold tracking-light text-xl">
                        Info
                      </h1>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <h1 className="text-sm tracking-light">
                      Saat ini masa pendataan sedang dibuka.{" "}
                      <Link href="/" className="text-green-500 font-medium">
                        Baca Selengkapnya
                      </Link>
                    </h1>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="w-full">
              <Card className="w-full border-l-8">
                <CardHeader>
                  <CardTitle>
                    <div className="flex gap-2 items-center">
                      <div>
                        <Volume2 />
                      </div>
                      <h1 className="uppercase font-bold tracking-light text-xl">
                        Pengumuman (0)
                      </h1>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <h1 className="text-sm tracking-light">
                      Fitur baru dibuka.{" "}
                      <Link href="/" className="text-green-500 font-medium">
                        Baca Selengkapnya
                      </Link>
                    </h1>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-10 gap-5">
            <div className="w-full">
              <Card className="w-full border-l-8">
                <CardHeader>
                  <CardTitle>
                    <div className="flex gap-2 items-center">
                      <div>
                        <UsersRound />
                      </div>
                      <h1 className="uppercase font-bold tracking-light text-xl">
                        {santriData?.data?.length}
                      </h1>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <h1 className="text-sm tracking-light">Santri</h1>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="w-full">
              <Card className="w-full border-l-8">
                <CardHeader>
                  <CardTitle>
                    <div className="flex gap-2 items-center">
                      <div>
                        <UsersRound />
                      </div>
                      <h1 className="uppercase font-bold tracking-light text-xl">
                        5
                      </h1>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <h1 className="text-sm tracking-light">Ustadz</h1>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
