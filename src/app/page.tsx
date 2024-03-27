"use client";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../config";
import { Dot } from "lucide-react";
import Link from "next/link";
import "./register.css";

export default function Home() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Getting Carousel Data
  const getNotices = async () => {
    try {
      onSnapshot(collection(db, "notices"), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setAnnouncements((announcements: any) => [
            ...announcements,
            doc.data(),
          ]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-[#e8e9eb] py-8">
        <div className="bg-white p-5 rounded-xl">
          <img
            src="https://ik.imagekit.io/xji6otwwkb/Alumni/iert%20colleage.jpg?updatedAt=1711479800421"
            alt=""
            className="h-[30rem] w-full"
          />
        </div>

        <section id="register">
          <h2>
            H<span className="und">ow To Registe</span>r
          </h2>

          <div className="reg">
            <div>
              <div className="div1">
                <h3>01</h3>
                <img src="https://ik.imagekit.io/xji6otwwkb/Alumni/1undraw_authentication_fsn5%201.png?updatedAt=1711480839167" />
              </div>
              <h3>Log In/Sign UP</h3>
              <p>
                Log in you already have an account <br /> If you don't have an
                account sign up to create one
              </p>
            </div>

            <div>
              <div className="div2">
                <h3>02</h3>
                <div className="img2">
                  <img src="https://ik.imagekit.io/xji6otwwkb/Alumni/4Rectangle%20115.png?updatedAt=1711480839089" />
                  <img
                    className="img1"
                    src="https://ik.imagekit.io/xji6otwwkb/Alumni/5Register.png?updatedAt=1711480839165"
                  />
                </div>
              </div>
              <h3>Click To Register</h3>
              <p>Click on the apply button to start the application process</p>
            </div>

            <div>
              <div className="div3">
                <h3>03</h3>
                <img src="https://ik.imagekit.io/xji6otwwkb/Alumni/2image%2011.png?updatedAt=1711480839218" />
              </div>
              <h3>Fill The Forms</h3>
              <p>
                Fill all the forms presented with precise and credible
                information
              </p>
            </div>

            <div>
              <div className="div4">
                <h3>04</h3>
                <img src="https://ik.imagekit.io/xji6otwwkb/Alumni/3submit%20(1)%201.png?updatedAt=1711480839213" />
              </div>
              <h3>Submit Form</h3>
              <p>
                Click on the submit button after filling all the forms with the
                needed data
              </p>
            </div>
          </div>
        </section>

        {/* <div>
          <div>
            <Image
              src="https://ik.imagekit.io/xji6otwwkb/Alumni/logo-removebg-preview.png?updatedAt=1711478059154"
              alt="logo"
              className="mx-auto block md:hidden"
              width={175}
              height={175}
            />
          </div>
        </div> */}

        {/* Announcements */}
        <div className="bg-white p-5 rounded-xl m-5 my-12 md:my-20">
          <p className="text-black font-semibold underline underline-offset-4 text-xl md:text-2xl text-center">
            Announcements
          </p>

          <div className="slider-Y mt-6 h-96 overflow-hidden">
            <div className="slider-track space-y-6 ">
              {announcements?.map((item: any, index: any) => (
                <div
                  key={index}
                  className="slide flex items-center antialiased"
                >
                  <Dot />
                  <span className="font-semibold">
                    &nbsp; {item?.Date} &nbsp; : &nbsp;
                  </span>
                  <span className="whitespace-nowrap overflow-hidden w-24 md:w-10/12 text-ellipsis">
                    {item?.Notice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl m-5 my-12 md:my-20 p-5 flex justify-evenly items-center">
          <div className="flex flex-col items-center w-[30%] rounded-xl justify-center">
            <div className="rounded-full p-1 w-fit border-2">
              <img
                src="https://ik.imagekit.io/xji6otwwkb/Alumni/director.jpg?updatedAt=1711513608990"
                className="object-cover h-[12rem] w-[12rem] rounded-full"
                alt=""
              />
            </div>
            <p className="text-xl font-semibold">Mr. Vimal Mishra</p>
            <p className="text-lg font-semibold">Director</p>
          </div>
          <div className="flex flex-col items-center w-[30%] rounded-xl justify-center">
            <div className="rounded-full p-1 w-fit border-2">
              <img
                src="https://ik.imagekit.io/xji6otwwkb/Alumni/WhatsApp%20Image%202024-03-26%20at%2022.19.21_bcad4c2f.jpg?updatedAt=1711512619194"
                className="object-cover h-[12rem] w-[12rem] rounded-full"
                alt=""
              />
            </div>
            <p className="text-xl font-semibold">Mr. Deep Pandey</p>
            <p className="text-lg font-semibold">Chaiperson</p>
          </div>
          <div className="flex flex-col items-center w-[30%] rounded-xl justify-center">
            <div className="rounded-full p-1 w-fit border-2">
              <img
                src="https://ik.imagekit.io/xji6otwwkb/Alumni/WhatsApp%20Image%202024-03-26%20at%2022.19.40_70a3f233.jpg?updatedAt=1711513352155"
                className="object-cover h-[12rem] w-[12rem] rounded-full"
                alt=""
              />
            </div>
            <p className="text-xl font-semibold">Mr. Ubaid Khan</p>
            <p className="text-lg font-semibold">Deputy Chaiperson</p>
          </div>
        </div>
      </div>

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
}
