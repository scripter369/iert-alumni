"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  AlignLeft,
  BookImage,
  FileStack,
  GalleryThumbnails,
  LayoutDashboard,
  Speaker,
  UsersRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Dashboard from "../components/admin-components/dashboard";
import Carousel from "../components/admin-components/carousel";
import Gallery from "../components/admin-components/gallery";
import Announcements from "../components/admin-components/announcements";
import Press from "../components/admin-components/press";
import Members from "../components/admin-components/members";
import { member } from "../membersType";
import { redirect } from "next/navigation";

const Admin = () => {
  const menuOptions: any[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Carousel",
      icon: <GalleryThumbnails />,
    },
    {
      title: "Photo Gallery",
      icon: <BookImage />,
    },
    {
      title: "Announcement",
      icon: <Speaker />,
    },
    {
      title: "Press Release",
      icon: <FileStack />,
    },
    {
      title: "Members",
      icon: <UsersRound />,
    },
  ];

  const [admin, setAdmin] = useState<member>();

  const [tabStatus, setTabStatus] = React.useState({
    title: "Dashboard",
    icon: <LayoutDashboard />,
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) setAdmin(JSON.parse(storedUserData));
    if (!storedUserData || JSON.parse(storedUserData)?.role != "admin")
      throw new Error("Only Page Admin is Allowed !!");
  }, []);
  return (
    <>
      <Navbar />

      {admin && (
        <div className="bg-[#e8e9eb] relative inline-flex w-screen mb-40">
          <Sheet>
            <SheetTrigger className="mx-12 absolute top-14 left-9">
              <AlignLeft />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-[#373C4D] p-10 w-1/6 sm:w-[540px] text-white border-[#373C4D] rounded-r-[25px]">
              <SheetHeader className="border-b-2 border-slate-400 pb-6">
                <SheetTitle className="flex justify-between items-center">
                  <Avatar>
                    <AvatarImage src={`${admin?.photoURL}`} />
                    <AvatarFallback>ADMIN</AvatarFallback>
                  </Avatar>
                  <div className="text-white">
                    <p>{admin?.displayName}</p>
                    <p className="text-sm text-neutral-400">{admin?.email}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-8 mt-10">
                {menuOptions.map((option, index) => (
                  <SheetClose asChild key={index}>
                    <button
                      type="button"
                      onClick={() => setTabStatus(option)}
                      className={`btn flex px-10 items-center text-[16px] font-semibold hover:text-black text-white w-full h-[61px] border-2 rounded-[15px] ${
                        tabStatus.title == option.title
                          ? "bg-[#e6eff3] text-gray-900"
                          : "hover:bg-slate-400 border-slate-400"
                      }`}>
                      {option.icon}
                      &nbsp;&nbsp;&nbsp;&nbsp;{option.title}
                    </button>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <div className="m-10 ms-32 w-full">
            {tabStatus && (
              <div>
                <p className="text-[#280559] text-[36px] font-[600]">
                  {tabStatus.title}
                </p>
                {tabStatus.title == "Dashboard" && <Dashboard />}
                {tabStatus.title == "Carousel" && <Carousel />}
                {tabStatus.title == "Photo Gallery" && <Gallery />}
                {tabStatus.title == "Announcement" && <Announcements />}
                {tabStatus.title == "Press Release" && <Press />}
                {tabStatus.title == "Members" && <Members />}
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Admin;
