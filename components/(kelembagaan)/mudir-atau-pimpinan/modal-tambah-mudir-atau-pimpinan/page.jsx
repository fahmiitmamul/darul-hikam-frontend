"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function ModalTambahMudirAtauPimpinan({
  openDialogEditMudirAtauPimpinan,
  setOpenDialogEditMudirAtauPimpinan,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  const mudirAtauPimpinanSchema = z.object({
    nama_lengkap: z.string({ message: "Masukkan NSPP" }),
    nik: z.string({ message: "Masukkan NIK" }),
    gelar_depan: z.string({
      message: "Masukkan gelar depan",
    }),
    gelar_belakang: z.string({
      message: "Masukkan gelar belakang",
    }),
    jenis_kelamin: z.string({
      message: "Masukkan jenis kelamin",
    }),
    status_kepegawaian: z.string({
      message: "Masukkan status kepegawaian",
    }),
    pendidikan_terakhir: z.string({
      message: "Masukkan pendidikan terakhir",
    }),
    lama_pendidikan_ponpes: z.string({
      message: "Masukkan lama pendidikan ponpes",
    }),
    lama_pendidikan_lainnya: z.string({
      message: "Masukkan lama pendidikan lainnya",
    }),
    kompetensi: z.string({
      message: "Masukkan kompetensi",
    }),
    no_handphone: z.string({
      message: "Masukkan no handphone",
    }),
    email: z.string({
      message: "Masukkan email",
    }),
    status_keaktifan: z.string({
      message: "Masukkan status keaktifan",
    }),
    kewarganegaraan: z.string({
      message: "Masukkan kewarganegaraan",
    }),
  });

  const mudirAtauPimpinanForm = useForm({
    resolver: zodResolver(mudirAtauPimpinanSchema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div>
      <Sheet
        open={openDialogEditMudirAtauPimpinan}
        onOpenChange={setOpenDialogEditMudirAtauPimpinan}
      >
        <SheetTrigger asChild>
          <Button className="cursor-pointer uppercase">
            <Plus />
            Tambah
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Tambah Mudir Atau Pimpinan</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-1 gap-5">
            <Form {...mudirAtauPimpinanForm}>
              <form onSubmit={mudirAtauPimpinanForm.handleSubmit(onSubmit)}>
                <ScrollArea className="h-[540px]">
                  <div className="grid grid-cols-1 gap-5 px-5">
                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="no_sk_izin_operasional"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                  >
                                    {value
                                      ? frameworks.find(
                                          (framework) =>
                                            framework.value === value
                                        )?.label
                                      : "Nama Lengkap"}
                                    <ChevronsUpDown className="opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput
                                      placeholder="Nama Lengkap"
                                      className="h-9"
                                    />
                                    <CommandList>
                                      <CommandEmpty>
                                        No framework found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {frameworks.map((framework) => (
                                          <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                              setValue(
                                                currentValue === value
                                                  ? ""
                                                  : currentValue
                                              );
                                              setOpen(false);
                                            }}
                                          >
                                            {framework.label}
                                            <Check
                                              className={cn(
                                                "ml-auto",
                                                value === framework.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
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

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="gelar_depan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gelar Depan</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Gelar Depan"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="gelar_belakang"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gelar Belakang</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Gelar Belakang"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="jenis_kelamin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Jenis Kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Jenis Kelamin</SelectLabel>
                                    <SelectItem value="laki-laki">
                                      Laki - Laki
                                    </SelectItem>
                                    <SelectItem value="perempuan">
                                      Perempuan
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
                        control={mudirAtauPimpinanForm.control}
                        name="status_kepegawaian"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status Kepegawaian</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Status Kepegawaian" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Status Kepegawaian
                                    </SelectLabel>
                                    <SelectItem value="pegawai_kontrak">
                                      Pegawai Kontrak
                                    </SelectItem>
                                    <SelectItem value="pegawai_tetap">
                                      Pegawai Tetap
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
                        control={mudirAtauPimpinanForm.control}
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
                                    <SelectLabel>
                                      Pendidikan Terakhir
                                    </SelectLabel>
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

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="lama_pendidikan_ponpes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lama Pendidikan Ponpes</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Lama Pendidikan Ponpes" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Lama Pendidikan Ponpes
                                    </SelectLabel>
                                    <SelectItem value="kurang_dari_1_tahun">
                                      Kurang dari 1 tahun
                                    </SelectItem>
                                    <SelectItem value="antara_1_sampai_3_tahun">
                                      Antara 1 Sampai 3 Tahun
                                    </SelectItem>
                                    <SelectItem value="antara_4_sampai_5_tahun">
                                      Antara 4 Sampai 5 Tahun
                                    </SelectItem>
                                    <SelectItem value="lebih_dari_5_tahun">
                                      Lebih dari 5 Tahun
                                    </SelectItem>
                                    <SelectItem value="tidak_pernah">
                                      Tidak Pernah
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
                        control={mudirAtauPimpinanForm.control}
                        name="lama_pendidikan_lainnya"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lama Pendidikan Lainnya</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Lama Pendidikan Lainnya" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Lama Pendidikan Lainnya
                                    </SelectLabel>
                                    <SelectItem value="kurang_dari_1_tahun">
                                      Kurang dari 1 tahun
                                    </SelectItem>
                                    <SelectItem value="antara_1_sampai_3_tahun">
                                      Antara 1 Sampai 3 Tahun
                                    </SelectItem>
                                    <SelectItem value="antara_4_sampai_5_tahun">
                                      Antara 4 Sampai 5 Tahun
                                    </SelectItem>
                                    <SelectItem value="lebih_dari_5_tahun">
                                      Lebih dari 5 Tahun
                                    </SelectItem>
                                    <SelectItem value="tidak_pernah">
                                      Tidak Pernah
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
                        control={mudirAtauPimpinanForm.control}
                        name="kompetensi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kompetensi</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Kompetensi" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Kompetensi</SelectLabel>
                                    <SelectItem value="al_quran">
                                      Al-Quran
                                    </SelectItem>
                                    <SelectItem value="tafsir_ilmu_tafsir">
                                      Tafsir-Ilmu Tafsir
                                    </SelectItem>
                                    <SelectItem value="hadits_ilmu_hadits">
                                      Hadits-Ilmu Hadits
                                    </SelectItem>
                                    <SelectItem value="tauhid">
                                      Tauhid
                                    </SelectItem>
                                    <SelectItem value="fiqh_ushul_fiqh">
                                      Fiqh-Ushul Fiqh
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
                        control={mudirAtauPimpinanForm.control}
                        name="no_handphone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>No Handphone</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="No Handphone"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              contoh: 6282372377723
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Email"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="status_keaktifan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status Keaktifan</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Status Keaktifan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Status Keaktifan</SelectLabel>
                                    <SelectItem value="aktif">Aktif</SelectItem>
                                    <SelectItem value="non_aktif">
                                      Non Aktif
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
                        control={mudirAtauPimpinanForm.control}
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
                  </div>
                </ScrollArea>

                <div className="grid grid-cols-2 gap-5">
                  <SheetClose asChild>
                    <Button type="submit" className="cursor-pointer">
                      Batal
                    </Button>
                  </SheetClose>
                  <Button type="submit" className="cursor-pointer">
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
