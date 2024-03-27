"use client";
import Image from "next/image";
import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [clientError, setClientError] = useState<Error>();
  const [timer, setTimer] = useState(10);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      setClientError(error);
      setTimeout(() => {
        router.push("/");
      }, 10000);
      setInterval(() => {
        setTimer((t) => t - 1 / 2);
      }, 1000);
    }
  }, [error, router]);
  return (
    <div className="flex justify-center flex-col space-y-10 items-center h-screen w-screen">
      <p>
        Redirecting to Home Page in
        <span className="font-semibold text-xl">&nbsp;{timer}&nbsp;</span>
        seconds...
      </p>

      <Image
        src="https://ik.imagekit.io/xji6otwwkb/error.gif?updatedAt=1704300525441"
        alt="error-404"
        className="mx-auto md:block hidden"
        width={500}
        priority
        height={500}
      />
      <Image
        src="https://ik.imagekit.io/xji6otwwkb/error.gif?updatedAt=1704300525441"
        alt="error-404"
        className="mx-auto block md:hidden"
        width={175}
        priority
        height={175}
      />
      {clientError?.message && (
        <p className="text-4xl text-center font-bold">{clientError?.message}</p>
      )}
      <p className="text-2xl font-semibold">Login to Continue...</p>
    </div>
  );
}
