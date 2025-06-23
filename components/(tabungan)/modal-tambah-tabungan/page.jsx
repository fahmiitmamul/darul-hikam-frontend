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
    kelas: z.string({ message: "Masukkan Kelas" }).min(1, "Harap diisi"),
  });

  const tabunganForm = useForm({
    resolver: zodResolver(schemaTabungan),
    defaultValues: {
      santri: "",
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
                      name="santri_id"
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
                                    ? data?.find(
                                        (santri) => santri.id === value
                                      )?.name
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
                                          value={santri.id}
                                          onSelect={(currentValue) => {
                                            setValue(
                                              currentValue === value
                                                ? ""
                                                : currentValue
                                            );
                                            setOpen(false);
                                            field.onChange(
                                              currentValue === value
                                                ? ""
                                                : currentValue
                                            );
                                          }}
                                        >
                                          {santri.nama_lengkap}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              value === santri.id
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
