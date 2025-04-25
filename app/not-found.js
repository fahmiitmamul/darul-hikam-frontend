import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl">404</h1>
        <h2 className="text-3xl font-semibold tracking-tight">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-muted-foreground">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman
          tersebut mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}
