"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

const CustomersDetail = ({ userSlug }: { userSlug: string }) => {
  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="w-full h-fit flex-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Customer Details
            {/* {"Gaurav Dubey".split(" ")[0]}, */}
          </h2>
          <div className="flex-center">
            <Button className="bg-[red] text-white">
              Delete User <RiDeleteBinLine size={20} className="ml-1" />
            </Button>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <UserDetail userSlug={userSlug} />
          <UserOrderTable />
        </div>
      </section>
    </>
  );
};

export default CustomersDetail;

const UserDetail = ({ userSlug }: { userSlug: string }) => {
  return (
    <>
      <div className="w-full h-[55vh] flex gap-2 bg-[#F8F8F8] rounded-xl p-4">
        <div className="pfp w-[30%] h-full flex-center border-r">
          <div className="flex-center flex-col gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="/logo.png"
                alt="pfp"
                width={400}
                height={400}
                className="w-full h-full bg-zinc-200 rounded-full object-cover"
              />
            </div>
            <h2 className="">{userSlug}</h2>
            <h6 className="">Register at: 12/06/2022</h6>
            <Button className="text-white">
              Send Email <HiOutlineMail size={20} className="ml-1" />
            </Button>
          </div>
        </div>
        <div className="w-[70%] h-full overflow-hidden">
          <h2 className="w-full h-fit text-md md:text-lg lg:text-xl font-semibold">
            Personal Information
          </h2>
          <div className="w-full h-full px-2 space-y-4 mt-2 overflow-hidden">
            {info.map((pi, index) => (
              <div key={index} className="flex justify-between gap-6">
                <span>{pi.lable}</span>
                <span className="text-end">{pi.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const info = [
  { lable: "First name", value: "Gaurav" },
  { lable: "Last name", value: "D." },
  { lable: "Email", value: "gd@textile.csk" },
  { lable: "Phone", value: "1234567890" },
  { lable: "Gender", value: "Male" },
  {
    lable: "Address",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae fugit exercitationem natus minus soluta fuga ducimus maxime eos a at!",
  },
  { lable: "Pincode", value: "400057" },
];

const UserOrderTable = () => {
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const statusOption = ["Delievered", "Pending", "Shipped"];
  const [status, setStatus] = useState<string>(statusOption[0]);

  return (
    <>
      <div className="w-full space-y-2 rounded-xl bg-[#F8F8F8] p-4">
        <div className="w-full h-fit flex-between">
          <div className="w-fit font-semibold">Recent Orders</div>
          <div className="w-fit h-fit flex-between gap-2">
            <div className="w-fit flex-center gap-1 cursor-pointer bg-white border border-primary py-1 px-2">
              <IoSearchOutline size={20} className="text-primary" />
              <input
                type="text"
                placeholder="Search by Firstname"
                className="placeholder:text-primary bg-none border-none outline-none"
              />
            </div>
            <div className="relative group w-fit h-fit">
              <Button className="h-fit text-white">
                {status}{" "}
                <MdOutlineKeyboardArrowDown
                  size={20}
                  className="ml-1 group-hover:-rotate-180 ease-in-out duration-300"
                />
              </Button>

              <div className="hidden group-hover:block animate-slide-down absolute left-0 right-0 -bottom-32 z-40 w-full h-fit bg-slate-200 shadow-md rounded-md overflow-hidden">
                {statusOption.map((sp, index) => (
                  <div
                    key={index}
                    onClick={() => setStatus(sp)}
                    className="cursor-pointer p-2 border-b border-b-slate-300"
                  >
                    {sp}
                  </div>
                ))}
              </div>
            </div>
            <div
              onClick={() => setIsAscending(!isAscending)}
              className="w-fit flex-center gap-1 cursor-pointer bg-white border border-primary py-1 px-2"
            >
              {isAscending ? (
                <FaArrowDownShortWide size={20} className="text-primary" />
              ) : (
                <FaArrowUpShortWide size={20} className="text-primary" />
              )}
            </div>
          </div>
        </div>
        <div className="relative w-full h-[72vh] border border-gray-300 rounded-2xl overflow-auto">
          <table className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
            <thead className="sticky top-0 bg-[#EAEAEA] shadow-sm z-10">
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Avatar</th>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">Registration</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone No.</th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="group border-b cursor-pointer hover:bg-[#ffb43335] ease-in-out duration-300"
                >
                  <td className="px-4 py-2">
                    <Image
                      src={user.avatar}
                      alt="avatar"
                      width={200}
                      height={200}
                      className="rounded-full w-10 h-10 object-cover group-hover:shadow-lg ease-in-out duration-300"
                    />
                  </td>
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">{user.registrationDate}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const users = [
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Chandra Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "LongggFirst",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "longemailll@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
  {
    avatar: "https://via.placeholder.com/50",
    firstName: "Gojo",
    lastName: "Satoru",
    registrationDate: "01-03-2024",
    email: "idkmyemail@gmail.com",
    phone: "+91 01234 56789",
  },
];
