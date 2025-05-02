"use client";
import Sidebar from "@/components/sidebar-wrapper";
import AppHeader from "@/components/app-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const defaultData = [
  {
    pilih: "1",
    nama_lengkap: "Itmamul Fahmi",
    ttl: "31-12-2022",
    status: "31-12-2023",
    keterangan: "Ini adalah keterangan",
    aksi: "Aksi",
  },
  {
    pilih: "2",
    nama_lengkap: "Itmamul Fahmi",
    ttl: "31-12-2022",
    status: "31-05-2000",
    keterangan: "Ini adalah keterangan",
    aksi: "Aksi",
  },
];

const defaultColumns = [
  {
    accessorKey: "pilih",
    header: "Pilih",
  },
  {
    accessorKey: "nama_lengkap",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "ttl",
    header: "Tempat / Tanggal Lahir",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
  },
];

export default function Kelulusan() {
  const [data] = React.useState(() => [...defaultData]);
  const [columns] = React.useState(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const schemaIdentitas = z.object({
    nspp: z.string({ message: "Masukkan NSPP" }),
    nama_lembaga: z.string({ message: "Masukkan nama lembaga" }),
    satuan_pendidikan: z.string({
      message: "Masukkan satuan pendidikan",
    }),
    program_pendidikan: z.string({
      message: "Masukkan program pendidikan",
    }),
  });

  return (
    <Sidebar>
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="w-full">
          <AppHeader />
        </div>

        {/* Content */}
        <div className="p-6 w-full h-full">
          <Tabs defaultValue="belum_diproses" className="w-auto">
            <TabsList className="grid w-full mb-20 md:mb-10 xl:mb-0 grid-cols-1 md:grid-cols-2">
              <TabsTrigger className="cursor-pointer" value="belum_diproses">
                Belum Diproses
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="sudah_diproses">
                Sudah Diproses
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="belum_diproses"
              className="flex flex-col space-y-5"
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Select defaultValue="">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Rombel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Pilih Rombel</SelectLabel>
                          <SelectItem value="lpq">LPQ</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input type="number" placeholder="Cari Nama / NISN" />
                  </div>
                </div>
                <div></div>
              </div>

              <div className="w-full">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent
              value="sudah_diproses"
              className="flex flex-col space-y-5"
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Select defaultValue="">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Rombel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Pilih Rombel</SelectLabel>
                          <SelectItem value="lpq">LPQ</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input type="number" placeholder="Cari Nama / NISN" />
                  </div>
                </div>
                <div></div>
              </div>

              <div className="w-full">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Sidebar>
  );
}
