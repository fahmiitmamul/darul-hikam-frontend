"use client";
import Sidebar from "@/components/sidebar-wrapper";
import AppHeader from "@/components/app-header";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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
import { Pencil } from "lucide-react";
import http from "@/helpers/http.helper";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "@/context/global-context";
import { Eye } from "lucide-react";
import ModalEditTabungan from "@/components/(tabungan)/modal-edit-tabungan/page";
import ModalHapusTabungan from "@/components/(tabungan)/modal-hapus-tabungan/page";
import ModalTambahTabungan from "@/components/(tabungan)/modal-tambah-tabungan/page";
import { format, parseISO } from "date-fns";

export default function BukuTabungan() {
  const [openDialogAddTabungan, setOpenDialogAddTabungan] = useState(false);
  const [openDialogEditTabungan, setOpenDialogEditTabungan] = useState(false);
  const [openDialogHapusTabungan, setOpenDialogHapusTabungan] = useState(false);
  const { tabunganId, setTabunganId } = useGlobalContext();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [globalFilter, setGlobalFilter] = useState("");

  const getDataTabungan = async (page, limit, search) => {
    const { data } = await http().get(
      `/tabungan?page=${page}&limit=${limit}&search=${search}`
    );

    return data.results;
  };

  const { data } = useQuery({
    queryKey: ["tabungan", pageIndex, pageSize, globalFilter],
    queryFn: () => getDataTabungan(pageIndex, pageSize, globalFilter),
    keepPreviousData: true,
  });

  const columns = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => row.index + 1 + (pageIndex - 1) * pageSize,
    },
    {
      accessorKey: "santri",
      header: "Nama Santri",
      accessorFn: (row) => row.santri?.nama_lengkap ?? "-",
    },
    {
      accessorKey: "tanggal",
      header: "Tanggal",
      cell: ({ row }) => {
        const rawDate = row.getValue("tanggal"); // ISO string
        const date = parseISO(rawDate); // ubah string ISO ke Date object
        return format(date, "dd-MM-yyyy"); // format sesuai kebutuhan
      },
    },
    {
      accessorKey: "uang_masuk",
      header: "Uang Masuk",
    },
    {
      accessorKey: "total",
      header: "Total",
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
                setTabunganId(row.original.id);
                setOpenDialogEditTabungan(row.original.id);
              }}
            >
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setTabunganId(row.original.id);
                setOpenDialogHapusTabungan(true);
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

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.totalPages ?? -1,
    state: {
      pagination: { pageIndex: pageIndex - 1, pageSize },
      globalFilter,
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: pageIndex - 1, pageSize })
          : updater;
      setPageIndex(next.pageIndex + 1);
      setPageSize(next.pageSize);
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
              Tabungan
            </h3>
            <div>
              <ModalTambahTabungan
                openDialogAddTabungan={openDialogAddTabungan}
                setOpenDialogAddTabungan={setOpenDialogAddTabungan}
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Input type="text" placeholder="Cari Tabungan" readOnly />
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
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-4"
                    >
                      Data tidak ada
                    </TableCell>
                  </TableRow>
                )}
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

      <ModalEditTabungan
        tabunganId={tabunganId}
        openDialogEditTabungan={openDialogEditTabungan}
        setOpenDialogEditTabungan={setOpenDialogEditTabungan}
      />

      <ModalHapusTabungan
        tabunganId={tabunganId}
        openDialogHapusTabungan={openDialogHapusTabungan}
        setOpenDialogHapusTabungan={setOpenDialogHapusTabungan}
      />
    </Sidebar>
  );
}
