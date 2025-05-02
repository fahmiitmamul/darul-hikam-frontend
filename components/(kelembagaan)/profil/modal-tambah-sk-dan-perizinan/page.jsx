"use client";
import { Plus, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";

export default function ModalTambahSkDanPerizinan() {
  const [tanggalSkIzinOperasional, setTanggalSkIzinOperasional] =
    useState(null);
  const [berlakuSampaiDengan, setBerlakuSampaiDengan] = useState(null);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Tambah Dokumen</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Dokumen</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...dokumenForm}>
            <form
              onSubmit={dokumenForm.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 mt-5"
            >
              <ScrollArea className="h-96">
                <div className="flex flex-col gap-5">
                  <div>
                    <FormField
                      control={dokumenForm.control}
                      name="no_sk_izin_operasional"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No SK Izin Operasional</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="No SK Izin Operasional"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormItem>
                      <FormLabel>Tanggal SK Izin Operasional</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !tanggalSkIzinOperasional &&
                                  "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {tanggalSkIzinOperasional ? (
                                format(tanggalSkIzinOperasional, "PPP")
                              ) : (
                                <span>Pilih Tanggal SK Izin Operasional</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={tanggalSkIzinOperasional}
                              onSelect={setTanggalSkIzinOperasional}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  </div>

                  <div>
                    <FormItem>
                      <FormLabel>Berlaku Sampai Dengan</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !berlakuSampaiDengan && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {berlakuSampaiDengan ? (
                                format(berlakuSampaiDengan, "PPP")
                              ) : (
                                <span>Berlaku Sampai Dengan</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={berlakuSampaiDengan}
                              onSelect={setBerlakuSampaiDengan}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  </div>

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
                                <SelectItem value="lpq">LPQ</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div>
                    <PdfUploader />
                  </div>

                  <div>
                    <PdfUploader />
                  </div>
                </div>
              </ScrollArea>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer uppercase"
          >
            Kembali
          </Button>
          <Button type="button" className="cursor-pointer uppercase">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
