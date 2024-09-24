"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Customers = () => {
  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="w-full h-fit flex-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Customer Analysis
          </h2>
          <div className="flex-center gap-1">
            Year:
            <Button>{new Date().getFullYear()}</Button>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <UserChart />
          <UserTable />
        </div>
      </section>
    </>
  );
};

export default Customers;

const UserChart = () => {
  // Data for Total Customers line chart
  const totalCustomersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Customers",
        data: [1400, 2200, 1100, 3050, 3500, 3300, 3700],
        borderColor: "#FFAC28",
        backgroundColor: "rgba(255, 172, 40, 0.5)",
        tension: 0.4,
        pointStyle: "circle",
        pointRadius: 6,
        pointHoverRadius: 10,
        fill: true,
      },
    ],
  };

  const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      // tooltip: {
      //   enabled: true,
      //   // backgroundColor: "#3D2C8D", // Dark purple background for tooltip
      //   titleFont: { size: 14 },
      //   titleColor: "#fff",
      //   bodyFont: { size: 12 },
      //   bodyColor: "#fff",
      //   padding: 8,
      //   displayColors: false, // Remove color box in tooltips
      //   callbacks: {
      //     label: (context: any) => `${context.raw}`, // Show raw data
      //   },
      // },
    },
    scales: {
      x: {
        grid: {
          display: false, // No grid lines for x-axis
        },
        ticks: {
          color: "#000", // Black ticks for x-axis
        },
      },
      y: {
        grid: {
          color: "#EAEAEA", // Light grid lines for y-axis
          // borderDash: [5, 5], // Dashed lines
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1000, // Step size for better scaling
          color: "#000", // Black ticks for y-axis
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Smooth line
        borderWidth: 3, // Line thickness
        borderColor: "#ffb43390", // Line color
        fill: "start", // Fill below the line
        backgroundColor: "rgba(255, 172, 40, 0.1)", // Gradient background for line fill
      },
      point: {
        radius: 5,
        borderWidth: 2,
        backgroundColor: "#ffb433",
        borderColor: "#FFFFFF", // White border around points
        hoverRadius: 8, // Larger hover effect
        hoverBackgroundColor: "#ffb43330", // Purple on hover
      },
    },
  };

  return (
    <>
      <div className="chart-container w-full h-[50vh] bg-[#F8F8F8] drop-shadow-md rounded-lg p-4 overflow-hidden">
        <h2 className="text-xl font-bold">Total Customers</h2>
        <p className="text-gray-500">Year 2020</p>
        <div className="relative w-full h-[40vh] flex-center">
          <Line
            data={totalCustomersData}
            options={lineChartOptions}
            className="w-full h-full mb-5"
          />
        </div>
      </div>
    </>
  );
};

const UserTable = () => {
  const [isAscending, setIsAscending] = useState<boolean>(true);
  return (
    <>
      <div className="w-full space-y-2 rounded-xl bg-[#F8F8F8] p-4">
        <div className="w-full h-fit flex-between">
          <div className="w-fit font-semibold">Customer Details</div>
          <div className="w-fit h-fit flex-between gap-2">
            <div className="w-fit flex-center gap-1 cursor-pointer bg-white border border-primary py-1 px-2">
              <IoSearchOutline size={20} className="text-primary" />
              <input
                type="text"
                placeholder="Search by Firstname"
                className="placeholder:text-primary bg-none border-none outline-none"
              />
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
                  <td className="px-4 py-2">
                    <Link href={`/admin/customers/user/${user.firstName}`}>
                      {user.firstName}
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <Link href={`/admin/customers/user/${user.firstName}`}>
                      {user.lastName}
                    </Link>
                  </td>
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
