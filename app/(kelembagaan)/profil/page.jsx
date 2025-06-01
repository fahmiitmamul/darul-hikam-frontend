"use client";
import Sidebar from "@/components/sidebar-wrapper";
import AppHeader from "@/components/app-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { CalendarIcon, ImagePlus, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
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
import { Files } from "lucide-react";

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
        <Files />
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
        <Files />
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

export default function Profil() {
  const [tahunBerdiriMasehi, setTahunBerdiriMasehi] = useState(null);
  const [tahunBerdiriHijriah, setTahunBerdiriHijriah] = useState(null);
  const [tanggalAktaPendirian, setTanggalAktaPendirian] = useState(null);
  const [fotoPapanNama, setFotoPapanNama] = useState(null);
  const [fotoGedung, setFotoGedung] = useState(null);
  const [fotoKelas, setFotoKelas] = useState(null);
  const [fotoHalaman, setFotoHalaman] = useState(null);
  const [fotoDenahLembaga, setFotoDenahLembaga] = useState(null);
  const [fotoMusholaAtauMasjid, setFotoMusholaAtauMasjid] = useState(null);

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
          <Tabs defaultValue="identitas" className="w-auto">
            <TabsList className="grid w-full mb-20 md:mb-10 xl:mb-0 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              <TabsTrigger className="cursor-pointer" value="identitas">
                Identitas
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="lokasi">
                Lokasi
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="galeri_foto">
                Galeri Foto
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="dokumen_perijinan">
                Dokumen Perijinan
              </TabsTrigger>
            </TabsList>
            <TabsContent value="identitas">
              <p className="leading-7 rounded-md text-xs">
                Kolom dengan tanda (*) merupakan kolom yang wajib diisi,
                sedangkan kolom tanpa tanda (*) merupakan kolom opsional yang
                tidak wajib diisi.
              </p>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Identitas Lembaga
              </h4>

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
                                    <SelectLabel>
                                      Program Pendidikan
                                    </SelectLabel>
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
                                      !tahunBerdiriMasehi &&
                                        "text-muted-foreground"
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
                              <FormLabel>
                                Afilisasi Organisasi Keagamaan
                              </FormLabel>
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
            </TabsContent>

            <TabsContent value="lokasi" className="flex flex-col space-y-5">
              <Form {...lokasiForm}>
                <form
                  onSubmit={lokasiForm.handleSubmit(onSubmit)}
                  className="space-y-5 mt-5"
                >
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Data Lokasi
                  </h4>

                  <Separator className="mt-5" />

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={lokasiForm.control}
                        name="alamat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alamat</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Alamat"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <FormField
                          control={lokasiForm.control}
                          name="rt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>RT</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="RT"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <FormField
                          control={lokasiForm.control}
                          name="rw"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>RW</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="RW"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <FormField
                          control={lokasiForm.control}
                          name="desa_atau_kelurahan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Desa / Kelurahan</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Desa / Kelurahan"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <div>
                        <div>
                          <FormField
                            control={lokasiForm.control}
                            name="desa_atau_kelurahan"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Kecamatan</FormLabel>
                                <FormControl>
                                  <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Kecamatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Kecamatan</SelectLabel>
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
                    </div>
                    <div>
                      <div>
                        <div>
                          <FormField
                            control={lokasiForm.control}
                            name="kabupaten"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Kabupaten</FormLabel>
                                <FormControl>
                                  <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Kabupaten" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Kabupaten</SelectLabel>
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
                    </div>

                    <div>
                      <div>
                        <div>
                          <FormField
                            control={lokasiForm.control}
                            name="provinsi"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Provinsi</FormLabel>
                                <FormControl>
                                  <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Provinsi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Provinsi</SelectLabel>
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
                    </div>
                    <div>
                      <div>
                        <div>
                          <FormField
                            control={lokasiForm.control}
                            name="kode_pos"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Kode POS</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Masukkan Kode POS"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="uppercase cursor-pointer mt-5"
                  >
                    Simpan
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="galeri_foto">
              <Form {...galeriForm}>
                <form
                  onSubmit={galeriForm.handleSubmit(onSubmit)}
                  className="mt-5"
                >
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Galeri Foto
                  </h4>

                  <Separator className="mt-5" />

                  <div className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Foto Papan Nama */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="fotoPapanNama"
                          className="text-base font-medium"
                        >
                          Foto Papan Nama{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative border border-dashed rounded-md p-1 h-[200px] flex flex-col items-center justify-center">
                          {fotoPapanNama ? (
                            <>
                              <div className="absolute top-2 right-2 z-10 flex space-x-1">
                                <Button
                                  variant="secondary"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  onClick={() => handleRemove(setFotoPapanNama)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="relative w-full h-full">
                                <Image
                                  src={fotoPapanNama.url || "/placeholder.svg"}
                                  alt="Foto Papan Nama"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </>
                          ) : (
                            <label
                              htmlFor="fotoPapanNama"
                              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                            >
                              <ImagePlus className="h-10 w-10 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">
                                Klik untuk upload
                              </span>
                              <input
                                id="fotoPapanNama"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    setFotoPapanNama,
                                    "Papan_Nama"
                                  )
                                }
                              />
                            </label>
                          )}
                        </div>
                        {fotoPapanNama && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Upload className="h-4 w-4 mr-1" />
                            <span className="truncate">
                              {fotoPapanNama.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Foto Gedung */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="fotoGedung"
                          className="text-base font-medium"
                        >
                          Foto Gedung (Tampak Depan){" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative border border-dashed rounded-md p-1 h-[200px] flex flex-col items-center justify-center">
                          {fotoGedung ? (
                            <>
                              <div className="absolute top-2 right-2 z-10 flex space-x-1">
                                <Button
                                  variant="secondary"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  onClick={() => handleRemove(setFotoGedung)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="relative w-full h-full">
                                <Image
                                  src={fotoGedung.url || "/placeholder.svg"}
                                  alt="Foto Gedung"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </>
                          ) : (
                            <label
                              htmlFor="fotoGedung"
                              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                            >
                              <ImagePlus className="h-10 w-10 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">
                                Klik untuk upload
                              </span>
                              <input
                                id="fotoGedung"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    setFotoGedung,
                                    "Foto_Gedung"
                                  )
                                }
                              />
                            </label>
                          )}
                        </div>
                        {fotoGedung && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Upload className="h-4 w-4 mr-1" />
                            <span className="truncate">{fotoGedung.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Foto Kelas */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="fotoKelas"
                          className="text-base font-medium"
                        >
                          Foto Kelas
                        </Label>
                        <div className="relative border border-dashed rounded-md p-1 h-[200px] flex flex-col items-center justify-center">
                          {fotoKelas ? (
                            <>
                              <div className="absolute top-2 right-2 z-10 flex space-x-1">
                                <Button
                                  variant="secondary"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  onClick={() => handleRemove(setFotoKelas)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="relative w-full h-full">
                                <Image
                                  src={fotoKelas.url || "/placeholder.svg"}
                                  alt="Foto Kelas"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </>
                          ) : (
                            <label
                              htmlFor="fotoKelas"
                              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                            >
                              <ImagePlus className="h-10 w-10 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">
                                Klik untuk upload
                              </span>
                              <input
                                id="fotoKelas"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    setFotoKelas,
                                    "Foto_Kelas"
                                  )
                                }
                              />
                            </label>
                          )}
                        </div>
                        {fotoKelas && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Upload className="h-4 w-4 mr-1" />
                            <span className="truncate">{fotoKelas.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Foto Halaman */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="fotoHalaman"
                          className="text-base font-medium"
                        >
                          Foto Halaman <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative border border-dashed rounded-md p-1 h-[200px] flex flex-col items-center justify-center">
                          {fotoHalaman ? (
                            <>
                              <div className="absolute top-2 right-2 z-10 flex space-x-1">
                                <Button
                                  variant="secondary"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  onClick={() => handleRemove(setFotoHalaman)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="relative w-full h-full">
                                <Image
                                  src={fotoHalaman.url || "/placeholder.svg"}
                                  alt="Foto Papan Nama"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </>
                          ) : (
                            <label
                              htmlFor="fotoHalaman"
                              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                            >
                              <ImagePlus className="h-10 w-10 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">
                                Klik untuk upload
                              </span>
                              <input
                                id="fotoHalaman"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    setFotoHalaman,
                                    "Foto_Halaman"
                                  )
                                }
                              />
                            </label>
                          )}
                        </div>
                        {fotoHalaman && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Upload className="h-4 w-4 mr-1" />
                            <span className="truncate">{fotoHalaman.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Foto Denah Lembaga */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="fotoDenahLembaga"
                          className="text-base font-medium"
                        >
                          Foto Denah Lembaga
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative border border-dashed rounded-md p-1 h-[200px] flex flex-col items-center justify-center">
                          {fotoDenahLembaga ? (
                            <>
                              <div className="absolute top-2 right-2 z-10 flex space-x-1">
                                <Button
                                  variant="secondary"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  onClick={() =>
                                    handleRemove(setFotoDenahLembaga)
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="relative w-full h-full">
                                <Image
                                  src={
                                    fotoDenahLembaga.url || "/placeholder.svg"
                                  }
                                  alt="Foto Denah Lembaga"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </>
                          ) : (
                            <label
                              htmlFor="fotoDenahLembaga"
                              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                            >
                              <ImagePlus className="h-10 w-10 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">
                                Klik untuk upload
                              </span>
                              <input
                                id="fotoDenahLembaga"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    setFotoDenahLembaga,
                                    "Foto_Denah_Lembaga"
                                  )
                                }
                              />
                            </label>
                          )}
                        </div>
                        {fotoDenahLembaga && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Upload className="h-4 w-4 mr-1" />
                            <span className="truncate">
                              {fotoDenahLembaga.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Foto Mushola / Masji */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="fotoMusholaAtauMasjid"
                          className="text-base font-medium"
                        >
                          Foto Mushola / Masjid
                        </Label>
                        <div className="relative border border-dashed rounded-md p-1 h-[200px] flex flex-col items-center justify-center">
                          {fotoMusholaAtauMasjid ? (
                            <>
                              <div className="absolute top-2 right-2 z-10 flex space-x-1">
                                <Button
                                  variant="secondary"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  onClick={() =>
                                    handleRemove(setFotoMusholaAtauMasjid)
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="relative w-full h-full">
                                <Image
                                  src={
                                    fotoMusholaAtauMasjid.url ||
                                    "/placeholder.svg"
                                  }
                                  alt="Foto Mushola Atau Masjid"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </>
                          ) : (
                            <label
                              htmlFor="fotoMusholaAtauMasjid"
                              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                            >
                              <ImagePlus className="h-10 w-10 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">
                                Klik untuk upload
                              </span>
                              <input
                                id="fotoMusholaAtauMasjid"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    setFotoMusholaAtauMasjid,
                                    "Foto_Mushola_Atau_Masjid"
                                  )
                                }
                              />
                            </label>
                          )}
                        </div>
                        {fotoMusholaAtauMasjid && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Upload className="h-4 w-4 mr-1" />
                            <span className="truncate">
                              {fotoMusholaAtauMasjid.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="uppercase cursor-pointer mt-5"
                  >
                    Simpan
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="dokumen_perijinan">
              <Form {...dokumenPerijinanForm}>
                <form onSubmit={dokumenPerijinanForm.handleSubmit(onSubmit)}>
                  <p className="leading-7 rounded-md text-xs">
                    Kolom dengan tanda (*) merupakan kolom yang wajib diisi,
                    sedangkan kolom tanpa tanda (*) merupakan kolom opsional
                    yang tidak wajib diisi.
                  </p>

                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Dokumen Perijinan
                  </h4>

                  <Separator className="mt-5" />

                  <div className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <FormField
                          control={identitasForm.control}
                          name="nama_lembaga"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Akta Pendirian Penyelenggara
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Masukkan Akta Pendirian Penyelenggara"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <div>
                          <FormField
                            control={dokumenPerijinanForm.control}
                            name="tanggal_akta_pendirian"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tanggal Akta Pendirian</FormLabel>
                                <FormControl>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full justify-start text-left font-normal",
                                          !tanggalAktaPendirian &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon />
                                        {tanggalAktaPendirian ? (
                                          format(tanggalAktaPendirian, "PPP")
                                        ) : (
                                          <span>
                                            Pilih Tanggal Akta Pendirian
                                          </span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={tanggalAktaPendirian}
                                        onSelect={setTanggalAktaPendirian}
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
                    </div>
                  </div>

                  <div className="w-full flex justify-between">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5">
                      SK Izin Operasional
                    </h4>

                    <div className="scroll-m-20 text-xl font-semibold tracking-tight mt-5">
                      <ModalTambahSkDanPerizinan />
                    </div>
                  </div>

                  <Separator className="mt-5" />

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
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Sidebar>
  );
}
