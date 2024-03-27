import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Auth from "./auth-modal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { member } from "../membersType";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [openAuth, setOpenAuth] = useState(false); // opening and closing of modal
  const [user, setUser] = useState<member>(); // store User after Auth

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("userPayload");
    toast.success("Logged Out Succesfully");
    setUser(undefined);
    router.push("/");
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userPayload");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }
  }, []);

  return (
    <>
      <nav className="flex justify-evenly items-center p-3 px-5 md:px-10 font-bold text-xl">
        {/* Hamburger's Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="block md:hidden w-1/3 border-0 outline-0 rounded-md p-2">
            <Menu />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {/* <DropdownMenuLabel>
              <Link href="/about">About Us</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
            <DropdownMenuLabel>
              <Link href="/members">Our Alumnis</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <Link href="/gallery">Gallery</Link>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <Link href="/press">Press Release</Link>
            </DropdownMenuLabel> */}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/">
          <Image
            src="https://ik.imagekit.io/xji6otwwkb/Alumni/logo-removebg-preview.png?updatedAt=1711478059154"
            alt="logo"
            className="md:block hidden"
            width={125}
            height={125}
          />
          <Image
            src="https://ik.imagekit.io/xji6otwwkb/Alumni/logo-removebg-preview.png?updatedAt=1711478059154"
            alt="logo"
            width={85}
            height={85}
            className="block md:hidden"
          />
        </Link>

        <Link href="/members">
          <button className="border-0 outline-0 md:block hidden w-fit">
            Our Alumnis
          </button>
        </Link>

        <Link href="/gallery">
          <button className="border-0 outline-0 md:block hidden w-fit">
            Gallery
          </button>
        </Link>

        {/* user state */}
        {!user ? (
          <button
            onClick={() => setOpenAuth(true)}
            className="outline-0 border-2 border-black text-lg md:text-xl rounded-md p-1 md:p-2 w-fit "
          >
            Login
          </button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="border-0 outline-0 rounded-md p-2 w-fit">
              <div className="outline-0 border-2 border-black rounded-full p-1 w-fit ">
                <Avatar>
                  <AvatarImage src={`${user.photoURL}`} />
                  <AvatarFallback>{`${user.displayName}`}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {/* {user?.role == "admin" && (
                <>
                  <DropdownMenuLabel className="md:text-xl">
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuLabel className="md:text-xl">
                <Link href="/members">Profile</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              <DropdownMenuLabel
                className="cursor-pointer md:text-xl"
                onClick={logout}
              >
                Logout
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>

      <Modal
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        center
        classNames={{
          modal: "tempModal rounded-xl",
        }}
      >
        {<Auth {...{ setOpenAuth, setUser }} />}
      </Modal>
    </>
  );
};

export default Navbar;
