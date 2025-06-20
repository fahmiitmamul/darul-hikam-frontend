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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import UploadFotoSantri from "@/components/upload-foto-santri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/helpers/http.helper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function SantriBaru() {
  const [isNoHandphoneChecked, setIsNoHandphoneChecked] = useState(false);
  const [isNikChecked, setIsNikChecked] = useState(false);
  const [isNisnChecked, setIsNisnChecked] = useState(false);
  const [fileFotoSantri, setFileFotoSantri] = useState(null);
  const [selectedJenisKelaminValue, setSelectedJenisKelaminValue] =
    useState(null);

  const handleValueChange = (value) => {
    setSelectedJenisKelaminValue(value);
    console.log("Selected value:", value);
  };

  const schemaSantriBaru = z.object({
    tanggal_masuk: z.date({
      message: "Masukkan tanggal masuk",
    }),
    tingkat_kelas: z
      .string({ message: "Masukkan tingkat kelas" })
      .min(1, "Harap diisi"),
    nama_lengkap: z
      .string({
        message: "Masukkan nama lengkap",
      })
      .min(1, "Harap diisi"),
    kewarganegaraan: z
      .string({
        message: "Masukkan kewarganegaraan",
      })
      .min(1, "Harap diisi"),
    nik: z
      .string({
        message: "Masukkan nik",
      })
      .min(1, "Harap diisi"),
    kewarganegaraan: z
      .string({
        message: "Masukkan kewarganegaraan",
      })
      .min(1, "Harap diisi"),
    nisn: z
      .string({
        message: "Masukkan nisn",
      })
      .min(1, "Harap diisi"),
    tempat_lahir: z
      .string({
        message: "Masukkan tempat lahir",
      })
      .min(1, "Harap diisi"),
    tanggal_lahir: z.date({
      message: "Masukkan tanggal lahir",
    }),
    agama: z
      .string({
        message: "Masukkan agama",
      })
      .min(1, "Harap diisi"),
    no_handphone: z
      .string({
        message: "Masukkan no handphone",
      })
      .min(1, "Harap diisi"),
    ayah_kandung: z
      .string({
        message: "Masukkan ayah kandung",
      })
      .min(1, "Harap diisi"),
    status_ayah_kandung: z
      .string({
        message: "Masukkan status ayah kandung",
      })
      .min(1, "Harap diisi"),
    ibu_kandung: z
      .string({
        message: "Masukkan ibu kandung",
      })
      .min(1, "Harap diisi"),
    status_ibu_kandung: z
      .string({
        message: "Masukkan status ibu kandung",
      })
      .min(1, "Harap diisi"),
    wali: z
      .string({
        message: "Masukkan wali",
      })
      .min(1, "Harap diisi"),
  });

  const santriBaruForm = useForm({
    resolver: zodResolver(schemaSantriBaru),
    defaultValues: {
      tanggal_masuk: "",
      tingkat_kelas: "",
      nama_lengkap: "",
      kewarganegaraan: "",
      nik: "",
      nisn: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      agama: "",
      no_handphone: "",
      ayah_kandung: "",
      status_ayah_kandung: "",
      ibu_kandung: "",
      status_ibu_kandung: "",
      wali: "",
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const postSantriBaru = useMutation({
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

      return http().post(`/santri`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["santri"] });
      toast("Santri berhasil ditambahkan", {
        description: new Date().toLocaleString(),
      });
      router.push("/daftar-santri");
    },
    onError: (err) => {
      toast(err.response.data.message, {
        description: new Date().toLocaleString(),
      });
    },
  });

  const onSubmit = (data) => {
    postSantriBaru.mutate(data);
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

          <Form {...santriBaruForm}>
            <form
              onSubmit={santriBaruForm.handleSubmit(onSubmit)}
              className="space-y-5 mt-5"
            >
              <UploadFotoSantri
                fileFotoSantri={fileFotoSantri}
                setFileFotoSantri={setFileFotoSantri}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={santriBaruForm.control}
                    name="tanggal_masuk"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel
                          className={fieldState.error ? "text-red-500" : ""}
                        >
                          Tanggal Masuk
                        </FormLabel>
                        <FormControl>
                          <Flatpickr
                            value={field.value}
                            onChange={([date]) => field.onChange(date)}
                            options={{
                              dateFormat: "Y-m-d",
                              allowInput: true,
                            }}
                            className={cn(
                              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                              "ring-offset-background placeholder:text-muted-foreground",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              fieldState.error && "border-red-500"
                            )}
                            placeholder="Pilih tanggal"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={santriBaruForm.control}
                    name="tingkat_kelas"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Tingkat Kelas</FormLabel>
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
                              <SelectValue placeholder="Tingkat Kelas" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tingkat Kelas</SelectLabel>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="7">7</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="9">9</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="11">11</SelectItem>
                                <SelectItem value="12">12</SelectItem>
                                <SelectItem value="kelompok_a">
                                  Kelompok A
                                </SelectItem>
                                <SelectItem value="kelompok_b">
                                  Kelompok B
                                </SelectItem>
                                <SelectItem value="tidak_kelompok">
                                  Tidak Kelompok
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

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Keterangan Calon Santri
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <div>
                  <FormField
                    control={santriBaruForm.control}
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
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={santriBaruForm.control}
                    name="kewarganegaraan"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Kewarganegaraan</FormLabel>
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
                              <SelectValue placeholder="Kewarganegaraan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Kewarganegaraan</SelectLabel>
                                <SelectItem value="wni">WNI</SelectItem>
                                <SelectItem value="wna">WNA</SelectItem>
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
                    control={santriBaruForm.control}
                    name="nik"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIK</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan NIK"
                            {...field}
                            disabled={isNikChecked}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nik"
                      onClick={() => {
                        setIsNikChecked(!isNikChecked);
                      }}
                    />
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
                    control={santriBaruForm.control}
                    name="nisn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NISN</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan NISN"
                            {...field}
                            disabled={isNisnChecked}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nisn"
                      onClick={() => setIsNisnChecked(!isNisnChecked)}
                    />
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
                <RadioGroup
                  value={selectedJenisKelaminValue}
                  onValueChange={handleValueChange}
                  defaultValue="comfortable"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="laki_laki" id="laki-laki" />
                        <Label htmlFor="laki-laki">Laki-laki</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="perempuan" id="perempuan" />
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
                    control={santriBaruForm.control}
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
                    control={santriBaruForm.control}
                    name="tanggal_lahir"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel
                          className={fieldState.error ? "text-red-500" : ""}
                        >
                          Tanggal Lahir
                        </FormLabel>
                        <FormControl>
                          <Flatpickr
                            value={field.value}
                            onChange={([date]) => field.onChange(date)}
                            options={{
                              dateFormat: "Y-m-d",
                              allowInput: true,
                            }}
                            className={cn(
                              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                              "ring-offset-background placeholder:text-muted-foreground",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              fieldState.error && "border-red-500"
                            )}
                            placeholder="Pilih tanggal"
                          />
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
                    control={santriBaruForm.control}
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
                                "w-full text-left border rounded-md p-2",
                                fieldState.error && "border-red-500"
                              )}
                            >
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
                  <Checkbox
                    id="no_handphone"
                    onClick={() => {
                      setIsNoHandphoneChecked(!isNoHandphoneChecked);
                    }}
                  />
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
                    control={santriBaruForm.control}
                    name="no_handphone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No Handphone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan No Handphone"
                            {...field}
                            disabled={isNoHandphoneChecked}
                          />
                        </FormControl>
                        <FormDescription>Contoh : 08123456789</FormDescription>
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
                    control={santriBaruForm.control}
                    name="ayah_kandung"
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
                  control={santriBaruForm.control}
                  name="status_ayah_kandung"
                  render={({ field, fieldState }) => (
                    <FormItem>
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
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="masih_hidup">
                                Masih Hidup
                              </SelectItem>
                              <SelectItem value="sudah_meninggal">
                                Sudah Meninggal
                              </SelectItem>
                              <SelectItem value="tidak_diketahui">
                                Tidak Diketahui
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
                    control={santriBaruForm.control}
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
                  control={santriBaruForm.control}
                  name="status_ibu_kandung"
                  render={({ field, fieldState }) => (
                    <FormItem>
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
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="masih_hidup">
                                Masih Hidup
                              </SelectItem>
                              <SelectItem value="sudah_meninggal">
                                Sudah Meninggal
                              </SelectItem>
                              <SelectItem value="tidak_diketahui">
                                Tidak Diketahui
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
                  control={santriBaruForm.control}
                  name="wali"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Wali</FormLabel>
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
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="sama_dengan_ayah_kandung">
                                Sama dengan ayah kandung
                              </SelectItem>
                              <SelectItem value="sama_dengan_ibu_kandung">
                                Sama dengan ibu kandung
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
