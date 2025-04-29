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

export default function MudirAtauPimpinan() {
  const [openDialogEditMudirAtauPimpinan, setOpenDialogEditMudirAtauPimpinan] =
    useState(false);
  const [
    openDialogHapusMudirAtauPimpinan,
    setOpenDialogHapusMudirAtauPimpinan,
  ] = useState(false);

  const tableData = [
    {
      no: "1",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "2",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "3",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "4",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "5",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "6",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "7",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "8",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "9",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "10",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "11",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "12",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "13",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "14",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "15",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "16",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "17",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "18",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "19",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "20",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "21",
      nama_lengkap: "983457345",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-12-2023",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
    {
      no: "22",
      nama_lengkap: "987654678",
      no_handphone: "31-12-2022",
      tanggal_sk: "31-05-2000",
      status_keaktifan: "Aktif",
      aksi: "Aksi",
    },
  ];

  const tableColumns = [
    {
      accessorKey: "no",
      header: "No",
    },
    {
      accessorKey: "nama_lengkap",
      header: "Nama Lengkap",
    },
    {
      accessorKey: "no_handphone",
      header: "No Handphone",
    },
    {
      accessorKey: "tanggal_sk",
      header: "Tanggal SK",
    },
    {
      accessorKey: "status_keaktifan",
      header: "Status Keaktifan",
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
                setOpenDialogEditMudirAtauPimpinan(true);
              }}
            >
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setOpenDialogHapusMudirAtauPimpinan(true);
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
              Mudir Atau Pimpinan
            </h3>

            <div>
              <ModalTambahMudirAtauPimpinan
                openDialogEditMudirAtauPimpinan={
                  openDialogEditMudirAtauPimpinan
                }
                setOpenDialogEditMudirAtauPimpinan={
                  setOpenDialogEditMudirAtauPimpinan
                }
              />
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
