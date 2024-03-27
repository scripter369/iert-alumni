"use client";
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config";
import Pagination from "../components/pagination";
import Modal from "react-responsive-modal";

let PageSize: number = 12;

const Gallery = () => {
  const [isZoom, setIsZoom] = useState(false);
  const [picDetails, setPicDetails] = useState<any>();

  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Getting Gallery Data
  const getGallery = async () => {
    const docRef = doc(db, "gallery", "images");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setGalleryData(docSnap.data().images);
    } catch (error) {
      console.log(error);
    }
  };

  const currentGalleryData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return galleryData?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, galleryData]);

  useEffect(() => {
    getGallery();
    if (window?.innerWidth < 500) PageSize = 8;
  }, []);
  return (
    <>
      <Navbar />

      <div className="bg-[#e8e9eb] p-10">
        {/* Images */}
        <div className="md:my-12 flex justify-evenly items-center flex-wrap gap-10">
          {currentGalleryData?.map((item: any, index: any) => (
            <div
              key={index}
              onClick={() => {
                setIsZoom(true);
                setPicDetails(item);
              }}
              className="bg-white p-5 rounded-xl">
              <Image
                src={item.URL}
                alt="gallery-images"
                width={200}
                height={200}
                priority={true}
                className="rounded-xl object-cover h-[18rem] w-[18rem] md:block hidden"
              />

              <Image
                src={item.URL}
                alt="gallery-images"
                width={200}
                height={200}
                priority={true}
                className="rounded-xl object-cover h-[20rem] w-[20rem] block md:hidden"
              />
            </div>
          ))}
        </div>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={galleryData.length}
          pageSize={PageSize}
          onPageChange={(page: any) => setCurrentPage(page)}
        />
      </div>

      <Modal
        open={isZoom}
        onClose={() => setIsZoom(false)}
        center
        classNames={{
          modal: "rounded-xl w-fit",
        }}>
        <div className="flex justify-center items-center">
          {picDetails && (
            <Image
              src={picDetails.URL}
              alt="gallery-images"
              width={200}
              height={200}
              priority={true}
              className="rounded-xl object-contain h-[35rem] w-[35rem]"
            />
          )}
        </div>
      </Modal>

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

export default Gallery;
