"use client";
import Sidebar from "@/components/sidebar-wrapper";
import AppHeader from "@/components/app-header";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ChevronsLeft } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import ModalTambahMudirAtauPimpinan from "@/components/(kelembagaan)/mudir-atau-pimpinan/modal-tambah-mudir-atau-pimpinan/page";
import { useState } from "react";
import { ModalHapusMudirAtauPimpinan } from "@/components/(kelembagaan)/mudir-atau-pimpinan/modal-hapus-mudir-atau-pimpinan/page";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function DaftarSantri() {
  const [
    openDialogHapusMudirAtauPimpinan,
    setOpenDialogHapusMudirAtauPimpinan,
  ] = useState(false);

  const router = useRouter();

  const tableData = [
    {
      no: "1",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "2",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "3",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "4",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "5",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "6",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "7",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "8",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "9",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "10",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "11",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "12",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "13",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "14",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "15",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "16",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "17",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "18",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "19",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "20",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "21",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "22",
      photo:
        "https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/wc8dmolakkcjb0hesqac.jpg",
      nama_lengkap: "Itmamul Fahmi",
      nisn: "1212754367",
      tempat_lahir: "Banyumas",
      tanggal_lahir: "31-05-2000",
      tingkat_rombel: "Kelas 2 - Tsani",
      umur: "15 Tahun",
      status: "Aktif",
      aksi: "Aksi",
    },
  ];

  const tableColumns = [
    {
      accessorKey: "no",
      header: "No",
    },
    {
      accessorKey: "photo",
      header: "Foto",
      cell: ({ row }) => {
        const photoUrl = row.original.photo;
        return (
          <Image
            src={photoUrl}
            alt="Foto Profil"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        );
      },
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
      accessorKey: "tempat_lahir",
      header: "Tempat Lahir",
    },
    {
      accessorKey: "tanggal_lahir",
      header: "Tanggal Lahir",
    },
    {
      accessorKey: "tingkat_rombel",
      header: "Tingkat Rombel",
    },
    {
      accessorKey: "umur",
      header: "Umur",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "Aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.push("/detail-santri");
              }}
            >
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => {
                toast;
              }}
            >
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const [data] = React.useState(() => [...tableData]);
  const [columns] = React.useState(() => [...tableColumns]);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <Sidebar>
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="w-full">
          <AppHeader />
        </div>

        <div className="p-6 w-full h-full">
          <div className="w-full flex justify-between">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Daftar Santri
            </h3>

            <div>
              <Button
                className="uppercase cursor-pointer"
                onClick={() => {
                  router.push("/santri-baru");
                }}
              >
                <Plus />
                Tambah
              </Button>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center py-4">
              <div className="w-full">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="uppercase font-bold"
                          >
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

        <ModalHapusMudirAtauPimpinan
          openDialogHapusMudirAtauPimpinan={openDialogHapusMudirAtauPimpinan}
          setOpenDialogHapusMudirAtauPimpinan={
            setOpenDialogHapusMudirAtauPimpinan
          }
        />
      </div>
    </Sidebar>
  );
}
