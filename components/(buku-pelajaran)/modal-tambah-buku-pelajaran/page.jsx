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
  DialogDescription,
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

export default function ModalTambahBukuPelajaran() {
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
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" className="uppercase cursor-pointer">
            <Plus />
            Tambah Buku Pelajaran
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Buku Pelajaran</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...dokumenForm}>
              <form
                onSubmit={dokumenForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 mt-5"
              >
                <PdfUploader />

                <div className="flex gap-5">
                  <div className="w-full">
                    <FormField
                      control={dokumenForm.control}
                      name="kelas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kelas</FormLabel>
                          <Input
                            type="text"
                            placeholder="Silahkan Tulis Kelas"
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
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
    </div>
  );
}
