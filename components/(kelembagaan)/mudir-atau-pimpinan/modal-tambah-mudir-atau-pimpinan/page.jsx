"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ModalTambahMudirAtauPimpinan() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  const mudirAtauPimpinanSchema = z.object({
    nspp: z.string({ message: "Masukkan NSPP" }),
    nama_lembaga: z.string({ message: "Masukkan nama lembaga" }),
    satuan_pendidikan: z.string({
      message: "Masukkan satuan pendidikan",
    }),
    program_pendidikan: z.string({
      message: "Masukkan program pendidikan",
    }),
  });

  const mudirAtauPimpinanForm = useForm({
    resolver: zodResolver(mudirAtauPimpinanSchema),
    defaultValues: {
      alamat_lengkap: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="cursor-pointer uppercase">
            <Plus />
            Tambah
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Tambah Mudir Atau Pimpinan</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-1 gap-5">
            <Form {...mudirAtauPimpinanForm}>
              <form onSubmit={mudirAtauPimpinanForm.handleSubmit(onSubmit)}>
                <ScrollArea className="h-[540px]">
                  <div className="grid grid-cols-1 gap-5 px-5">
                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
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
                                          (framework) =>
                                            framework.value === value
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
                        control={mudirAtauPimpinanForm.control}
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
                        control={mudirAtauPimpinanForm.control}
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
                        control={mudirAtauPimpinanForm.control}
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
                        control={mudirAtauPimpinanForm.control}
                        name="jenis_kelamin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Jenis Kelamin"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="status_kepegawaian"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status Kepegawaian</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Status Kepegawaian"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="pendidikan_terakhir"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pendidikan Terakhir</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Pendidikan Terakhir"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="lama_pendidikan_ponpes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lama Pendidikan Ponpes</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Lama Pendidikan Ponpes"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="lama_pendidikan_lainnya"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lama Pendidikan Lainnya</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Lama Pendidikan Lainnya"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="kompetensi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kompetensi</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Kompetensi"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
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
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Email"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="status_keaktifan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status Keaktifan</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Status Keaktifan"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={mudirAtauPimpinanForm.control}
                        name="kewarganegaraan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kewarganegaraan</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Kewarganegaraan"
                                {...field}
                              />
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
    </div>
  );
}
