"use client";
import Sidebar from "@/components/sidebar-wrapper";
import AppHeader from "@/components/app-header";
import { z } from "zod";
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
    no: "1",
    nama_lengkap: "Itmamul Fahmi",
    nisn: "31-12-2022",
    nik: "31-12-2023",
    tempat_lahir: "Ini adalah tempat_lahir",
    tanggal_lahir: "31-05-2000",
    tahun_ajaran: "20-05-2021",
    aksi: "Aksi",
  },
  {
    no: "2",
    nama_lengkap: "Itmamul Fahmi",
    nisn: "31-12-2022",
    nik: "31-05-2000",
    tempat_lahir: "Ini adalah tempat_lahir",
    tanggal_lahir: "31-05-2000",
    tahun_ajaran: "20-05-2021",
    aksi: "Aksi",
  },
];

const defaultColumns = [
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "nama_lengkap",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "nisn",
    header: "NISN",
  },
  {
    accessorKey: "nik",
    header: "NIK",
  },
  {
    accessorKey: "tempat_lahir",
    header: "Tempat Lahir",
  },
  {
    accessorKey: "tanggal_lahir",
    header: "Tanggal Lahir",
  },
  {
    accessorKey: "tahun_ajaran",
    header: "Tahun Ajaran",
  },
];

export default function DaftarAlumni() {
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

        <div className="p-6 w-full h-full space-y-4">
          <div className="w-full flex justify-between">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Daftar Alumni
            </h3>
            <div></div>
          </div>

          {/* Content */}
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
        </div>
      </div>
    </Sidebar>
  );
}
