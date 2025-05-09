"use client";
import Sidebar from "@/components/sidebar-wrapper";
import AppHeader from "@/components/app-header";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
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
import ModalTambahSkDanPerizinan from "@/components/(kelembagaan)/profil/modal-tambah-sk-dan-perizinan/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Eye, Pencil, Trash } from "lucide-react";

const defaultData = [
  {
    no: "1",
    no_sk_iuop: "983457345",
    tanggal_sk_iuop: "31-12-2022",
    berlaku_sampai: "31-12-2023",
    instansi_penerbit_iuop: "Kemenag",
    file_sk_ioup: "SK/SD/2001/2022",
    file_piagam_sk_iuop: "file.pdf",
    status: "Aktif",
    aksi: "Aksi",
  },
  {
    no: "2",
    no_sk_iuop: "987654678",
    tanggal_sk_iuop: "31-12-2022",
    berlaku_sampai: "31-05-2000",
    instansi_penerbit_iuop: "Kemenag",
    file_sk_ioup: "SD/SD/2002/2005",
    file_piagam_sk_iuop: "file.pdf",
    status: "Aktif",
    aksi: "Aksi",
  },
];

const defaultColumns = [
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "no_sk_iuop",
    header: "No SK IUOP",
  },
  {
    accessorKey: "tanggal_sk_iuop",
    header: "Tanggal SK IUOP",
  },
  {
    accessorKey: "berlaku_sampai",
    header: "Berlaku Sampai",
  },
  {
    accessorKey: "instansi_penerbit_iuop",
    header: "Instansi Penerbit IUOP",
  },
  {
    accessorKey: "file_sk_ioup",
    header: "File SK IUOP",
    cell: ({ row }) => (
      <Button onClick={() => alert("Lihat Dokumen")} className="cursor-pointer">
        Lihat Dokumen
      </Button>
    ),
  },
  {
    accessorKey: "file_piagam_sk_iuop",
    header: "File Piagam SK IUOP",
    cell: ({ row }) => (
      <Button
        onClick={() => alert("Belum Diupload")}
        className="cursor-pointer"
      >
        Belum Diupload
      </Button>
    ),
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
          <DropdownMenuItem className="cursor-pointer">
            <Eye />
            View
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 cursor-pointer">
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function SantriBaru() {
  const [tahunBerdiriMasehi, setTahunBerdiriMasehi] = useState(null);
  const [tahunBerdiriHijriah, setTahunBerdiriHijriah] = useState(null);
  const [data] = React.useState(() => [...defaultData]);
  const [columns] = React.useState(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleFileChange = (e, setImage, prefix) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const fileName = `UPLOAD_FOTO_LEMBAGA_${prefix}_${Date.now()}.jpg`;
      setImage({ url, name: fileName });
    }
  };

  const handleRemove = (setImage) => {
    setImage(null);
  };

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

  const schemaLokasi = z.object({
    nspp: z.string({ message: "Masukkan NSPP" }),
    nama_lembaga: z.string({ message: "Masukkan nama lembaga" }),
    satuan_pendidikan: z.string({
      message: "Masukkan satuan pendidikan",
    }),
    program_pendidikan: z.string({
      message: "Masukkan program pendidikan",
    }),
  });

  const schemaDokumenPerijinan = z.object({
    nspp: z.string({ message: "Masukkan NSPP" }),
    nama_lembaga: z.string({ message: "Masukkan nama lembaga" }),
    satuan_pendidikan: z.string({
      message: "Masukkan satuan pendidikan",
    }),
    program_pendidikan: z.string({
      message: "Masukkan program pendidikan",
    }),
  });

  const identitasForm = useForm({
    resolver: zodResolver(schemaIdentitas),
    defaultValues: {
      nspp: "",
    },
  });

  const lokasiForm = useForm({
    resolver: zodResolver(schemaLokasi),
    defaultValues: {
      alamat_lengkap: "",
    },
  });

  const galeriForm = useForm({
    resolver: zodResolver(schemaLokasi),
    defaultValues: {
      alamat_lengkap: "",
    },
  });

  const dokumenPerijinanForm = useForm({
    resolver: zodResolver(schemaDokumenPerijinan),
    defaultValues: {
      alamat_lengkap: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <Sidebar>
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="w-full">
          <AppHeader />
        </div>

        {/* Content */}
        <div className="p-6 w-full h-full">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Formulir Santri Baru
          </h4>

          <p className="leading-7 rounded-md text-xs">
            Kolom dengan tanda (*) merupakan kolom yang wajib diisi, sedangkan
            kolom tanpa tanda (*) merupakan kolom opsional yang tidak wajib
            diisi.
          </p>

          <Separator className="mt-5" />

          <Form {...identitasForm}>
            <form
              onSubmit={identitasForm.handleSubmit(onSubmit)}
              className="space-y-5 mt-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={identitasForm.control}
                  name="nspp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NSPP</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan NSPP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div></div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="nama_lembaga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lembaga</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan Nama Lembaga"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="satuan_pendidikan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Satuan Pendidikan</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Satuan Pendidikan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Satuan Pendidikan</SelectLabel>
                                <SelectItem value="lpq">LPQ</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={identitasForm.control}
                    name="program_pendidikan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Pendidikan</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Program Pendidikan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Program Pendidikan</SelectLabel>
                                <SelectItem value="tpq">TPQ</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="npwp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NPWP</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan NPWP"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={identitasForm.control}
                    name="nomor_telepon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan Nomor Telepon"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="alamat_website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan Alamat Website"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={identitasForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Masukkan Email"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="tahun_berdiri_hijriah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tahun Berdiri Hijriah</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !tahunBerdiriHijriah &&
                                    "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {tahunBerdiriHijriah ? (
                                  format(tahunBerdiriHijriah, "PPP")
                                ) : (
                                  <span>Pilih Tahun Berdiri Hijriah</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={tahunBerdiriHijriah}
                                onSelect={setTahunBerdiriHijriah}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={identitasForm.control}
                    name="tahun_berdiri_masehi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tahun Berdiri Masehi</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !tahunBerdiriMasehi && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {tahunBerdiriMasehi ? (
                                  format(tahunBerdiriMasehi, "PPP")
                                ) : (
                                  <span>Pilih Tahun Berdiri Masehi</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={tahunBerdiriMasehi}
                                onSelect={setTahunBerdiriMasehi}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Identitas Penyelenggara Lembaga
              </h4>

              <Separator className="mt-5" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="tipe_penyelenggara_lembaga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipe Penyelenggara Lembaga</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Tipe Penyelenggara Lembaga" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Tipe Penyelenggara Lembaga
                                </SelectLabel>
                                <SelectItem value="lpq">LPQ</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={identitasForm.control}
                    name="nama_penyelenggara_lembaga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Penyelenggara Lembaga</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Nama Penyelenggara Lembaga"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div>
                    <FormField
                      control={identitasForm.control}
                      name="afilisasi_organisasi_keagamaan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Afilisasi Organisasi Keagamaan</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Afilisasi Organisasi Keagamaan" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>
                                    Afilisasi Organisasi Keagamaan
                                  </SelectLabel>
                                  <SelectItem value="lpq">LPQ</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div></div>
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Data Bank
              </h4>

              <Separator className="mt-5" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="nama_bank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Bank</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Nama Bank"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={identitasForm.control}
                    name="nomor_rekening"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Rekening</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nomor Rekening"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <div>
                    <FormField
                      control={identitasForm.control}
                      name="rekening_atas_nama"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rekening Atas Nama</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Rekening Atas Nama"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </form>
          </Form>

          <Button type="submit" className="uppercase cursor-pointer mt-5">
            Simpan
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}
