"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../ui/button";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
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
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { formatTimestamp } from "@/lib/utils";
import Loader from "@/components/ui/Loader";

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

interface UserCollectionValues {
  _id: string;
  role: string;
  email: string;
  phone_number: number;
  profile: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

const Customers = () => {
  const yearOption = [
    new Date().getFullYear() - 3,
    new Date().getFullYear() - 2,
    new Date().getFullYear() - 1,
    new Date().getFullYear(),
  ];
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [userCollection, setUserCollection] = useState<UserCollectionValues[]>(
    []
  );

  useEffect(() => {
    const fetchUserCollection = async () => {
      try {
        const res = await fetch(`/api/products/read/admin/users`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user collection");
        }

        const data: UserCollectionValues[] = await res.json();
        // console.log("users:", data as UserCollectionValues);
        if (res.ok) {
          const onlyCustomers = data.filter(
            (customer) => customer.role !== "admin" && customer
          );
          setUserCollection(onlyCustomers as UserCollectionValues[]);
        }
      } catch (error) {
        console.error("Error fetching user collections:", error);
      }
    };
    if (userCollection.length === 0) fetchUserCollection();
  }, [userCollection]);
  if (userCollection.length === 0) return <Loader />;
  // console.log(userCollection);

  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="w-full h-fit flex-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Customer Analysis
          </h2>
          <div className="flex-center gap-1">
            Year:
            <div className="relative group w-fit h-fit">
              <Button className="h-fit text-white bg-primary capitalize py-1 px-3 rounded-md flex items-center">
                {year}{" "}
                <MdOutlineKeyboardArrowDown
                  size={20}
                  className="ml-1 group-hover:-rotate-180 ease-in-out duration-300"
                />
              </Button>
              <div className="hidden group-hover:block animate-slide-down absolute left-0 right-0 -bottom-[25.5vh] z-40 w-full min-w-fit h-fit bg-slate-200 shadow-md rounded-md overflow-hidden">
                {yearOption.map((yr, index) => (
                  <div
                    key={index}
                    onClick={() => setYear(yr)}
                    className={`w-full cursor-pointer capitalize p-2 border-b border-b-slate-300 ${
                      year === yr && "text-primary bg-slate-100"
                    } hover:text-primary ease-in-out duration-300`}
                  >
                    {yr}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <UserChart />
          <UserTable usersCollection={userCollection} />
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
      <div className="chart-container w-full lg:h-[50vh] bg-[#F8F8F8] drop-shadow-md rounded-lg p-4 overflow-hidden">
        <h2 className="text-xl font-bold">Total Customers</h2>
        <p className="text-gray-500">Year 2020</p>
        <div className="relative w-full lg:h-[40vh] flex-center">
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

const UserTable: React.FC<{ usersCollection: UserCollectionValues[] }> = ({
  usersCollection,
}) => {
  const router = useRouter();
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  if (usersCollection.length === 0) return <Loader />;

  const filteredUsers =
    usersCollection &&
    usersCollection
      .filter((user) => {
        const firstName = user.firstName?.toLowerCase() || "";
        const lastName = user.lastName?.toLowerCase() || "";
        const email = user.email?.toLowerCase() || "";

        return (
          firstName.includes(search) ||
          lastName.includes(search) ||
          email.includes(search)
        );
        // user.firstName.toLowerCase().includes(search) ||
        // user.lastName.toLowerCase().includes(search) ||
        // user.email.toLowerCase().includes(search)
      })
      .sort((a, b) => {
        if (isAscending) {
          return a._id > b._id ? 1 : -1;
        } else {
          return a._id < b._id ? 1 : -1;
        }
      });
  return (
    <>
      <div className="w-full space-y-2 rounded-xl bg-[#F8F8F8] p-4 select-none">
        <div className="w-full h-fit flex flex-col lg:flex-row justify-between">
          <div className="w-fit font-semibold">Customer Details</div>
          <div className="w-fit h-fit flex-between gap-2">
            <div className="w-fit flex-center gap-1 cursor-pointer bg-white border border-primary py-1 px-2">
              <IoSearchOutline size={20} className="text-primary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                placeholder="Search by name or email"
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
        <div className="relative w-full h-fit max-h-[72vh] border border-gray-300 rounded-2xl overflow-auto">
          <table className="w-full bg-white rounded-2xl">
            <thead className="sticky top-0 bg-[#EAEAEA] shadow-sm z-10">
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Profile</th>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">Registration</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    router.push(`/admin/customers/user/${user._id}`)
                  }
                  className="h-fit group border-b cursor-pointer hover:bg-[#ffb43335] ease-in-out duration-300"
                >
                  <td className="px-4 py-2">
                    <Image
                      src={user.profile ?? "/logo.png"}
                      alt="profile"
                      width={200}
                      height={200}
                      className="rounded-full w-10 h-10 object-cover group-hover:shadow-lg ease-in-out duration-300"
                    />
                  </td>
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">
                    {formatTimestamp(user.createdAt)}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone_number ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
