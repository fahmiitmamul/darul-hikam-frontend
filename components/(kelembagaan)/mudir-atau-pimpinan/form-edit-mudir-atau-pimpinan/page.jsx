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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/helpers/http.helper";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function ModalEditMudirAtauPimpinan({
  mudirAtauPimpinanId,
  openDialogEditMudirAtauPimpinan,
  setOpenDialogEditMudirAtauPimpinan,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const frameworks = [
    {
      value: "Itmamul Fahmi",
      label: "Itmamul Fahmi",
    },
  ];

  const mudirAtauPimpinanSchema = z.object({
    nama_lengkap: z
      .string({ message: "Masukkan Nama Lengkap" })
      .min(1, "Wajib diisi"),
    nik: z.string({ message: "Masukkan NIK" }).min(1, "Wajib diisi"),
    gelar_depan: z
      .string({
        message: "Masukkan gelar depan",
      })
      .min(1, "Wajib diisi"),
    gelar_belakang: z
      .string({
        message: "Masukkan gelar belakang",
      })
      .min(1, "Wajib diisi"),
    jenis_kelamin: z
      .string({
        message: "Masukkan jenis kelamin",
      })
      .min(1, "Wajib diisi"),
    status_kepegawaian: z
      .string({
        message: "Masukkan status kepegawaian",
      })
      .min(1, "Wajib diisi"),
    pendidikan_terakhir: z
      .string({
        message: "Masukkan pendidikan terakhir",
      })
      .min(1, "Wajib diisi"),
    lama_pendidikan_ponpes: z
      .string({
        message: "Masukkan lama pendidikan ponpes",
      })
      .min(1, "Wajib diisi"),
    lama_pendidikan_lainnya: z
      .string({
        message: "Masukkan lama pendidikan lainnya",
      })
      .min(1, "Wajib diisi"),
    kompetensi: z
      .string({
        message: "Masukkan kompetensi",
      })
      .min(1, "Wajib diisi"),
    no_handphone: z
      .string({
        message: "Masukkan no handphone",
      })
      .min(1, "Wajib diisi"),
    email: z
      .string({
        message: "Masukkan email",
      })
      .min(1, "Wajib diisi"),
    tanggal_mulai: z.date({
      message: "Masukkan tanggal mulai",
    }),
    status_keaktifan: z
      .string({
        message: "Masukkan status keaktifan",
      })
      .min(1, "Wajib diisi"),
    kewarganegaraan: z
      .string({
        message: "Masukkan kewarganegaraan",
      })
      .min(1, "Wajib diisi"),
  });

  const mudirAtauPimpinanForm = useForm({
    resolver: zodResolver(mudirAtauPimpinanSchema),
    defaultValues: async () => {
      if (!mudirAtauPimpinanId) return;
      const { data } = await http().get(
        `/mudir-atau-pimpinan/${mudirAtauPimpinanId}`
      );

      console.log(data);
      return data.results?.data[0];
    },
  });

  const queryClient = useQueryClient();

  const patchMudirAtauPimpinan = useMutation({
    mutationFn: async (values) => {
      const data = new URLSearchParams(values).toString();
      return http().post(`/mudir-atau-pimpinan/${mudirAtauPimpinanId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mudir-pimpinan"] });
      toast("Mudir atau pimpinan berhasil diedit", {
        description: new Date().toLocaleString(),
      });
    },
    onError: (err) => {
      toast(err.response.data.message, {
        description: new Date().toLocaleString(),
      });
    },
  });

  const onSubmit = (data) => {
    patchMudirAtauPimpinan.mutate(data);
    setOpenDialogEditMudirAtauPimpinan(false);
  };

  return (
    <div>
      <Sheet
        open={openDialogEditMudirAtauPimpinan}
        onOpenChange={setOpenDialogEditMudirAtauPimpinan}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Mudir Atau Pimpinan</SheetTitle>
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
                        name="nama_lengkap"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={cn(
                                      "w-full justify-between",
                                      fieldState.invalid &&
                                        "border-red-500 text-red-600"
                                    )}
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
                                              // Update react-hook-form value
                                              field.onChange(
                                                currentValue === value
                                                  ? ""
                                                  : currentValue
                                              );
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Jenis Kelamin</FormLabel>
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Status Kepegawaian</FormLabel>
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
                                    "w-full text-left border rounded-md p-2",
                                    fieldState.error && "border-red-500"
                                  )}
                                >
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Lama Pendidikan Ponpes</FormLabel>
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Lama Pendidikan Lainnya</FormLabel>
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
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Kompetensi</FormLabel>
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
                        name="tanggal_mulai"
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
                                      format(field.value, "dd-MM-yyyy")
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

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="status_keaktifan"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Status Keaktifan</FormLabel>
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
                                  <SelectValue placeholder="Status Keaktifan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Status Keaktifan</SelectLabel>
                                    <SelectItem value="Aktif">Aktif</SelectItem>
                                    <SelectItem value="Non Aktif">
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
                  </div>
                </ScrollArea>
              </form>
            </Form>
          </div>

          <SheetFooter>
            <div className="grid grid-cols-2 gap-5">
              <SheetClose asChild>
                <Button type="button" className="cursor-pointer">
                  Batal
                </Button>
              </SheetClose>
              <Button
                type="button"
                onClick={mudirAtauPimpinanForm.handleSubmit(onSubmit)}
              >
                Simpan
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
