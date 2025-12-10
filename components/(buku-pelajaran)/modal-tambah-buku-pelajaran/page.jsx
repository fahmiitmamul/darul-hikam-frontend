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
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/helpers/http.helper";

export default function ModalTambahBukuPelajaran({
  openDialogAddBukuPelajaran,
  setOpenDialogAddBukuPelajaran,
}) {
  const [fileUploadBukuPelajaran, setFileUploadBukuPelajaran] = useState(false);

  const schemaBukuPelajaran = z.object({
    judul_buku: z
      .string({ message: "Masukkan Judul Buku" })
      .min(1, "Harap diisi"),
    kelas: z.string({ message: "Masukkan Kelas" }).min(1, "Harap diisi"),
  });

  const bukuPelajaranForm = useForm({
    resolver: zodResolver(schemaBukuPelajaran),
    defaultValues: {
      judul_buku: "",
      kelas: "",
    },
  });

  const queryClient = useQueryClient();

  const postBukuPelajaran = useMutation({
    mutationFn: async (values) => {
      const data = new FormData();

      data.append("judul_buku", values.judul_buku);
      data.append("kelas", values.kelas);
      data.append("file_buku_pelajaran", fileUploadBukuPelajaran);
      return http().post(`/buku-pelajaran`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buku-pelajaran"] });
      toast("Buku pelajaran berhasil ditambahkan", {
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
    postBukuPelajaran.mutate(data);
    setOpenDialogAddBukuPelajaran(false);
  };

  return (
    <div>
      <Dialog
        open={openDialogAddBukuPelajaran}
        onOpenChange={setOpenDialogAddBukuPelajaran}
      >
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
          <div className="overflow-hidden">
            <Form {...bukuPelajaranForm}>
              <form
                onSubmit={bukuPelajaranForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 mt-5"
              >
                <div className="flex gap-5">
                  <div className="w-full">
                    <FormField
                      control={bukuPelajaranForm.control}
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
                      control={bukuPelajaranForm.control}
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
              onClick={() => setOpenDialogAddBukuPelajaran(false)}
            >
              Kembali
            </Button>
            <Button
              type="button"
              onClick={() => {
                bukuPelajaranForm.handleSubmit(onSubmit)();
              }}
              className="cursor-pointer uppercase"
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
