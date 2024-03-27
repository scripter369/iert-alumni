import Image from "next/image";
import Modal from "react-responsive-modal";
import { member } from "../membersType";
import { useEffect, useState } from "react";

interface Props {
  isMember: boolean;
  setIsMember: (isMember: boolean) => void;
  memberData: member;
}

const MemberDetails: React.FC<Props> = ({
  isMember,
  setIsMember,
  memberData,
}) => {
  // Getting Members Data
  useEffect(() => {}, []);

  return (
    <>
      <Modal
        open={isMember}
        onClose={() => setIsMember(false)}
        center
        classNames={{
          modal: "rounded-xl tempModal",
        }}
      >
        <div className="space-y-8">
          <div className="select-none space-y-12">
            <div className="flex justify-evenly items-center w-full">
              <div className="space-y-4">
                <p className="text-xl lg:text-2xl font-semibold break-words flex-wrap w-96">
                  <span className="text-[#000]"> Name : </span>Mr.&nbsp;
                  {memberData?.displayName}
                </p>
                <p className="text-xl lg:text-2xl font-semibold break-words flex-wrap w-96">
                  <span className="text-[#000]"> Branch : </span>Shri&nbsp;
                  {memberData?.branch}
                </p>
                <p className="text-xl lg:text-2xl font-semibold break-words flex-wrap w-96">
                  <span className="text-[#000]"> Passing Year : </span>
                  {memberData?.year}
                </p>
              </div>

              {memberData && (
                <div>
                  <Image
                    src={memberData.photoURL}
                    alt="user-avatar"
                    width={250}
                    height={250}
                    className="rounded-xl object-cover mx-auto hover:scale-105 transition-all ease-in-out duration-300"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-evenly items-center w-full">
              <div className="space-y-4">
                <p className="text-xl lg:text-2xl font-semibold break-words flex-wrap w-96">
                  <span className="text-[#000]"> Email : </span>
                  {memberData?.email}
                </p>
                <p className="text-xl lg:text-2xl font-semibold break-words flex-wrap w-96">
                  <span className="text-[#000]"> Mobile No : </span>
                  {memberData?.phoneNo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MemberDetails;
