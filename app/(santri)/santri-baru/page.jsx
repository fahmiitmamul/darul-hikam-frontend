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
  FormDescription,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Eye, Pencil, Trash } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

export default function SantriBaru() {
  const [tahunBerdiriMasehi, setTahunBerdiriMasehi] = useState(null);
  const [tahunBerdiriHijriah, setTahunBerdiriHijriah] = useState(null);

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

  const identitasForm = useForm({
    resolver: zodResolver(schemaIdentitas),
    defaultValues: {
      nspp: "",
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
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="tanggal_masuk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Masuk</FormLabel>
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
                                  <span>Pilih Tanggal Masuk</span>
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
                    name="tingkat_kelas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tingkat Kelas</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Tingkat Kelas" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tingkat Kelas</SelectLabel>
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

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Keterangan Calon Santri
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
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
                                <SelectItem value="wni">WNI</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="nik"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIK</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan NIK" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nik" />
                    <label
                      htmlFor="nik"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Belum punya NIK
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="nisn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NISN</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan NISN" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nisn" />
                    <label
                      htmlFor="nisn"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Belum punya NISN
                    </label>
                  </div>
                </div>
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Jenis Kelamin
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <RadioGroup defaultValue="comfortable">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="laki_laki" id="r1" />
                        <Label htmlFor="r1">Laki-laki</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="perempuan" id="r2" />
                        <Label htmlFor="r2">Perempuan</Label>
                      </div>
                    </div>

                    <div></div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="tempat_lahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempat Lahir</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan Tempat Lahir"
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
                    name="tanggal_lahir"
                    render={({ field }) => (
                      <div>
                        <FormField
                          control={identitasForm.control}
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
                                        !tahunBerdiriHijriah &&
                                          "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon />
                                      {tahunBerdiriHijriah ? (
                                        format(tahunBerdiriHijriah, "PPP")
                                      ) : (
                                        <span>Pilih Tanggal Lahir</span>
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
                    )}
                  />
                </div>

                <div></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
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
              </div>

              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox id="no_handphone" />
                  <label
                    htmlFor="no_handphone"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Tidak memiliki nomor handphone
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="no_handphone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No Handphone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan No Handphone"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Contoh : 08123456789</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Keterangan Orang Tua Santri
              </h4>

              <Separator className="mt-5" />

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="nama_lengkap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ayah Kandung</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Nama Lengkap"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Status
              </h4>

              <div>
                <FormField
                  control={identitasForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue=""
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="masih_hidup">
                                Masih Hidup
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="mt-5" />

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="ibu_kandung"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ibu Kandung</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Nama Lengkap"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Status
              </h4>

              <div>
                <FormField
                  control={identitasForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue=""
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="masih_hidup">
                                Masih Hidup
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
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
