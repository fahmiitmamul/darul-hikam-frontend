"use client";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UploadBukuPelajaran from "@/components/upload-buku-pelajaran";
import { useState } from "react";

export default function ModalTambahBukuPelajaran() {
  const [fileUploadBukuPelajaran, setFileUploadBukuPelajaran] = useState(false);

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
                <div className="flex gap-5">
                  <div className="w-full">
                    <FormField
                      control={dokumenForm.control}
                      name="judul_buku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Judul Buku</FormLabel>
                          <Input
                            type="text"
                            placeholder="Silahkan Tulis Judul Buku"
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

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

                <UploadBukuPelajaran
                  fileUploadBukuPelajaran={fileUploadBukuPelajaran}
                  setFileUploadBukuPelajaran={setFileUploadBukuPelajaran}
                />
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
