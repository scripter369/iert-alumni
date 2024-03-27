import React, { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   ColumnFiltersState,
//   getFilteredRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import Pagination from "../pagination";
import { db } from "../../../../config";
import { member } from "@/app/membersType";
import Image from "next/image";
import { toast } from "react-toastify";
import MemberDetails from "../memberDetails";

let PageSize = 8;

const Members = () => {
  const [isMember, setIsMember] = useState(false); // For opening/closing modal
  const [memberData, setMemberData] = useState<member>(); // For displaying user details in modal
  const [currentPage, setCurrentPage] = useState(1);

  const [membersData, setMembersData] = useState<any[]>([]); // importing data from Firestore
  // const [filterdMembers, setfilterdMembers] = useState<member[]>([]);

  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // );

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return membersData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, membersData]);

  // const filterNames = (e: any) => {
  //   setfilterdMembers([]);
  //   members.map((item) => {
  //     if (item.name.toLowerCase().includes(e.target.value.toLowerCase()))
  //       setfilterdMembers([...filterdMembers, item]);
  //   });
  // };

  const ediDetailsMem = () => {
    try {
      toast.success("Success");
      setIsMember(false);
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };

  // Getting Members Data
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users"), where("RegNo", "!=", 0)),
      (querySnapshot) =>
        querySnapshot.forEach((doc) =>
          setMembersData((membersData) => [...membersData, doc.data()])
        )
    );

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <>
      <div className="space-y-8 py-10">
        <div className="flex justify-between items-center px-12">
          {/* Filter Members */}
          <div className="w-1/3 border-2 border-black rounded-xl focus:outline-0">
            <Input
              type="email"
              className="text-lg"
              placeholder="Filter Members by Name..."
            />
          </div>

          {/* Actions */}
          <div className="w-1/6 flex justify-between items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-blue-500 text-lg">
                  Export &nbsp;
                  <Download color="#ffffff" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Download as</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>PDF</DropdownMenuItem>
                  <DropdownMenuItem>CSV</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-green-500 text-lg">
              Import &nbsp; <Upload color="#ffffff" />
            </Button>
          </div>
        </div>

        {/* Members Data */}
        <div className="border-2 border-black my-12 rounded-xl space-y-4">
          <Table className="text-lg">
            <TableHeader className="bg-[#ff671f] text-white">
              <TableRow className="text-white">
                <TableHead className="w-[100px]">Reg. No.</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Father Name</TableHead>
                <TableHead>Service Field</TableHead>
                <TableHead>Service No</TableHead>
                <TableHead>Aadhaar No</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTableData.map((member) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => {
                    setIsMember(true);
                    setMemberData(member);
                  }}
                  key={member.RegNo}>
                  <TableCell className="font-medium">{member.RegNo}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={member.photoURL} />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{member.displayName}</TableCell>
                  <TableCell>{member.fatherName}</TableCell>
                  <TableCell>{member.serviceField}</TableCell>
                  <TableCell className="text-center">
                    {member.serviceNo}
                  </TableCell>
                  <TableCell>{member.aadharNo}</TableCell>
                  <TableCell>{member.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-[#046a38] text-white">
              <TableRow>
                <TableCell className="text-left" colSpan={4}>
                  Total Members
                </TableCell>
                <TableCell className="text-right" colSpan={4}>
                  {membersData.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={membersData.length}
            pageSize={PageSize}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </div>
      </div>

      {memberData && (
        <MemberDetails
          {...{ isMember, setIsMember, memberData, isAdmin: true }}
        />
      )}
    </>
  );
};

export default Members;
