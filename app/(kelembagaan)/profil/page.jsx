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
import { useState } from "react";

export default function Profil() {
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
            <TabsList className="grid w-full grid-cols-4">
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
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Identitas Lembaga
              </h4>

              <Form {...identitasForm}>
                <form
                  onSubmit={identitasForm.handleSubmit(onSubmit)}
                  className="space-y-5 mt-5"
                >
                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="grid grid-cols-2 gap-5">
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

                  <div className="grid grid-cols-2 gap-5">
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
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Sidebar>
  );
}
