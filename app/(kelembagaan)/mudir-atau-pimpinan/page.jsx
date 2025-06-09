"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar-wrapper";
import AppHeader from "@/components/app-header";
import {
  flexRender,
  getCoreRowModel,
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
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  MoreHorizontal,
  Trash,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ModalTambahMudirAtauPimpinan from "@/components/(kelembagaan)/mudir-atau-pimpinan/modal-tambah-mudir-atau-pimpinan/page";
import { ModalHapusMudirAtauPimpinan } from "@/components/(kelembagaan)/mudir-atau-pimpinan/modal-hapus-mudir-atau-pimpinan/page";
import http from "@/helpers/http.helper";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import ModalEditMudirAtauPimpinan from "@/components/(kelembagaan)/mudir-atau-pimpinan/form-edit-mudir-atau-pimpinan/page";

export default function MudirAtauPimpinan() {
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogHapus, setOpenDialogHapus] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [globalFilter, setGlobalFilter] = useState("");
  const [mudirAtauPimpinanId, setMudirAtauPimpinanId] = useState(null);

  const getDataMudirPimpinan = async (page, limit, search) => {
    const { data } = await http().get(
      `/mudir-atau-pimpinan?page=${page}&limit=${limit}&search=${search}`
    );
    return data.results;
  };

  const { data } = useQuery({
    queryKey: ["mudir-pimpinan", pageIndex, pageSize, globalFilter],
    queryFn: () => getDataMudirPimpinan(pageIndex, pageSize, globalFilter),
    keepPreviousData: true,
  });

  const columns = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => row.index + 1 + (pageIndex - 1) * pageSize,
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
      accessorKey: "tanggal_mulai",
      header: "Tanggal SK",
      cell: ({ row }) => {
        const rawDate = row.getValue("tanggal_mulai"); // ISO string
        const date = parseISO(rawDate); // ubah string ISO ke Date object
        return format(date, "dd-MM-yyyy"); // format sesuai kebutuhan
      },
    },
    {
      accessorKey: "status_keaktifan",
      header: "Status Keaktifan",
    },
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setOpenDialogEdit(true);
                setMudirAtauPimpinanId(row.original.id);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setOpenDialogHapus(true);
                setMudirAtauPimpinanId(row.original.id);
              }}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
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
        <AppHeader />

        <div className="p-6 w-full h-full">
          <div className="flex justify-between mb-4">
            <h3 className="text-2xl font-semibold">Mudir Atau Pimpinan</h3>
            <ModalTambahMudirAtauPimpinan
              openDialogEditMudirAtauPimpinan={openDialogEdit}
              setOpenDialogEditMudirAtauPimpinan={setOpenDialogEdit}
            />
          </div>

          <div className="flex flex-col space-y-4">
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

            <div className="flex justify-between items-center">
              <span>
                Page {pageIndex} of {data?.totalPages ?? 1}
              </span>

              <div className="flex gap-2">
                <Button
                  onClick={() => setPageIndex(1)}
                  disabled={pageIndex === 1}
                >
                  <ChevronsLeft />
                </Button>
                <Button
                  onClick={() => setPageIndex((p) => Math.max(p - 1, 1))}
                  disabled={pageIndex === 1}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  onClick={() => setPageIndex((p) => p + 1)}
                  disabled={pageIndex === (data?.totalPages ?? 1)}
                >
                  <ChevronRight />
                </Button>
                <Button
                  onClick={() => setPageIndex(data?.totalPages ?? 1)}
                  disabled={pageIndex === (data?.totalPages ?? 1)}
                >
                  <ChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ModalHapusMudirAtauPimpinan
          mudirAtauPimpinanId={mudirAtauPimpinanId}
          openDialogHapusMudirAtauPimpinan={openDialogHapus}
          setOpenDialogHapusMudirAtauPimpinan={setOpenDialogHapus}
        />

        <ModalEditMudirAtauPimpinan
          mudirAtauPimpinanId={mudirAtauPimpinanId}
          openDialogEditMudirAtauPimpinan={openDialogEdit}
          setOpenDialogEditMudirAtauPimpinan={setOpenDialogEdit}
        />
      </div>
    </Sidebar>
  );
}
