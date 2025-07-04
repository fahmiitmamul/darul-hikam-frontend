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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import UploadKKSantri from "@/components/upload-kk-santri";
import UploadKipSantri from "@/components/upload-kip-santri";
import UploadFotoSantri from "@/components/upload-foto-santri";
import { useGlobalContext } from "@/context/global-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/helpers/http.helper";
import DropdownProvinces from "@/components/dropdown-provinces";
import DropdownRegencies from "@/components/dropdown-regencies";
import DropdownDistricts from "@/components/dropdown-districts";
import DropdownVillages from "@/components/dropdown-villages";

const defaultData = [
  {
    no: "1",
    tahun_ajaran: "20-05-2021",
    semester: "Ganjil",
    tanggal_mulai_masuk: "31-12-2023",
    nspp: "3534535353",
    jenjang_atau_takhassus: "-",
    kelas_atau_tingkat: "Kelas 2",
    rombel: "Tsani",
    status_keaktifan: "Aktif",
    keterangan: "Naik dari kelas sebelumnya",
    aksi: "Aksi",
  },
  {
    no: "2",
    tahun_ajaran: "20-05-2021",
    semester: "Ganjil",
    tanggal_mulai_masuk: "31-05-2000",
    nspp: "3534535353",
    jenjang_atau_takhassus: "-",
    kelas_atau_tingkat: "Kelas 2",
    rombel: "Tsani",
    status_keaktifan: "Aktif",
    keterangan: "Naik dari kelas sebelumnya",
    aksi: "Aksi",
  },
];

const defaultColumns = [
  {
    accessorKey: "tahun_ajaran",
    header: "Tahun Ajaran",
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "tanggal_mulai_masuk",
    header: "Tanggal Mulai Masuk",
  },
  {
    accessorKey: "nama_lembag",
    header: "Nama Lembaga",
  },
  {
    accessorKey: "nspp",
    header: "NSPP",
  },
  {
    accessorKey: "jenjang_atau_takhassus",
    header: "Jenjang / Takhassus",
  },
  {
    accessorKey: "kelas_atau_tingkat",
    header: "Kelas Atau Tingkat",
  },
  {
    accessorKey: "rombel",
    header: "Rombel",
  },
  {
    accessorKey: "status_keaktifan",
    header: "Status Keaktifan",
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
  },
];

