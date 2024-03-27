import React from "react";

const Dashboard = () => {
  return (
    <div>
      <p className="text-[#9898A3] text-[16px]">
        View all status from the dashbaord
      </p>

      <div className="my-12 flex justify-evenly items-center">
        <div className="w-[228px] flex flex-col items-center justify-center h-[145px] rounded-[34px] bg-white">
          <span className="text-[#280559] text-[43px]">1653</span>
          <span className="break-words text-[#92929D] text-[16px]">
            Total Members
          </span>
        </div>

        <div className="w-[228px] flex flex-col items-center justify-center h-[145px] rounded-[34px] bg-white">
          <span className="text-[#280559] text-[43px]">201</span>
          <span className="break-words text-[#92929D] text-[16px]">
            Total Collection (₹)
          </span>
        </div>

        <div className="w-[228px] flex flex-col items-center justify-center h-[145px] rounded-[34px] bg-white">
          <span className="text-[#280559] text-[43px]">12</span>
          <span className="break-words text-[#92929D] text-[16px]">
            Total Branches
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
