"use client";
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
import React from "react";
import { ChevronsLeft } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import http from "@/helpers/http.helper";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { ModalHapusDataUstadz } from "@/components/(ustadz)/modal-hapus-data-ustadz/page";

export default function DaftarUstadz() {
  const [openDialogEditUstadz, setOpenDialogEditUstadz] = useState(false);
  const [openDialogHapusUstadz, setOpenDialogHapusUstadz] = useState(false);
  const [ustadzId, setUstadzId] = useState(null);

  const router = useRouter();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [globalFilter, setGlobalFilter] = useState("");

  const getDataUstadz = async (page, limit, search) => {
    const { data } = await http().get(
      `/ustadz?page=${page}&limit=${limit}&search=${search}`
    );

    return data.results;
  };

  const { data } = useQuery({
    queryKey: ["ustadz", pageIndex, pageSize, globalFilter],
    queryFn: () => getDataUstadz(pageIndex, pageSize, globalFilter),
    keepPreviousData: true,
  });

  const columns = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => row.index + 1 + (pageIndex - 1) * pageSize,
    },
    {
      accessorKey: "nik",
      header: "NIK",
    },
    {
      accessorKey: "nama_lengkap",
      header: "Nama Lengkap",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "npk",
      header: "NPK",
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
                setUstadzId(row.original.id);
              }}
            >
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setUstadzId(row.original.id);
                setOpenDialogHapusUstadz(true);
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

        <div className="p-6 w-full h-full">
          <div className="w-full flex justify-between">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Daftar Ustadz
            </h3>

            <div>
              <Button
                onClick={() => {
                  router.push("/ustadz-baru");
                }}
                className="uppercase cursor-pointer"
              >
                <Plus />
                Tambah
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Select defaultValue="">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status Penempatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status Penempatan</SelectLabel>
                      <SelectItem value="lpq">LPQ</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input type="text" placeholder="Cari Nama Ustadz" />
              </div>
            </div>
            <div></div>
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
      </div>

      <ModalHapusDataUstadz
        openDialogHapusUstadz={openDialogHapusUstadz}
        setOpenDialogHapusUstadz={setOpenDialogHapusUstadz}
        ustadzId={ustadzId}
      />
    </Sidebar>
  );
}