export default function DetailSantri() {
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [isNoHpChecked, setIsNoHpChecked] = useState(null);
  const { santriId } = useGlobalContext();

  const [data] = React.useState(() => [...defaultData]);
  const [columns] = React.useState(() => [...defaultColumns]);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [globalFilter, setGlobalFilter] = useState("");

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

  const schemaDataSantri = z.object({
    nama_lengkap: z.string({ message: "Masukkan NSPP" }),
    nisn: z.string({ message: "Masukkan nama lembaga" }),
    kewarganegaraan: z.string({
      message: "Masukkan satuan pendidikan",
    }),
    nik: z.string({
      message: "Masukkan program pendidikan",
    }),
    tempat_lahir: z.string({
      message: "Masukkan program pendidikan",
    }),
    tanggal_lahir: z.string({
      message: "Masukkan program pendidikan",
    }),
    jenis_kelamin: z.string({
      message: "Masukkan program pendidikan",
    }),
    jumlah_saudara: z.string({
      message: "Masukkan program pendidikan",
    }),
    anak_ke: z.string({
      message: "Masukkan program pendidikan",
    }),
    agama: z.string({
      message: "Masukkan program pendidikan",
    }),
    no_handphone: z.string({
      message: "Masukkan program pendidikan",
    }),
    nomor_kk_santri: z.string({
      message: "Masukkan program pendidikan",
    }),
    nama_kk_santri: z.string({
      message: "Masukkan program pendidikan",
    }),
  });

  const schemaDataOrangTua = z.object({
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
    resolver: zodResolver(schemaDataSantri),
    defaultValues: {
      nama_lengkap: "",
      nisn: "",
      kewarganegaraan: "",
      nik: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      jumlah_saudara: "",
      anak_ke: "",
      agama: "",
      no_handphone: "",
      nomor_kk_santri: "",
      nama_kk_santri: "",
    },
  });

  const { reset: resetDataSantri } = dataSantriForm;

  useEffect(() => {
    if (!santriId) return;

    const fetchData = async () => {
      try {
        const { data } = await http().get(`/santri/${santriId}`);
        console.log(data);
        resetDataSantri(data.results[0]);
      } catch (err) {
        console.log(err);
        toast("Gagal memuat data santri", { description: err.message });
      }
    };

    fetchData();
  }, [santriId]);

  const dataOrangTuaForm = useForm({
    resolver: zodResolver(schemaDataOrangTua),
    defaultValues: {
      alamat_lengkap: "",
    },
  });

  const dataAlamatSantriForm = useForm({
    resolver: zodResolver(schemaDataOrangTua),
    defaultValues: {
      alamat_lengkap: "",
    },
  });

  const aktivitasBelajarForm = useForm({
    resolver: zodResolver(schemaDokumenPerijinan),
    defaultValues: {
      alamat_lengkap: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  const queryClient = useQueryClient();

  const patchDataSantri = useMutation({
    mutationFn: async (values) => {
      const data = new FormData();

      data.append("judul_buku", values.judul_buku);
      data.append("kelas", values.kelas);
      data.append("file_buku_pelajaran", fileUploadBukuPelajaran);
      return http().patch(`/buku-pelajaran/${santriId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buku-pelajaran"] });
      toast("Buku pelajaran berhasil ditambahkan", {
        description: new Date().toLocaleString(),
      });
    },
    onError: (err) => {
      toast(err.response.data.message, {
        description: new Date().toLocaleString(),
      });
    },
  });

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
                    <UploadFotoSantri />

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
                                  <SelectItem value="indonesia">
                                    Indonesia
                                  </SelectItem>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    <Checkbox
                      id="terms"
                      onClick={() => {
                        setIsNoHpChecked(!isNoHpChecked);
                      }}
                    />
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
                        name="no_handphone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor Handphone</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Nomor Handphone"
                                disabled={isNoHpChecked}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <UploadKKSantri />
                    </div>
                    <div>
                      <UploadKipSantri />
                    </div>
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
              <Form {...dataOrangTuaForm}>
                <form
                  onSubmit={dataOrangTuaForm.handleSubmit(onSubmit)}
                  className="space-y-5 mt-5"
                >
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Ayah Kandung
                  </h4>

                  <Separator className="mt-5" />

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataOrangTuaForm.control}
                        name="nama_lengkap"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
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
                      control={dataSantriForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
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

                  <div>
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
                                  <SelectLabel>Status</SelectLabel>
                                  <SelectItem value="wna">WNA</SelectItem>
                                  <SelectItem value="wni">WNI</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataOrangTuaForm.control}
                        name="nik"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NIK</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="NIK" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
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
                                placeholder="Masukkan Tempat Lahir"
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
                          control={aktivitasBelajarForm.control}
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
                  </div>

                  <div>
                    <FormField
                      control={dataSantriForm.control}
                      name="pendidikan_terakhir"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pendidikan Terakhir</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pendidikan Terakhir" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Status</SelectLabel>
                                  <SelectItem value="sd">SD</SelectItem>
                                  <SelectItem value="smp">SMP</SelectItem>
                                  <SelectItem value="sma">SMA</SelectItem>
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
                        name="pekerjaan_utama"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pekerjaan Utama</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Pekerjaan Utama" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="wirausaha">
                                      Wirausaha
                                    </SelectItem>
                                    <SelectItem value="wiraswasta">
                                      Wiraswasta
                                    </SelectItem>
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
                        control={dataSantriForm.control}
                        name="penghasilan_rata_rata_perbulan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Penghasilan Rata Rata Perbulan
                            </FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Penghasilan Rata Rata Perbulan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Penghasilan Rata Rata Perbulan
                                    </SelectLabel>
                                    <SelectItem value="1.000.000">
                                      1.000.000
                                    </SelectItem>
                                    <SelectItem value="2.000.000">
                                      2.000.000
                                    </SelectItem>
                                    <SelectItem value="3.000.000">
                                      3.000.000
                                    </SelectItem>
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
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="no_handphone"
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

                  <div className="w-full">
                    <Button className="uppercase cursor-pointer w-full">
                      Upload Kartu Keluarga
                    </Button>
                  </div>

                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Ibu Kandung
                  </h4>

                  <Separator className="mt-5" />

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataOrangTuaForm.control}
                        name="nama_lengkap"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
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
                      control={dataSantriForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
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

                  <div>
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
                                  <SelectLabel>Status</SelectLabel>
                                  <SelectItem value="wna">WNA</SelectItem>
                                  <SelectItem value="wni">WNI</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataOrangTuaForm.control}
                        name="nik"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NIK</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="NIK" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
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
                                placeholder="Masukkan Tempat Lahir"
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
                          control={aktivitasBelajarForm.control}
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
                  </div>

                  <div>
                    <FormField
                      control={dataSantriForm.control}
                      name="pendidikan_terakhir"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pendidikan Terakhir</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pendidikan Terakhir" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Status</SelectLabel>
                                  <SelectItem value="sd">SD</SelectItem>
                                  <SelectItem value="smp">SMP</SelectItem>
                                  <SelectItem value="sma">SMA</SelectItem>
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
                        name="pekerjaan_utama"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pekerjaan Utama</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Pekerjaan Utama" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="wirausaha">
                                      Wirausaha
                                    </SelectItem>
                                    <SelectItem value="wiraswasta">
                                      Wiraswasta
                                    </SelectItem>
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
                        control={dataSantriForm.control}
                        name="penghasilan_rata_rata_perbulan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Penghasilan Rata Rata Perbulan
                            </FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Penghasilan Rata Rata Perbulan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Penghasilan Rata Rata Perbulan
                                    </SelectLabel>
                                    <SelectItem value="1.000.000">
                                      1.000.000
                                    </SelectItem>
                                    <SelectItem value="2.000.000">
                                      2.000.000
                                    </SelectItem>
                                    <SelectItem value="3.000.000">
                                      3.000.000
                                    </SelectItem>
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
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataSantriForm.control}
                        name="no_handphone"
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

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      KK sama dengan Ayah Kandung
                    </label>
                  </div>

                  <div className="w-full">
                    <Button className="uppercase cursor-pointer w-full">
                      Upload Kartu Keluarga
                    </Button>
                  </div>

                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Wali
                  </h4>

                  <div>
                    <FormField
                      control={dataSantriForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
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
                                  <SelectItem value="Sama dengan ayah kandung">
                                    Sama dengan ayah kandung
                                  </SelectItem>
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
                        name="nomor_kks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor KKS</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Nomor KKS"
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
                        name="nomor_pkh"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor PKH</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Nomor PKH"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <Button className="cursor-pointer uppercase w-full">
                        Upload KKS
                      </Button>
                    </div>
                    <div>
                      <Button className="cursor-pointer uppercase w-full">
                        Upload PKH
                      </Button>
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

            <TabsContent
              value="data_alamat"
              className="flex flex-col space-y-5"
            >
              <Form {...dataAlamatSantriForm}>
                <form
                  onSubmit={dataAlamatSantriForm.handleSubmit(onSubmit)}
                  className="space-y-5 mt-5"
                >
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Tempat Tinggal Domisili
                  </h4>

                  <Separator />

                  <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                    Ayah Kandung
                  </h4>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Tinggal di Luar Negeri
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="satuan_pendidikan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status Kepemilikan Rumah</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Status Kepemilikan Rumah" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Status Kepemilikan Rumah
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
                        control={dataAlamatSantriForm.control}
                        name="provinsi"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Provinsi</FormLabel>
                            <FormControl>
                              <DropdownProvinces
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kabupaten_atau_kota"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Kabupaten / Kota</FormLabel>
                            <FormControl>
                              <DropdownRegencies
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kecamatan"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Kecamatan</FormLabel>
                            <FormControl>
                              <DropdownDistricts
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kelurahan_atau_desa"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Kelurahan / Desa</FormLabel>
                            <FormControl>
                              <DropdownVillages
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <FormField
                          control={dataAlamatSantriForm.control}
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
                          control={dataAlamatSantriForm.control}
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
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="rt"
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
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kode_pos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kode POS</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Kode POS"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div></div>
                  </div>

                  <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                    Ibu Kandung
                  </h4>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Tinggal di Luar Negeri
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="satuan_pendidikan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status Kepemilikan Rumah</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Status Kepemilikan Rumah" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Status Kepemilikan Rumah
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
                        control={dataAlamatSantriForm.control}
                        name="provinsi"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Provinsi</FormLabel>
                            <FormControl>
                              <DropdownProvinces
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kabupaten_atau_kota"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Kabupaten / Kota</FormLabel>
                            <FormControl>
                              <DropdownRegencies
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kecamatan"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Kecamatan</FormLabel>
                            <FormControl>
                              <DropdownDistricts
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kelurahan_atau_desa"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Kelurahan / Desa</FormLabel>
                            <FormControl>
                              <DropdownVillages
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <FormField
                          control={dataAlamatSantriForm.control}
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
                          control={dataAlamatSantriForm.control}
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
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="rt"
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
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kode_pos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kode POS</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Kode POS"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div></div>
                  </div>

                  <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                    Wali
                  </h4>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="nama_wali"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Wali</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Nama Wali"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                    Santri
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="status_mukim"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status Mukim</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Status Mukim" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Status Mukim</SelectLabel>
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
                      <div>
                        <FormField
                          control={dataAlamatSantriForm.control}
                          name="status_tempat_tinggal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status Tempat Tinggal</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Status Tempat Tinggal"
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
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="provinsi"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Provinsi</FormLabel>
                            <FormControl>
                              <DropdownProvinces
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <div>
                        <FormField
                          control={dataAlamatSantriForm.control}
                          name="kabupaten_atau_kota"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel>Kabupaten / Kota</FormLabel>
                              <FormControl>
                                <DropdownRegencies
                                  field={field}
                                  fieldState={fieldState}
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
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kecamatan"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Kecamatan</FormLabel>
                            <FormControl>
                              <DropdownDistricts
                                field={field}
                                fieldState={fieldState}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <div>
                        <FormField
                          control={dataAlamatSantriForm.control}
                          name="kelurahan"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel>Kelurahan / Desa</FormLabel>
                              <FormControl>
                                <DropdownVillages
                                  field={field}
                                  fieldState={fieldState}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <FormField
                          control={dataAlamatSantriForm.control}
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
                          control={dataAlamatSantriForm.control}
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
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
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

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="kode_pos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kode POS</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Kode POS"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="transportasi_ke_lembaga"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transportasi Ke Lembaga</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Transportasi Ke Lembaga" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Transportasi Ke Lembaga
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="jarak_tempuh_ke_lembaga"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jarak Tempuh ke Lembaga</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Jarak Tempuh ke Lembaga" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Jarak Tempuh ke Lembaga
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
                        control={dataAlamatSantriForm.control}
                        name="waktu_tempuh"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Waktu Tempuh</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Waktu Tempuh" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Waktu Tempuh</SelectLabel>
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

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <FormField
                        control={dataAlamatSantriForm.control}
                        name="koordinat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Koordinat</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Koordinat"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
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

            <TabsContent value="aktivitas_belajar" className="space-y-5 mt-5">
              <Form {...aktivitasBelajarForm}>
                <form
                  onSubmit={aktivitasBelajarForm.handleSubmit(onSubmit)}
                  className="space-y-5 "
                >
                  <div className="w-full flex justify-between">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Aktivitas Belajar
                    </h4>
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
