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
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import UploadFotoUstadz from "@/components/upload-foto-ustadz";
import UploadFileSk from "@/components/upload-file-sk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/helpers/http.helper";
import { toast } from "sonner";
import DropdownProvinces from "@/components/dropdown-provinces";
import { useLocationContext } from "@/components/location-context";
import DropdownRegencies from "@/components/dropdown-regencies";

export default function UstadzBaru() {
  const [fileUploadSk, setFileUploadSk] = useState(null);
  const [fileFotoUstadz, setFileFotoUstadz] = useState(null);
  const { idProvince } = useLocationContext();

  const schemaUstadz = z.object({
    gelar_depan: z.string({ message: "Masukkan gelar depan" }),
    nama_lengkap: z.string({ message: "Masukkan nama lengkap" }),
    gelar_belakang: z.string({
      message: "Masukkan satuan pendidikan",
    }),
    npk: z.string({
      message: "Masukkan npk",
    }),
    nik: z.string({
      message: "Masukkan nik",
    }),
    nuptk: z.string({
      message: "Masukkan nuptk",
    }),
    no_handphone: z.string({
      message: "Masukkan no_handphone",
    }),
    email: z.string({
      message: "Masukkan email",
    }),
    npwp: z.string({
      message: "Masukkan npwp",
    }),
    tempat_lahir: z.string({
      message: "Masukkan tempat lahir",
    }),
    tanggal_lahir: z.string({
      message: "Masukkan tanggal lahir",
    }),
    agama: z.string({
      message: "Masukkan agama",
    }),
    golongan_darah: z.string({
      message: "Masukkan golongan darah",
    }),
    pendidikan_terakhir: z.string({
      message: "Masukkan pendidikan terakhir",
    }),
    prodi_terakhir: z.string({
      message: "Masukkan prodi terakhir",
    }),
    tanggal_akta_pendirian: z.string({
      message: "Masukkan tanggal ijazah",
    }),
    status_tempat_tinggal: z.string({
      message: "Masukkan status tempat tinggal",
    }),
    provinsi: z.string({
      message: "Masukkan provinsi",
    }),
    kabupaten: z.string({
      message: "Masukkan kabupaten",
    }),
    kecamatan: z.string({
      message: "Masukkan kecamatan",
    }),
    kelurahan_atau_desa: z.string({
      message: "Masukkan kelurahan atau desa",
    }),
    rt: z.string({
      message: "Masukkan rt",
    }),
    rw: z.string({
      message: "Masukkan rw",
    }),
    alamat: z.string({
      message: "Masukkan alamat",
    }),
    kode_pos: z.string({
      message: "Masukkan kode_pos",
    }),
    transportasi_ke_pontren: z.string({
      message: "Masukkan transportasi ke pontren",
    }),
    jarak_tempat_tinggal_pontren: z.string({
      message: "Masukkan jarak tempat tinggal pontren",
    }),
    waktu_tempuh: z.string({
      message: "Masukkan waktu tempuh",
    }),
    nama_ibu_kandung: z.string({
      message: "Masukkan nama ibu kandung",
    }),
    nomor_kk: z.string({
      message: "Masukkan nomor kk",
    }),
    tanggal_efektif: z.string({
      message: "Masukkan tanggal efektif",
    }),
    fungsi_atau_jabatan: z.string({
      message: "Masukkan fungsi atau jabatan",
    }),
    tmt_ustadz_atau_tanggal_sk_ptk: z.string({
      message: "Masukkan tanggal SK PTK",
    }),
    status_penugasan: z.string({
      message: "Masukkan status penugasan",
    }),
    instansi_yang_mengeluarkan_sk: z.string({
      message: "Masukkan instansi yang mengeluarkan SK",
    }),
    no_sk: z.string({
      message: "Masukkan no sk",
    }),
    tanggal_sk: z.string({
      message: "Masukkan tanggal sk",
    }),
    jenis_sk: z.string({
      message: "Masukkan jenis sk",
    }),
  });

  const ustadzForm = useForm({
    resolver: zodResolver(schemaUstadz),
    defaultValues: {
      gelar_depan: "",
      nama_lengkap: "",
      gelar_belakang: "",
      npk: "",
      nik: "",
      nuptk: "",
      no_handphone: "",
      email: "",
      npwp: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      agama: "",
      golongan_darah: "",
      pendidikan_terakhir: "",
      prodi_terakhir: "",
      tanggal_akta_pendirian: "",
      status_tempat_tinggal: "",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan_atau_desa: "",
    },
  });

  const queryClient = useQueryClient();

  const postUstadzBaru = useMutation({
    mutationFn: async (values) => {
      const data = new FormData();
      data.append("foto_profil", fileFotoSantri);
      data.append("tanggal_masuk", values.tanggal_masuk);
      data.append("tingkat_kelas", values.tingkat_kelas);
      data.append("nama_lengkap", values.nama_lengkap);
      data.append("kewarganegaraan", values.kewarganegaraan);
      data.append("nik", values.nik);
      data.append("nisn", values.nisn);
      data.append("jenis_kelamin", selectedJenisKelaminValue);
      data.append("tempat_lahir", values.tempat_lahir);
      data.append("tanggal_lahir", values.tanggal_lahir);
      data.append("agama", values.agama);
      data.append("no_handphone", values.no_handphone);
      data.append("ayah_kandung", values.ayah_kandung);
      data.append("status_ayah_kandung", values.status_ayah_kandung);
      data.append("ibu_kandung", values.ibu_kandung);
      data.append("status_ibu_kandung", values.status_ibu_kandung);
      data.append("wali", values.wali);

      return http().post(`/ustadz`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ustadz"] });
      toast("Ustadz berhasil ditambahkan", {
        description: new Date().toLocaleString(),
      });
      router.push("/daftar-ustadz");
    },
    onError: (err) => {
      toast(err.response.data.message, {
        description: new Date().toLocaleString(),
      });
    },
  });

  const onSubmit = (data) => {
    postUstadzBaru.mutate(data);
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
          <p className="leading-7 rounded-md text-xs">
            Kolom dengan tanda (*) merupakan kolom yang wajib diisi, sedangkan
            kolom tanpa tanda (*) merupakan kolom opsional yang tidak wajib
            diisi.
          </p>

          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Data Diri
          </h4>

          <Separator className="mt-5" />

          <Form {...ustadzForm}>
            <form
              onSubmit={ustadzForm.handleSubmit(onSubmit)}
              className="space-y-5 mt-5"
            >
              <div className="flex gap-10 items-center w-full">
                <UploadFotoUstadz
                  fileFotoUstadz={fileFotoUstadz}
                  setFileFotoUstadz={setFileFotoUstadz}
                />

                <div className="grid grid-cols-3 gap-5 w-full">
                  <div>
                    <div>
                      <FormField
                        control={ustadzForm.control}
                        name="gelar_depan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gelar Depan</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Masukkan Gelar Depan"
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
                        control={ustadzForm.control}
                        name="nama_lengkap"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Masukkan Nama Lengkap"
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
                        control={ustadzForm.control}
                        name="gelar_belakang"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gelar Belakang</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Masukkan Gelar Belakang"
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

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Status Kepegawaian
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <RadioGroup defaultValue="comfortable">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pns" id="pns" />
                        <Label htmlFor="pns">PNS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-pns" id="non-pns" />
                        <Label htmlFor="non-pns">Non PNS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pppk" id="pppk" />
                        <Label htmlFor="pppk">PPPK</Label>
                      </div>
                    </div>

                    <div></div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="npk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NPK</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan NPK"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={ustadzForm.control}
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="nuptk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NUPTK</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan NUPTK"
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
                    control={ustadzForm.control}
                    name="no_handphone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No Handphone</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan No Handphone"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Masukkan Email"
                            required
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div>
                  <FormField
                    control={ustadzForm.control}
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
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Jenis Kelamin
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <RadioGroup defaultValue="comfortable">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="laki_laki" id="pns" />
                        <Label htmlFor="laki-laki">Laki-laki</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="perempuan" id="non-pns" />
                        <Label htmlFor="perempuan">Perempuan</Label>
                      </div>
                    </div>

                    <div></div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="tempat_lahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempat Lahir</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
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
                    control={ustadzForm.control}
                    name="tanggal_lahir"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel
                          className={fieldState.error ? "text-red-500" : ""}
                        >
                          Tanggal Lahir
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
                                  <span>Pilih Tanggal Lahir</span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="agama"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Agama</FormLabel>
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
                              <SelectValue placeholder="Agama" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Agama</SelectLabel>
                                <SelectItem value="Islam">Islam</SelectItem>
                                <SelectItem value="Kristen">Kristen</SelectItem>
                                <SelectItem value="Hindu">Hindu</SelectItem>
                                <SelectItem value="Buddha">Buddha</SelectItem>
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
                    control={ustadzForm.control}
                    name="golongan_darah"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Golongan Darah</FormLabel>
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
                              <SelectValue placeholder="Golongan Darah" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Golongan Darah</SelectLabel>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="B">B</SelectItem>
                                <SelectItem value="AB">AB</SelectItem>
                                <SelectItem value="O">O</SelectItem>
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
                    control={ustadzForm.control}
                    name="pendidikan_terakhir"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Pendidikan Terakhir</FormLabel>
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
                              <SelectValue placeholder="Pendidikan Terakhir" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Pendidikan Terakhir</SelectLabel>
                                <SelectItem value="SD">SD</SelectItem>
                                <SelectItem value="SMP">SMP</SelectItem>
                                <SelectItem value="SMA">SMA</SelectItem>
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
                    control={ustadzForm.control}
                    name="prodi_terakhir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prodi Terakhir</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Masukkan Prodi Terakhir"
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
                    control={ustadzForm.control}
                    name="tanggal_akta_pendirian"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel
                          className={fieldState.error ? "text-red-500" : ""}
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
                                  !field.value && "text-muted-foreground",
                                  fieldState.error && "border-red-500"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pilih Tanggal Akta Pendirian</span>
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

                <div></div>
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Informasi Tempat Tinggal
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="status_tempat_tinggal"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Status Tempat Tinggal</FormLabel>
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
                              <SelectValue placeholder="Status Tempat Tinggal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status Tempat Tinggal</SelectLabel>
                                <SelectItem value="milik_sendiri">
                                  Milik Sendiri
                                </SelectItem>
                                <SelectItem value="rumah_orang_tua">
                                  Rumah Orang Tua
                                </SelectItem>
                                <SelectItem value="rumah_saudara">
                                  Rumah Saudara
                                </SelectItem>
                                <SelectItem value="rumah_dinas">
                                  Rumah Dinas
                                </SelectItem>
                                <SelectItem value="sewa_atau_kontrak">
                                  Sewa Atau Kontrak
                                </SelectItem>
                                <SelectItem value="lainnya">Lainnya</SelectItem>
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
                    control={ustadzForm.control}
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
                  <FormField
                    control={ustadzForm.control}
                    name="kabupaten"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Kabupaten / Kota</FormLabel>
                        <DropdownRegencies
                          field={field}
                          fieldState={fieldState}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <FormField
                    control={ustadzForm.control}
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
                                "w-full",
                                fieldState.error
                                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                  : ""
                              )}
                            >
                              <SelectValue placeholder="Provinsi" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Kecamatan</SelectLabel>
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
                    control={ustadzForm.control}
                    name="kelurahan_atau_desa"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Kelurahan / Desa</FormLabel>
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
                              <SelectValue placeholder="Kelurahan / Desa" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Kelurahan / Desa</SelectLabel>
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
                    control={ustadzForm.control}
                    name="rt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RT</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan RT"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="rw"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RW</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan RW"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <FormField
                  control={ustadzForm.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Masukkan Alamat" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="kode_pos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kode POS</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan Kode POS"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="transportasi_ke_pontren"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Transportasi Ke Pontren</FormLabel>
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
                              <SelectValue placeholder="Transportasi Ke Pontren" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Transportasi Ke Pontren
                                </SelectLabel>
                                <SelectItem value="jalan_kaki">
                                  Jalan Kaki
                                </SelectItem>
                                <SelectItem value="sepeda">Sepeda</SelectItem>
                                <SelectItem value="sepeda_motor">
                                  Sepeda Motor
                                </SelectItem>
                                <SelectItem value="mobil_pribadi">
                                  Mobil Pribadi
                                </SelectItem>
                                <SelectItem value="antar_jemput_sekolah">
                                  Antar Jemput Sekolah
                                </SelectItem>
                                <SelectItem value="angkutan_umum">
                                  Angkutan Umum
                                </SelectItem>
                                <SelectItem value="perahu_atau_sampan">
                                  Perahu Atau Sampan
                                </SelectItem>
                                <SelectItem value="lainnya">Lainnya</SelectItem>
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
                    control={ustadzForm.control}
                    name="jarak_tempat_tinggal_pontren"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Jarak Tempat Tinggal Pontren</FormLabel>
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
                              <SelectValue placeholder="Jarak Tempat Tinggal Pontren" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Transportasi Ke Pontren
                                </SelectLabel>
                                <SelectItem value="kurang_dari_5_km">
                                  Kurang dari 5 km
                                </SelectItem>
                                <SelectItem value="antara_5_sampai_10_km">
                                  Antara 5 sampai 10 km
                                </SelectItem>
                                <SelectItem value="antara_11_sampai_20_km">
                                  Antara 11 sampai 20 km
                                </SelectItem>
                                <SelectItem value="antata_21_sampai_30_km">
                                  Antara 21 sampai 30 km
                                </SelectItem>
                                <SelectItem value="lebih_dari_30_km">
                                  Lebih dari 30 km
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
                    control={ustadzForm.control}
                    name="waktu_tempuh"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Waktu Tempuh</FormLabel>
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
                              <SelectValue placeholder="Waktu Tempuh" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Waktu Tempuh</SelectLabel>
                                <SelectItem value="1_sampai_10_menit">
                                  1 sampai 10 menit
                                </SelectItem>
                                <SelectItem value="10_sampai_19_menit">
                                  10 sampai 19 menit
                                </SelectItem>
                                <SelectItem value="20_sampai_29_menit">
                                  20 sampai 29 menit
                                </SelectItem>
                                <SelectItem value="mobil_pribadi">
                                  Mobil Pribadi
                                </SelectItem>
                                <SelectItem value="antar_jemput_sekolah">
                                  Antar Jemput Sekolah
                                </SelectItem>
                                <SelectItem value="angkutan_umum">
                                  Angkutan Umum
                                </SelectItem>
                                <SelectItem value="perahu_atau_sampan">
                                  Perahu Atau Sampan
                                </SelectItem>
                                <SelectItem value="lainnya">Lainnya</SelectItem>
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
                Informasi Keluarga
              </h4>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="nama_ibu_kandung"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Ibu Kandung</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nama Ibu Kandung"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Status Perkawinan
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <RadioGroup defaultValue="comfortable">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="kawin" id="kawin" />
                        <Label htmlFor="kawin">Kawin</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="belum_kawin" id="belum_kawin" />
                        <Label htmlFor="belum_kawin">Belum Kawin</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="duda_atau_janda"
                          id="duda_atau_janda"
                        />
                        <Label htmlFor="duda_atau_janda">Duda/Janda</Label>
                      </div>
                    </div>

                    <div></div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div>
                    <FormField
                      control={ustadzForm.control}
                      name="nomor_kk"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor KK</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Nomor KK"
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

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Penugasan
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="tanggal_efektif"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel
                          className={fieldState.error ? "text-red-500" : ""}
                        >
                          Tanggal Efektif
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
                                  <span>Pilih Tanggal Akta Pendirian</span>
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
                    control={ustadzForm.control}
                    name="fungsi_atau_jabatan"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Fungsi Atau Jabatan</FormLabel>
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
                              <SelectValue placeholder="Fungsi Atau Jabatan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Fungsi Atau Jabatan</SelectLabel>
                                <SelectItem value="ustadz">Ustadz</SelectItem>
                                <SelectItem value="dosen">Dosen</SelectItem>
                                <SelectItem value="non_dosen">
                                  Non Dosen
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="tmt_ustadz_atau_tanggal_sk_ptk"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel
                          className={fieldState.error ? "text-red-500" : ""}
                        >
                          TMT Ustadz / Tanggal SK PTK
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
                                  <span>TMT Ustadz / Tanggal SK PTK</span>
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
                <div></div>
              </div>

              <div className="grid-cols-2 md:grid-cols-2 grid gap-5">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="status_penugasan"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Status Penugasan</FormLabel>
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
                              <SelectValue placeholder="Status Penugasan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status Penugasan</SelectLabel>
                                <SelectItem value="ustadz">Ustadz</SelectItem>
                                <SelectItem value="dosen">Dosen</SelectItem>
                                <SelectItem value="non_dosen">
                                  Non Dosen
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
                    control={ustadzForm.control}
                    name="instansi_yang_mengeluarkan_sk"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Instansi Yang Mengeluarkan SK</FormLabel>
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
                              <SelectValue placeholder="Instansi Yang Mengeluarkan SK" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Instansi Yang Mengeluarkan SK
                                </SelectLabel>
                                <SelectItem value="ustadz">Ustadz</SelectItem>
                                <SelectItem value="dosen">Dosen</SelectItem>
                                <SelectItem value="non_dosen">
                                  Non Dosen
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid-cols-2 md:grid-cols-2 grid gap-5">
                <div>
                  <FormField
                    control={ustadzForm.control}
                    name="no_sk"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>No SK</FormLabel>
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
                              <SelectValue placeholder="No SK" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>No SK</SelectLabel>
                                <SelectItem value="ustadz">Ustadz</SelectItem>
                                <SelectItem value="dosen">Dosen</SelectItem>
                                <SelectItem value="non_dosen">
                                  Non Dosen
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
                    control={ustadzForm.control}
                    name="tanggal_sk"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel
                          className={fieldState.error ? "text-red-500" : ""}
                        >
                          Tanggal SK
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
                                  <span>Pilih Tanggal SK</span>
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

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div>
                    <FormField
                      control={ustadzForm.control}
                      name="jenis_sk"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>Jenis SK</FormLabel>
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
                                <SelectValue placeholder="Jenis SK" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Jenis SK</SelectLabel>
                                  <SelectItem value="sk_cpns">
                                    SK CPNS
                                  </SelectItem>
                                  <SelectItem value="sk_kenaikan_pangkat_pns_reguler">
                                    SK Kenaikan Pangkat PNS (Reguler)
                                  </SelectItem>
                                  <SelectItem value="sk_kenaikan_pangkat_pns_pilihan">
                                    SK Kenaikan Pangkat PNS (Pilihan)
                                  </SelectItem>
                                  <SelectItem value="sk_non_pns">
                                    SK Non PNS
                                  </SelectItem>
                                  <SelectItem value="sk_yayasan">
                                    SK Yayasan
                                  </SelectItem>
                                  <SelectItem value="sk_pppk">
                                    SK PPPK
                                  </SelectItem>
                                  <SelectItem value="sk_pensiun">
                                    SK Pensiun
                                  </SelectItem>
                                  <SelectItem value="sk_ptk">SK PTK</SelectItem>
                                  <SelectItem value="sk_pengangkatan_pns">
                                    SK Pengangkatan PNS
                                  </SelectItem>
                                  <SelectItem value="sk_pengangkatan_pppk">
                                    SK Pengangkatan PPPK
                                  </SelectItem>
                                  <SelectItem value="sk_pengangkatan">
                                    SK Pengangkatan
                                  </SelectItem>
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

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <UploadFileSk
                    fileUploadSk={fileUploadSk}
                    setFileUploadSk={setFileUploadSk}
                  />
                </div>
                <div></div>
              </div>

              <Button type="submit" className="uppercase cursor-pointer mt-5">
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Sidebar>
  );
}
