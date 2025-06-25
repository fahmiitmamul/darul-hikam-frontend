"use client";
import { Plus } from "lucide-react";
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
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/helpers/http.helper";
import { useQuery } from "@tanstack/react-query";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Input } from "@/components/ui/input";

export default function ModalTambahTabungan({
  openDialogAddTabungan,
  setOpenDialogAddTabungan,
}) {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [value, setValue] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [open, setOpen] = useState(false);

  const schemaTabungan = z.object({
    nama_santri: z
      .string({ message: "Masukkan Nama Santri" })
      .min(1, "Harap diisi"),
    tanggal: z.date({
      message: "Masukkan tanggal",
    }),
    uang_masuk: z
      .string({ message: "Masukkan Uang Masuk" })
      .min(1, "Harap diisi"),
  });

  const tabunganForm = useForm({
    resolver: zodResolver(schemaTabungan),
    defaultValues: {
      nama_santri: "",
      tanggal: "",
      uang_masuk: "",
      total: "",
    },
  });

  const queryClient = useQueryClient();

  const postTabungan = useMutation({
    mutationFn: async (values) => {
      const data = new URLSearchParams(values).toString();
      return http().post(`/tabungan`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tabungan"] });
      toast("Tabungan berhasil ditambahkan", {
        description: new Date().toLocaleString(),
      });
    },
    onError: (err) => {
      toast(err.response.data.message, {
        description: new Date().toLocaleString(),
      });
    },
  });

  const getDataSantri = async (page, limit, search) => {
    const { data } = await http().get(
      `/santri?page=${page}&limit=${limit}&search=${search}`
    );

    return data.results;
  };

  const { data } = useQuery({
    queryKey: ["santri", pageIndex, pageSize, globalFilter],
    queryFn: () => getDataSantri(pageIndex, pageSize, globalFilter),
    keepPreviousData: true,
  });

  const onSubmit = (data) => {
    postTabungan.mutate(data);
    setOpenDialogAddTabungan(false);
  };

  return (
    <div>
      <Dialog
        open={openDialogAddTabungan}
        onOpenChange={setOpenDialogAddTabungan}
      >
        <DialogTrigger asChild>
          <Button type="button" className="uppercase cursor-pointer">
            <Plus />
            Tambah Tabungan
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flatpickr-portal">
            <DialogHeader>
              <DialogTitle>Tambah Tabungan</DialogTitle>
            </DialogHeader>
            <div>
              <Form {...tabunganForm}>
                <form
                  onSubmit={tabunganForm.handleSubmit(onSubmit)}
                  className="flex flex-col gap-5 mt-5"
                >
                  <div className="flex gap-5">
                    <div className="w-full">
                      <FormField
                        control={tabunganForm.control}
                        name="nama_santri"
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
                                      ? data?.data?.find(
                                          (santri) =>
                                            santri.id === Number(value)
                                        )?.nama_lengkap
                                      : "Pilih santri"}
                                    <ChevronsUpDown className="opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput
                                      placeholder="Cari santri..."
                                      className="h-9"
                                      value={globalFilter}
                                      onValueChange={(val) =>
                                        setGlobalFilter(val)
                                      }
                                    />
                                    <CommandList>
                                      <CommandEmpty>
                                        Tidak ditemukan.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {data?.data?.map((santri) => (
                                          <CommandItem
                                            key={santri.id}
                                            value={santri.id.toString()}
                                            onSelect={(currentValue) => {
                                              const selected =
                                                currentValue ===
                                                value?.toString()
                                                  ? ""
                                                  : currentValue;
                                              setValue(selected);
                                              setOpen(false);
                                              field.onChange(selected);
                                            }}
                                          >
                                            {santri.nama_lengkap}
                                            <Check
                                              className={cn(
                                                "ml-auto",
                                                value?.toString() ===
                                                  santri.id.toString()
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
                  </div>

                  <div className="flex gap-5">
                    <div className="w-full">
                      <FormField
                        control={tabunganForm.control}
                        name="tanggal"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel
                              className={fieldState.error ? "text-red-500" : ""}
                            >
                              Tanggal
                            </FormLabel>
                            <FormControl>
                              <Flatpickr
                                value={field.value}
                                onChange={([date]) => field.onChange(date)}
                                options={{
                                  dateFormat: "Y-m-d",
                                  allowInput: true,
                                  appendTo:
                                    document.querySelector(
                                      ".flatpickr-portal"
                                    ) ?? undefined,
                                }}
                                className={cn(
                                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                                  "ring-offset-background placeholder:text-muted-foreground",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                  fieldState.error && "border-red-500"
                                )}
                                placeholder="Pilih tanggal"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-full">
                      <FormField
                        control={tabunganForm.control}
                        name="uang_masuk"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Uang Masuk</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Uang Masuk"
                                {...field}
                              />
                            </FormControl>
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
                onClick={() => setOpenDialogAddTabungan(false)}
              >
                Kembali
              </Button>
              <Button
                type="button"
                onClick={() => {
                  tabunganForm.handleSubmit(onSubmit)();
                }}
                className="cursor-pointer uppercase"
              >
                Simpan
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
