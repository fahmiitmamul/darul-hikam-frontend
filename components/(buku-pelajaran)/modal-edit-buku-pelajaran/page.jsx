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
import http from "@/helpers/http.helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ModalEditBukuPelajaran({
  bukuPelajaranId,
  openDialogEditBukuPelajaran,
  setOpenDialogEditBukuPelajaran,
}) {
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

  const bukuPelajaranForm = useForm({
    resolver: zodResolver(schemaDokumen),
    defaultValues: async () => {
      if (!bukuPelajaranId) return;
      const { data } = await http().get(`/buku-pelajaran/${bukuPelajaranId}`);
      console.log(data);
      return data.results[0];
    },
  });

  const queryClient = useQueryClient();

  const patchBukuPelajaran = useMutation({
    mutationFn: async (values) => {
      const data = new FormData();

      data.append("judul_buku", values.judul_buku);
      data.append("kelas", values.kelas);
      data.append("file_buku_pelajaran", fileUploadBukuPelajaran);
      return http().patch(`/buku-pelajaran/${bukuPelajaranId}`, data);
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
    patchBukuPelajaran.mutate(data);
    setOpenDialogEditBukuPelajaran(false);
  };

  return (
    <div>
      <Dialog
        open={openDialogEditBukuPelajaran}
        onOpenChange={setOpenDialogEditBukuPelajaran}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Buku Pelajaran</DialogTitle>
          </DialogHeader>
          <div>
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
