import { ForgotPasswordForm } from "@/components/forgot-password";
import Image from "next/image";
import Link from "next/link";

export default function LupaSandiPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div>
              <Image src="/darul-hikam.png" width={30} height={30} alt="Logo" />
            </div>
            DARUL HIKAM TPQ
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-10">
              <div>
                <ForgotPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/darul-hikam-picture.jpeg"
          width={1000}
          height={1000}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>
    </div>
  );
}
