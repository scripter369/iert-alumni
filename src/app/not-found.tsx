"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [timer, setTimer] = useState(10);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 10000);
    setInterval(() => {
      setTimer((t) => t - 1 / 2);
    }, 1000);
  }, [router]);
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
      <p className="text-4xl text-center font-bold">Page Not Found !!</p>
    </div>
  );
}
