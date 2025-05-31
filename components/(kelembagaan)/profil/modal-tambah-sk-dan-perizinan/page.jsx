"use client";
import { Plus, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PdfUploader } from "@/components/pdf-uploader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ChevronsUpDown, Command } from "lucide-react";
import { CommandInput } from "@/components/ui/command";

export default function ModalTambahSkDanPerizinan() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);

  const schemaDokumen = z.object({
    nspp: z.string({ message: "Masukkan NSPP" }),
    nama_lembaga: z.string({ message: "Masukkan nama lembaga" }),
    satuan_pendidikan: z.string({
      message: "Masukkan satuan pendidikan",
    }),
    program_pendidikan: z.string({
      message: "Masukkan program pendidikan",
    }),
  });

  const dokumenForm = useForm({
    resolver: zodResolver(schemaDokumen),
    defaultValues: {
      alamat_lengkap: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer uppercase">
          <Plus />
          Tambah
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tambah Dokumen</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-1 gap-5">
          <Form {...dokumenForm}>
            <form onSubmit={dokumenForm.handleSubmit(onSubmit)}>
              <ScrollArea className="h-[540px]">
                <div className="grid grid-cols-1 gap-5 px-5">
                  <div>
                    <FormField
                      control={dokumenForm.control}
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
                                        (framework) => framework.value === value
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
                      control={dokumenForm.control}
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
                      control={dokumenForm.control}
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
                      control={dokumenForm.control}
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
                      control={dokumenForm.control}
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
                      control={dokumenForm.control}
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
                                  <SelectLabel>Status Kepegawaian</SelectLabel>
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
                      control={dokumenForm.control}
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
                      control={dokumenForm.control}
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
                      control={dokumenForm.control}
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
                      control={dokumenForm.control}
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
                                  <SelectItem value="tauhid">Tauhid</SelectItem>
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
                      control={dokumenForm.control}
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
                      control={dokumenForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={dokumenForm.control}
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
                      control={dokumenForm.control}
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
            </form>
          </Form>
        </div>

        <SheetFooter>
          <div className="grid grid-cols-2 gap-5">
            <SheetClose asChild>
              <Button type="submit" className="cursor-pointer">
                Batal
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button type="submit" className="cursor-pointer">
                Simpan
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <Button variant="outline">Tambah Dokumen</Button>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[425px]">
    //     <DialogHeader>
    //       <DialogTitle>Tambah Dokumen</DialogTitle>
    //     </DialogHeader>
    //     <div>
    //       <Form {...dokumenForm}>
    //         <form
    //           onSubmit={dokumenForm.handleSubmit(onSubmit)}
    //           className="flex flex-col gap-5 mt-5"
    //         >
    //           <ScrollArea className="h-96">
    //             <div className="flex flex-col gap-5">
    //               <div>
    //                 <FormField
    //                   control={dokumenForm.control}
    //                   name="no_sk_izin_operasional"
    //                   render={({ field }) => (
    //                     <FormItem>
    //                       <FormLabel>No SK Izin Operasional</FormLabel>
    //                       <FormControl>
    //                         <Input
    //                           type="text"
    //                           placeholder="No SK Izin Operasional"
    //                           {...field}
    //                         />
    //                       </FormControl>
    //                     </FormItem>
    //                   )}
    //                 />
    //               </div>

    //               <div>
    //                 <FormItem>
    //                   <FormLabel>Tanggal SK Izin Operasional</FormLabel>
    //                   <FormControl>
    //                     <Popover>
    //                       <PopoverTrigger asChild>
    //                         <Button
    //                           variant={"outline"}
    //                           className={cn(
    //                             "w-full justify-start text-left font-normal",
    //                             !tanggalSkIzinOperasional &&
    //                               "text-muted-foreground"
    //                           )}
    //                         >
    //                           <CalendarIcon />
    //                           {tanggalSkIzinOperasional ? (
    //                             format(tanggalSkIzinOperasional, "PPP")
    //                           ) : (
    //                             <span>Pilih Tanggal SK Izin Operasional</span>
    //                           )}
    //                         </Button>
    //                       </PopoverTrigger>
    //                       <PopoverContent className="w-auto p-0">
    //                         <Calendar
    //                           mode="single"
    //                           selected={tanggalSkIzinOperasional}
    //                           onSelect={setTanggalSkIzinOperasional}
    //                           initialFocus
    //                         />
    //                       </PopoverContent>
    //                     </Popover>
    //                   </FormControl>
    //                 </FormItem>
    //               </div>

    //               <div>
    //                 <FormItem>
    //                   <FormLabel>Berlaku Sampai Dengan</FormLabel>
    //                   <FormControl>
    //                     <Popover>
    //                       <PopoverTrigger asChild>
    //                         <Button
    //                           variant={"outline"}
    //                           className={cn(
    //                             "w-full justify-start text-left font-normal",
    //                             !berlakuSampaiDengan && "text-muted-foreground"
    //                           )}
    //                         >
    //                           <CalendarIcon />
    //                           {berlakuSampaiDengan ? (
    //                             format(berlakuSampaiDengan, "PPP")
    //                           ) : (
    //                             <span>Berlaku Sampai Dengan</span>
    //                           )}
    //                         </Button>
    //                       </PopoverTrigger>
    //                       <PopoverContent className="w-auto p-0">
    //                         <Calendar
    //                           mode="single"
    //                           selected={berlakuSampaiDengan}
    //                           onSelect={setBerlakuSampaiDengan}
    //                           initialFocus
    //                         />
    //                       </PopoverContent>
    //                     </Popover>
    //                   </FormControl>
    //                 </FormItem>
    //               </div>

    //               <FormField
    //                 control={dokumenForm.control}
    //                 name="instansi_penerbit_izin_operasional"
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>
    //                       Instansi Penerbit Izin Operasional
    //                     </FormLabel>
    //                     <FormControl>
    //                       <Select
    //                         {...field}
    //                         onValueChange={field.onChange}
    //                         defaultValue=""
    //                       >
    //                         <SelectTrigger className="w-full">
    //                           <SelectValue placeholder="Instansi Penerbit Izin Operasional" />
    //                         </SelectTrigger>
    //                         <SelectContent>
    //                           <SelectGroup>
    //                             <SelectLabel>
    //                               Instansi Penerbit Izin Operasional
    //                             </SelectLabel>
    //                             <SelectItem value="lpq">LPQ</SelectItem>
    //                           </SelectGroup>
    //                         </SelectContent>
    //                       </Select>
    //                     </FormControl>
    //                   </FormItem>
    //                 )}
    //               />

    //               <div>
    //                 <PdfUploader />
    //               </div>

    //               <div>
    //                 <PdfUploader />
    //               </div>
    //             </div>
    //           </ScrollArea>
    //         </form>
    //       </Form>
    //     </div>
    //     <DialogFooter>
    //       <Button
    //         type="button"
    //         variant="outline"
    //         className="cursor-pointer uppercase"
    //       >
    //         Kembali
    //       </Button>
    //       <Button type="button" className="cursor-pointer uppercase">
    //         Simpan
    //       </Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
}
