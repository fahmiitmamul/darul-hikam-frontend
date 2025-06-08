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
import UploadAktaPendirianPenyelenggara from "@/components/upload-akta-pendirian-penyelenggara";
import http from "@/helpers/http.helper";

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
  const [fotoPapanNama, setFotoPapanNama] = useState(null);
  const [fotoGedung, setFotoGedung] = useState(null);
  const [fotoKelas, setFotoKelas] = useState(null);
  const [fotoHalaman, setFotoHalaman] = useState(null);
  const [fotoDenahLembaga, setFotoDenahLembaga] = useState(null);
  const [fotoMusholaAtauMasjid, setFotoMusholaAtauMasjid] = useState(null);
  const [
    fileUploadAktaPendirianPenyelenggara,
    setFileUploadAktaPendirianPenyelenggara,
  ] = useState(null);

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
    npwp: z.string({
      message: "Masukkan npwp",
    }),
    nomor_telepon: z.string({
      message: "Masukkan nomor telepon",
    }),
    alamat_website: z.string({
      message: "Masukkan alamat website",
    }),
    email: z.string({
      message: "Masukkan email",
    }),
    tahun_berdiri_hijriah: z.date({
      required_error: "Tahun Berdiri Hijriah wajib diisi",
    }),
    tahun_berdiri_masehi: z.date({
      required_error: "Tahun Berdiri Masehi wajib diisi",
    }),
    tipe_penyelenggara_lembaga: z.string({
      message: "Masukkan tipe penyelenggara lembaga",
    }),
    nama_penyelenggara_lembaga: z.string({
      message: "Masukkan nama penyelenggara lembaga",
    }),
    afilisasi_organisasi_keagamaan: z.string({
      message: "Masukkan afilisasi organisasi keagamaan",
    }),
  });

  const schemaLokasi = z.object({
    alamat: z.string({ message: "Masukkan alamat" }),
    rt: z.string({ message: "Masukkan rt" }),
    rw: z.string({ message: "Masukkan rw" }),
    desa_atau_kelurahan: z.string({
      message: "Masukkan desa atau kelurahan",
    }),
    kecamatan: z.string({
      message: "Masukkan kecamatan",
    }),
    kabupaten: z.string({
      message: "Masukkan kabupaten",
    }),
    provinsi: z.string({
      message: "Masukkan provinsi",
    }),
    kode_pos: z.string({
      message: "Masukkan kode pos",
    }),
  });

  const schemaDokumenPerijinan = z.object({
    akta_pendirian_penyelenggara: z.string({
      message: "Masukkan akta pendirian penyelenggara",
    }),
    tanggal_akta_pendirian: z.date({
      required_error: "Tanggal akta pendirian wajib diisi",
    }),
  });

  const identitasForm = useForm({
    resolver: zodResolver(schemaIdentitas),
    defaultValues: async () => {
      const { data } = await http().get(`/profil/identitas`);
      return data.results?.data[0];
    },
  });

  const lokasiForm = useForm({
    resolver: zodResolver(schemaLokasi),
  });

  const galeriForm = useForm();

  const dokumenPerijinanForm = useForm({
    resolver: zodResolver(schemaDokumenPerijinan),
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
                            <Input
                              type="number"
                              placeholder="Masukkan NSPP"
                              {...field}
                            />
                          </FormControl>
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Satuan Pendidikan</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger
                                  className={cn(
                                    "w-full",
                                    fieldState.error
                                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                      : ""
                                  )}
                                >
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Program Pendidikan</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger
                                  className={cn(
                                    "w-full",
                                    fieldState.error
                                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                      : ""
                                  )}
                                >
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel
                              className={fieldState.error ? "text-red-500" : ""}
                            >
                              Tahun Berdiri Hijriah
                            </FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                      fieldState.error && "border-red-500"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pilih Tahun Berdiri Hijriah</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel
                              className={fieldState.error ? "text-red-500" : ""}
                            >
                              Tahun Berdiri Masehi
                            </FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                      fieldState.error && "border-red-500"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pilih Tahun Berdiri Masehi</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Tipe Penyelenggara Lembaga</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger
                                  className={cn(
                                    "w-full",
                                    fieldState.error
                                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                      : ""
                                  )}
                                >
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
                          render={({ field, fieldState }) => (
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
                                  <SelectTrigger
                                    className={cn(
                                      "w-full",
                                      fieldState.error
                                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                        : ""
                                    )}
                                  >
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

                  <Button
                    type="submit"
                    className="uppercase cursor-pointer mt-5"
                  >
                    Simpan
                  </Button>
                </form>
              </Form>
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
                            name="kecamatan"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel>Kecamatan</FormLabel>
                                <FormControl>
                                  <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                  >
                                    <SelectTrigger
                                      className={cn(
                                        "w-full text-left border rounded-md p-2",
                                        fieldState.error && "border-red-500"
                                      )}
                                    >
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
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel>Kabupaten</FormLabel>
                                <FormControl>
                                  <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                  >
                                    <SelectTrigger
                                      className={cn(
                                        "w-full text-left border rounded-md p-2",
                                        fieldState.error && "border-red-500"
                                      )}
                                    >
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
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel>Provinsi</FormLabel>
                                <FormControl>
                                  <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                  >
                                    <SelectTrigger
                                      className={cn(
                                        "w-full text-left border rounded-md p-2",
                                        fieldState.error && "border-red-500"
                                      )}
                                    >
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
                          control={dokumenPerijinanForm.control}
                          name="akta_pendirian_penyelenggara"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Akta Pendirian Penyelenggara
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Masukkan Akta Pendirian Penyelenggara"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <div>
                          <FormField
                            control={dokumenPerijinanForm.control}
                            name="tanggal_akta_pendirian"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel
                                  className={
                                    fieldState.error ? "text-red-500" : ""
                                  }
                                >
                                  Tanggal Akta Pendirian
                                </FormLabel>
                                <FormControl>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full justify-start text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground",
                                          fieldState.error && "border-red-500"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                          format(field.value, "PPP")
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
                                        selected={field.value}
                                        onSelect={field.onChange}
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

                  <div className="pt-5">
                    <UploadAktaPendirianPenyelenggara
                      fileUploadAktaPendirianPenyelenggara={
                        fileUploadAktaPendirianPenyelenggara
                      }
                      setFileUploadAktaPendirianPenyelenggara={
                        setFileUploadAktaPendirianPenyelenggara
                      }
                    />
                  </div>

                  <div className="w-full flex justify-end">
                    <Button
                      type="submit"
                      className="uppercase cursor-pointer mt-5"
                    >
                      Simpan
                    </Button>
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
