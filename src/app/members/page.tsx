"use client";
import React, { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Navbar from "../components/navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { member } from "../membersType";
import Pagination from "../components/pagination";
import { db } from "../../../config";
import MemberDetails from "../components/memberDetails";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

let PageSize: number = 15;

const Members = () => {
  const [isMember, setIsMember] = useState(false); // For opening/closing modal
  const [memberData, setMemberData] = useState<member>(); // For displaying user details in modal
  const [currentPage, setCurrentPage] = useState(1); // Pagination

  const [firstoreData, setFirstoreData] = useState<any[]>([]); // importing data from Firestore
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return firstoreData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, firstoreData]);

  const searchMember = (e: any) => {
    // setCurrentPage(1);
    // const value = e.target.value;
    // if (!value) {
    //   setFirstoreData(firstoreData.sort((a, b) => a.RegNo - b.RegNo));
    // } else {
    //   let filteredMembers = firstoreData.filter(
    //     (memb) => memb.displayName.includes(value) || memb.email.includes(value)
    //   );
    //   setFirstoreData(filteredMembers.sort((a, b) => a.id - b.id));
    // }
  };

  // Getting Members Data
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users")),
      (querySnapshot) =>
        querySnapshot.forEach((doc) =>
          setFirstoreData((firstoreData: any) => [...firstoreData, doc.data()])
        )
    );

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      userData?.role == "admin" && setIsAdmin(true);
    }

    if (window?.innerWidth < 500) PageSize = 6;

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-[#e8e9eb] p-5 md:p-10">
        <div className="flex w-full md:w-1/3 border-2 bg-white mx-auto border-[#ff671f] rounded-xl items-center justify-evenly">
          <Search />
          <Input
            type="text"
            placeholder="Search by Name..."
            onChange={(e) => searchMember(e)}
            className="w-11/12 text-xl bg-white rounded-xl"
          />
        </div>

        <p className="my-12 text-center md:text-right text-xl font-semibold">
          Total Members : {firstoreData.length}
        </p>

        <div className="md:my-12 flex justify-evenly items-center flex-wrap gap-y-10">
          {currentTableData.map((member, index) => (
            <div
              onClick={() => {
                setIsMember(true);
                setMemberData(member);
              }}
              key={index}
              className="bg-white cursor-pointer p-5 w-72 h-96 rounded-xl space-y-6"
            >
              <Image
                src={member.photoURL}
                alt="user-avatar"
                width={200}
                height={200}
                priority={true}
                className="rounded-xl object-cover mx-auto"
              />
              <p className="text-center font-semibold text-2xl break-words">
                {member.displayName}
              </p>
              <div className="flex font-semibold text-lg justify-between items-center">
                <span>{member.branch}</span>
                <span>{member.phoneNo}</span>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={firstoreData.length}
          pageSize={PageSize}
          onPageChange={(page: any) => setCurrentPage(page)}
        />
      </div>

      {memberData && (
        <MemberDetails {...{ isMember, setIsMember, memberData, isAdmin }} />
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

export default Members;
