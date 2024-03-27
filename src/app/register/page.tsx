"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "../../../config";
import { getDownloadURL, uploadBytes } from "firebase/storage";

const Register = () => {
  const [timer, setTimer] = useState(10);
  const [payload, setPayload] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [avatar, setAvatar] = useState(
    "https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697"
  );
  const [regNo1, setRegNo1] = useState(0);
  const [photoDetail, setPhotoDetail] = useState(false);

  const [image1, setImage1] = useState(null);

  const initialValues = {
    phn: "",
    desg: "",
    branch: "",
    year: "",
    photoURL: "",
  };

  const [details, setDetails] = useState({
    phn: "",
    desg: "",
    branch: "",
    year: "",
    photoURL: "",
  });

  //Adding Details of User
  const add = async () => {
    try {
      setLoading(true);
      if (!details.phn || !details.branch || !details.year) {
        toast.error("Enter Details");
        setDetails(initialValues);
        setLoading(false);
        return;
      } else {
        await updateDoc(doc(db, "users", payload.email), {
          phoneNo: details.phn,
          branch: details.branch,
          year: details.year,
          photoURL:
            "https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697",
          role: "user",
        });
        setDetails(initialValues);
        setLoading(false);
        setTimeout(() => {
          setPhotoDetail(true);
        }, 1500);
        toast.success("Details Saved Succesfully");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
      setDetails(initialValues);
      setLoading(false);
    }
  };

  // const handleChange = async (e: {
  //   target: { files: (Blob | MediaSource)[] };
  // }) => {
  //   setImage1(e.target.files[0]);
  //   setAvatar(URL.createObjectURL(e.target.files[0]));
  // };

  //Giving Registration Number
  useEffect(() => {
    var max = 0;
    onSnapshot(collection(db, "users"), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (max < doc.data().timeStamp) {
          max = doc.data().timeStamp;
          setRegNo1(doc.data().RegNo);
        }
      });
    });
  }, []);

  // const photo = async () => {
  //   try {
  //     setLoading(true);
  //     if (image1) {
  //       const imageRef = ref(storage, `Photo/${payload.displayName}`);
  //       await uploadBytes(imageRef, image1);
  //       var url = await getDownloadURL(imageRef);
  //     } else var url = avatar;

  //     await updateDoc(doc(db, "users", payload.email), {
  //       RegNo: regNo1 + 1,
  //       photoURL: url,
  //     });

  //     toast.success("Photo Uploaded Succesfully");
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  //   setAvatar(
  //     "https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697"
  //   );
  //   setLoading(false);
  // };

  useEffect(() => {
    const registerUser = localStorage.getItem("registerPayload");
    if (registerUser) {
      const userData = JSON.parse(registerUser);
      setPayload(userData);
    } else {
      setTimeout(() => {
        router.push("/");
      }, 10000);
      setInterval(() => {
        setTimer((t: number) => t - 1 / 2);
      }, 1000);
    }
  }, [router]);

  return payload ? (
    // is registerd in auth dialog, if true then enter details else not-found error page
    <>
      <Navbar />

      <div className="space-y-8 bg-[#e8e9eb] p-5 md:p-10 flex flex-col items-center">
        <p className="text-3xl text-blue-700 text-center font-bold">
          Fill your Details
        </p>

        <p className="text-lg bg-white text-[#000081] md:text-xl ring-0 outline-0 border border-neutral-500 rounded-lg focus:ring-[#000081] w-2/3 focus:border-[#000081] p-2.5">
          {payload.displayName}
        </p>

        <p className="text-lg bg-white text-[#000081] md:text-xl ring-0 outline-0 border border-neutral-500 rounded-lg focus:ring-[#000081] w-2/3 focus:border-[#000081] p-2.5">
          {payload.email}
        </p>

        {/* Mobile No */}
        <input
          type="tel"
          id="mblNo"
          placeholder="Enter Mobile No..."
          required
          className="text-lg md:text-xl text-[#000081] ring-0 outline-0 border border-neutral-500 placeholder-[#000081] rounded-lg focus:ring-[#000081] w-2/3 focus:border-[#000081] p-2.5"
          value={details.phn}
          onChange={(e: { target: { value: any } }) =>
            setDetails({ ...details, phn: e.target.value })
          }
        />

        {/* Father Name */}
        <input
          type="text"
          id="pyear"
          placeholder="Enter Your Passing Year..."
          required
          className="text-lg md:text-xl text-[#000081] ring-0 outline-0 border border-neutral-500 placeholder-[#000081] rounded-lg focus:ring-[#000081] w-2/3 focus:border-[#000081] p-2.5"
          value={details.year}
          onChange={(e: { target: { value: any } }) =>
            setDetails({ ...details, year: e.target.value })
          }
        />

        {/* Father Name */}
        <input
          type="text"
          id="branch"
          placeholder="Enter Your Branch..."
          required
          className="text-lg md:text-xl text-[#000081] ring-0 outline-0 border border-neutral-500 placeholder-[#000081] rounded-lg focus:ring-[#000081] w-2/3 focus:border-[#000081] p-2.5"
          value={details.branch}
          onChange={(e: { target: { value: any } }) =>
            setDetails({ ...details, branch: e.target.value })
          }
        />

        <div className="flex justify-center items-center p-2 bg-white rounded-xl">
          <img
            src="https://ik.imagekit.io/xji6otwwkb/Alumni/qr.jpg?updatedAt=1711513352173"
            alt=""
            className="h-[18rem] w-[18rem] object-cover rounded-xl"
          />
        </div>

        <button
          onClick={() => add()}
          className="w-full md:w-2/3 text-lg md:text-xl py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-md focus:outline-none transition duration-150 ease-in-out"
        >
          Submit
        </button>
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
  ) : (
    // not found error page
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
      <p className="text-2xl font-semibold">Register yourself to Continue...</p>
    </div>
  );
};

export default Register;
