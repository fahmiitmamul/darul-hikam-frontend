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
import { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

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

export default function DetailSantri() {
  const [tanggalLahir, setTanggalLahir] = useState(null);
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

  const dataSantriForm = useForm({
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

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setError(null);

      // Validate files
      const invalidFiles = acceptedFiles.filter(
        (file) => file.type !== "application/pdf"
      );
      if (invalidFiles.length > 0) {
        setError("Only PDF files are allowed");
        return;
      }

      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > 10 * 1024 * 1024
      ); // 10MB limit
      if (oversizedFiles.length > 0) {
        setError("File size exceeds 10MB limit");
        return;
      }

      // Add preview property to files
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles((prev) => [...prev, ...newFiles]);

      // Simulate upload progress
      simulateUpload();
    },
    [files]
  );

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    onDrop(droppedFiles);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onDrop(selectedFiles);
    }
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(fileToRemove.preview);
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
          <Tabs defaultValue="data_santri" className="w-auto">
            <TabsList className="grid w-full mb-20 md:mb-10 xl:mb-0 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              <TabsTrigger className="cursor-pointer" value="data_santri">
                Data Santri
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="data_orang_tua">
                Data Orang Tua
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="data_alamat">
                Data Alamat
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="aktivitas_belajar">
                Aktivitas Belajar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="data_santri">
              <p className="leading-7 rounded-md text-xs">
                Kolom dengan tanda (*) merupakan kolom yang wajib diisi,
                sedangkan kolom tanpa tanda (*) merupakan kolom opsional yang
                tidak wajib diisi.
              </p>

              <Separator className="mt-5" />

              <Form {...dataSantriForm}>
                <form
                  onSubmit={dataSantriForm.handleSubmit(onSubmit)}
                  className="space-y-5 mt-5"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex w-32 gap-5">
                      <div>
                        <div className="flex flex-col gap-5 justify-center items-center">
                          <Image
                            className="w-24 h-24 rounded-full"
                            src="/user.png"
                            alt="logo"
                            width={1000}
                            height={1000}
                          />

                          <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() =>
                              document.getElementById("file-input")?.click()
                            }
                          >
                            Upload Foto
                          </Button>
                          <input
                            id="file-input"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-8 flex-1">
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <FormField
                            control={dataSantriForm.control}
                            name="nama_lengkap"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Lengkap</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Masukkan Nama Lengkap"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <FormField
                            control={dataSantriForm.control}
                            name="nisn"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>NISN</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Masukkan NISN"
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

                  <div className="grid grid-cols-1 gap-5">
                    <FormField
                      control={dataSantriForm.control}
                      name="kewarganegaraan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kewarganegaraan</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Kewarganegaraan" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Kewarganegaraan</SelectLabel>
                                  <SelectItem value="lpq">LPQ</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="nik"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NIK</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Masukkan NIK"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-center items-center mt-5">
                      <div className="bg-slate-100 rounded-md cursor-pointer px-10 py-1 w-full">
                        <p className="leading-7 [&:not(:first-child)]:mt-6 font-medium text-sm">
                          Status Verifikasi NIK : Belum Diverifikasi
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="tempat_lahir"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tempat Lahir</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Tempat Lahir"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="tanggal_lahir"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !tanggalLahir && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon />
                                    {tanggalLahir ? (
                                      format(tanggalLahir, "PPP")
                                    ) : (
                                      <span>Pilih Tanggal Lahir</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={tanggalLahir}
                                    onSelect={setTanggalLahir}
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
                    Jenis Kelamin
                  </h4>

                  <RadioGroup
                    defaultValue="laki-laki"
                    className="flex cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="laki-laki" id="laki-laki" />
                      <Label htmlFor="laki-laki">Laki-laki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="perempuan" id="perempuan" />
                      <Label htmlFor="perempuan">Perempuan</Label>
                    </div>
                  </RadioGroup>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="jumlah_saudara"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jumlah Saudara</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Jumlah Saudara"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="anak_ke"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Anak Ke</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Anak Ke"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <FormField
                      control={dataSantriForm.control}
                      name="agama"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agama</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Agama" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Agama</SelectLabel>
                                  <SelectItem value="islam">Islam</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Tidak memiliki nomor handphone
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="nomor_handphone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor Handphone</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Nomor Handphone"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Kartu Keluarga
                  </h4>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="no_kk"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor Kartu Keluarga</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Nomor Kartu Keluarga"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="nama_kepala_keluarga"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Kepala Keluarga</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Nama Kepala Keluarga"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <Button className="uppercase cursor-pointer w-full">
                      Upload Kartu Keluarga
                    </Button>
                  </div>
                </form>
              </Form>

              <Button type="submit" className="uppercase cursor-pointer mt-5">
                Simpan
              </Button>
            </TabsContent>

            <TabsContent
              value="data_orang_tua"
              className="flex flex-col space-y-5"
            >
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

                  <div className="grid grid-cols-2 gap-5">
                    <div className="grid grid-cols-2 gap-5">
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

                  <div className="grid grid-cols-2 gap-5">
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

            <TabsContent value="data_alamat">
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

            <TabsContent value="aktivitas_belajar">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormField
                          control={dataSantriForm.control}
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
                                          !tanggalLahir &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon />
                                        {tanggalLahir ? (
                                          format(tanggalLahir, "PPP")
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
                                        selected={tanggalLahir}
                                        onSelect={setTanggalLahir}
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
