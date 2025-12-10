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
import UploadPiagamSkIjop from "@/components/upload-piagam-sk-ijop";
import UploadIzinOperasional from "@/components/upload-izin-operasional";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/helpers/http.helper";

export default function ModalTambahSkDanPerizinan({
  openDialogTambahSkIjop,
  setOpenDialogTambahSkIjop,
}) {
  const [fileUploadIzinOperasional, setFileUploadIzinOperasional] =
    useState(null);
  const [fileUploadPiagamSKIjop, setFileUploadPiagamSKIjop] = useState(null);

  const schemaDokumen = z.object({
    no_sk_ijop: z.string({
      message: "Masukkan No SK Izin Operasional",
    }),
    tanggal_sk_ijop: z.date({
      required_error: "Tanggal SK Izin Operasional wajib diisi",
    }),
    berlaku_sampai_dengan: z.date({
      required_error: "Berlaku sampai dengan wajib diisi",
    }),
    instansi_penerbit_ijop: z.string({
      message: "Masukkan instansi penerbit izin operasional",
    }),
  });

  const dokumenForm = useForm({
    resolver: zodResolver(schemaDokumen),
    defaultValues: {
      no_sk_ijop: "",
      tanggal_sk_ijop: new Date(),
      berlaku_sampai_dengan: new Date(),
      instansi_penerbit_ijop: "",
    },
  });

  const queryClient = useQueryClient();

  const postSkDanPerizinan = useMutation({
    mutationFn: async (values) => {
      const data = new FormData();

      data.append("no_sk_ijop", values.no_sk_ijop);
      data.append("tanggal_sk_ijop", values.tanggal_sk_ijop);
      data.append("berlaku_sampai_dengan", values.berlaku_sampai_dengan);
      data.append("instansi_penerbit_ijop", values.instansi_penerbit_ijop);
      data.append("upload_ijop", fileUploadIzinOperasional);
      data.append("upload_piagam_ijop", fileUploadPiagamSkIjop);
      return http().post(`/profil/sk-ijop`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sk-ijop"] });
      toast("SK Ijop berhasil ditambahkan", {
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
    if (!fileUploadIzinOperasional) {
      toast("Dokumen upload izin operasional belum diunggah");
      return;
    }

    if (!fileUploadPiagamSkIjop) {
      toast("Dokumen upload piagam SK Ijop belum diunggah");
      return;
    }

    postSkDanPerizinan.mutate(data);
    setOpenDialogTambahSkIjop(false);
  };

  return (
    <Sheet
      open={openDialogTambahSkIjop}
      onOpenChange={setOpenDialogTambahSkIjop}
    >
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
                      name="no_sk_ijop"
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
                      name="tanggal_sk_ijop"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel
                            className={fieldState.error ? "text-red-500" : ""}
                          >
                            Tanggal SK Izin Operasional
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
                                    format(field.value, "PPP")
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
                      control={dokumenForm.control}
                      name="berlaku_sampai_dengan"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel
                            className={fieldState.error ? "text-red-500" : ""}
                          >
                            Berlaku Sampai Dengan
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
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pilih Berlaku Sampai Dengan</span>
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
                    <div>
                      <FormField
                        control={dokumenForm.control}
                        name="instansi_penerbit_ijop"
                        render={({ field, fieldState }) => (
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
                                <SelectTrigger
                                  className={cn(
                                    "w-full text-left border rounded-md p-2",
                                    fieldState.error && "border-red-500"
                                  )}
                                >
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

                  <div>
                    <UploadIzinOperasional
                      fileUploadIzinOperasional={fileUploadIzinOperasional}
                      setFileUploadIzinOperasional={
                        setFileUploadIzinOperasional
                      }
                    />
                  </div>
                  <div>
                    <UploadPiagamSkIjop
                      fileUploadPiagamSKIjop={fileUploadPiagamSKIjop}
                      setFileUploadPiagamSKIjop={setFileUploadPiagamSKIjop}
                    />
                  </div>
                </div>
              </ScrollArea>

              <SheetFooter>
                <div className="grid grid-cols-2 gap-5">
                  <SheetClose asChild>
                    <Button type="button" className="cursor-pointer">
                      Batal
                    </Button>
                  </SheetClose>
                  <Button
                    type="button"
                    onClick={() => {
                      dokumenForm.handleSubmit(onSubmit)();
                    }}
                    className="cursor-pointer"
                  >
                    Simpan
                  </Button>
                </div>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
