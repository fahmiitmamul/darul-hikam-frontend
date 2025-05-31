"use client";
import { Plus, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ModalTambahSkDanPerizinan() {
  const [tahunBerdiriHijriah, setTahunBerdiriHijriah] = useState(null);

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
                          <FormLabel>No SK Izin Operasional</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="No SK Izin Operasional"
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
                      name="tanggal_sk_izin_operasional"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal SK Izin Operasional</FormLabel>
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
                                    <span>
                                      Pilih Tanggal SK Izin Operasional
                                    </span>
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
                      control={dokumenForm.control}
                      name="berlaku_sampai_dengan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Berlaku Sampai Dengan</FormLabel>
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
                                    <span>Pilih Berlaku Sampai Dengan</span>
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
                    <div>
                      <FormField
                        control={dokumenForm.control}
                        name="instansi_penerbit_izin_operasional"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Instansi Penerbit Izin Operasional
                            </FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Instansi Penerbit Izin Operasional" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Instansi Penerbit Izin Operasional
                                    </SelectLabel>
                                    <SelectItem value="kemenag_pusat">
                                      Kemenag Pusat
                                    </SelectItem>
                                    <SelectItem value="kemenag_provinsi">
                                      Kemenag Provinsi
                                    </SelectItem>
                                    <SelectItem value="kemenag_kab_atau_kota">
                                      Kemenag Kabupaten atau Kota
                                    </SelectItem>
                                    <SelectItem value="instansi_lainnya">
                                      Instansi Lainnya
                                    </SelectItem>
                                    <SelectItem value="tidak_mengisi">
                                      Tidak Mengisi
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
  );
}
