"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const [loading, setLoading] = useState(false);
  const schemaLogin = z.object({
    email: z
      .string({ message: "Masukkan Email" })
      .email({ message: "Email tidak valid" }),
    password: z.string({ message: "Masukkan Password" }),
  });

  const loginForm = useForm({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await signIn("credentials", {
      username: data.email,
      password: data.password,
      callbackUrl: "/",
    });
    setLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Masuk</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Masukkan email dibawah untuk melanjutkan
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-5 mt-5"
          >
            <div className="grid gap-3">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full flex justify-between">
                      <FormLabel>Password</FormLabel>
                      <FormLabel>
                        <Link
                          href="/lupa-sandi"
                          className="font-normal underline-offset-4 hover:underline"
                        >
                          Lupa Kata Sandi ?
                        </Link>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Masukkan Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {loading ? (
              <Button disabled className="w-full cursor-pointer">
                <Loader2 className="animate-spin" />
                Mohon tunggu
              </Button>
            ) : (
              <Button className="w-full cursor-pointer">Login</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
