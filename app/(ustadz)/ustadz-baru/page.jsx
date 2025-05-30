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
import RoundedUploadButton from "@/components/profile-photo-uploader";
import { PdfUploader } from "@/components/pdf-uploader";
import { ImagePlus } from "lucide-react";
import { CloudUpload } from "lucide-react";

export default function UstadzBaru() {
  const [tahunBerdiriHijriah, setTahunBerdiriHijriah] = useState(null);
  const [uploadFotoSk, setUploadFotoSk] = useState(null);

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
          <p className="leading-7 rounded-md text-xs">
            Kolom dengan tanda (*) merupakan kolom yang wajib diisi, sedangkan
            kolom tanpa tanda (*) merupakan kolom opsional yang tidak wajib
            diisi.
          </p>

          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Data Diri
          </h4>

          <Separator className="mt-5" />

          <Form {...identitasForm}>
            <form
              onSubmit={identitasForm.handleSubmit(onSubmit)}
              className="space-y-5 mt-5"
            >
              <div className="flex gap-10 items-center w-full">
                <RoundedUploadButton />

                <div className="grid grid-cols-3 gap-5 w-full">
                  <div>
                    <div>
                      <FormField
                        control={identitasForm.control}
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
                        control={identitasForm.control}
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
                        control={identitasForm.control}
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
                    control={identitasForm.control}
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
                    control={identitasForm.control}
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
                    control={identitasForm.control}
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
                    control={identitasForm.control}
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
                    control={identitasForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan Email"
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
                    control={identitasForm.control}
                    name="tempat_lahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempat Lahir</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
                    control={identitasForm.control}
                    name="golongan_darah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Golongan Darah</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
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
                    control={identitasForm.control}
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
                    control={identitasForm.control}
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
                    control={identitasForm.control}
                    name="tanggal_ijazah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Ijazah</FormLabel>
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
                                  <span>Pilih Tanggal Ijazah</span>
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

                <div></div>
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Informasi Tempat Tinggal
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="status_tempat_tinggal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Tempat Tinggal</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
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
                    control={identitasForm.control}
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
                    name="kabupaten"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kabupaten / Kota</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Kabupaten / Kota" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Kabupaten / Kota</SelectLabel>
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
                    control={identitasForm.control}
                    name="kecamatan"
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
                    control={identitasForm.control}
                    name="kelurahan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kelurahan / Desa</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
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
                    control={identitasForm.control}
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
                    control={identitasForm.control}
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
                  control={identitasForm.control}
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
                    control={identitasForm.control}
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
                    control={identitasForm.control}
                    name="transportasi_ke_pontren"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transportasi Ke Pontren</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
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
                    control={identitasForm.control}
                    name="jarak_tempat_tinggal_pontren"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jarak Tempat Tinggal Pontren</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
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
                    control={identitasForm.control}
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
                    control={identitasForm.control}
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
                      control={identitasForm.control}
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
                    control={identitasForm.control}
                    name="tanggal_efektif"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Efektif</FormLabel>
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
                                  <span>Pilih Tanggal Efektif</span>
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
                    name="fungsi_atau_jabatan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fungsi Atau Jabatan</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
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
                    control={identitasForm.control}
                    name="tanggal_efektif"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TMT Ustadz / Tanggal SK PTK</FormLabel>
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
                                  <span>TMT Ustadz / Tanggal SK PTK</span>
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
                <div></div>
              </div>

              <div className="grid-cols-2 md:grid-cols-2 grid gap-5">
                <div>
                  <FormField
                    control={identitasForm.control}
                    name="status_penugasan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Penugasan</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
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
                    control={identitasForm.control}
                    name="instansi_yang_mengeluarkan_sk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instansi Yang Mengeluarkan SK</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
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
                    control={identitasForm.control}
                    name="no_sk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No SK</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full">
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
                    control={identitasForm.control}
                    name="tanggal_sk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal SK</FormLabel>
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
                                  <span>Tanggal SK</span>
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
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div>
                    <FormField
                      control={identitasForm.control}
                      name="jenis_sk"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jenis SK</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <SelectTrigger className="w-full">
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
                  {" "}
                  <div className="space-y-2">
                    <Label
                      htmlFor="uploadFotoSk"
                      className="text-base font-medium"
                    >
                      Foto Papan Nama <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative border border-dashed rounded-md p-1 h-[200px] flex flex-col items-center justify-center">
                      {uploadFotoSk ? (
                        <>
                          <div className="absolute top-2 right-2 z-10 flex space-x-1">
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                              onClick={() => handleRemove(setUploadFotoSk)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="relative w-full h-full">
                            <Image
                              src={uploadFotoSk.url || "/placeholder.svg"}
                              alt="Foto Papan Nama"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </>
                      ) : (
                        <label
                          htmlFor="uploadFotoSk"
                          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                        >
                          <CloudUpload className="h-10 w-10 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">
                            Upload File SK
                          </span>
                          <span className="mt-2 text-sm text-gray-500">
                            maks. 2MB bertipe Pdf jpg png
                          </span>
                          <input
                            id="uploadFotoSk"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileChange(e, setUploadFotoSk, "Papan_Nama")
                            }
                          />
                        </label>
                      )}
                    </div>
                    {uploadFotoSk && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Upload className="h-4 w-4 mr-1" />
                        <span className="truncate">{uploadFotoSk.name}</span>
                      </div>
                    )}
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
