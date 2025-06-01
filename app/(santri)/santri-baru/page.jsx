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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function SantriBaru() {
  const [tahunBerdiriHijriah, setTahunBerdiriHijriah] = useState(null);
  const [isNoHandphoneChecked, setIsNoHandphoneChecked] = useState(false);
  const [isNikChecked, setIsNikChecked] = useState(false);
  const [isNisnChecked, setIsNisnChecked] = useState(false);

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

  const santriBaruForm = useForm({
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

          <Form {...santriBaruForm}>
            <form
              onSubmit={santriBaruForm.handleSubmit(onSubmit)}
              className="space-y-5 mt-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <FormField
                    control={santriBaruForm.control}
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
                    control={santriBaruForm.control}
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
                    render={({ field }) => (
                      <div>
                        <FormField
                          control={santriBaruForm.control}
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
                    control={santriBaruForm.control}
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
                  control={santriBaruForm.control}
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wali</FormLabel>
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
