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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ChevronsLeft } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronsRight } from "lucide-react";

const defaultData = [
  {
    no: "1",
    nama_buku_pelajaran: "Itmamul Fahmi",
    tanggal_upload: "31-12-2022",
    aksi: "Aksi",
  },
  {
    no: "2",
    nama_buku_pelajaran: "Itmamul Fahmi",
    tanggal_upload: "31-12-2022",
    aksi: "Aksi",
  },
];

const defaultColumns = [
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "nama_buku_pelajaran",
    header: "Nama Buku Pelajaran",
  },
  {
    accessorKey: "tanggal_upload",
    header: "Tanggal Upload",
  },
  {
    accessorKey: "aksi",
    header: "Aksi",
  },
];

export default function BukuPelajaran() {
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
              Buku Pelajaran
            </h3>
            <div>
              <Button className="uppercase cursor-pointer">
                <Plus /> Tambah
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <Select defaultValue="">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pilih Semester</SelectLabel>
                      <SelectItem value="lpq">
                        2024/2025 Ganjil - Genap
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input type="text" placeholder="Cari Buku Pelajaran" />
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

          <div className="flex justify-between items-center gap-2">
            <div>
              <span className="flex items-center gap-1">
                <div>Show Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount().toLocaleString()}
                </strong>
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                className="cursor-pointer"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft />
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft />
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight />
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
