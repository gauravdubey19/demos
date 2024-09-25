"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Line, Pie } from "react-chartjs-2";
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
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";

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

const Orders = () => {
  const yearOption = [
    new Date().getFullYear() - 3,
    new Date().getFullYear() - 2,
    new Date().getFullYear() - 1,
    new Date().getFullYear(),
  ];
  const [year, setYear] = useState<number>(new Date().getFullYear());

  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="w-full h-fit flex-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Order Analysis
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
          <OrderChart />
          <OrdersTable />
        </div>
      </section>
    </>
  );
};

export default Orders;

const OrderChart = () => {
  // Data for Total Orders line chart
  const totalOrdersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Orders",
        data: [2500, 1150, 3000, 1450, 2700, 1300, 2400],
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

  // Data for Top Selling Categories pie chart
  const topSellingCategoriesData = {
    labels: ["Pants & Shirts", "Sherwanis", "Kurtas", "Pajamas", "Suits"],
    datasets: [
      {
        label: "Top Categories",
        data: [12, 15, 10, 48, 15],
        backgroundColor: [
          "#FFAC28",
          "#FF6B6B",
          "#4BC0C0",
          "#FFD700",
          "#6A67CE",
        ],
        hoverOffset: 4,
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

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10, // Small box for legend items
          // fontSize: 12, // Consistent font size for legend
          padding: 10, // Padding around legend items
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}%`, // Show percentage in tooltip
        },
        backgroundColor: "#FFAC28", // Tooltip background color
        bodyFont: { size: 12 },
        bodyColor: "#fff", // White text for tooltip
        padding: 8,
      },
    },
  };

  return (
    <>
      <div className="w--full h-fit grid grid-cols-1 lg:grid-cols-2 gap-6 drop-shadow-md rounded-lg overflow-hidden">
        {/* Total Orders Line Chart */}
        <div className="chart-container h-full bg-[#F8F8F8] shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-gray-500">Year 2020</p>
          <Line data={totalOrdersData} options={lineChartOptions} />
        </div>

        {/* Top Selling Categories Pie Chart */}
        <div className="chart-container h-[50vh] bg-[#F8F8F8] shadow-md rounded-lg p-4 overflow-hidden">
          <h2 className="text-xl font-bold">Top Selling Categories</h2>
          <div className="relative w-full h-full flex-center">
            <Pie
              data={topSellingCategoriesData}
              options={pieChartOptions}
              className="w-full h-full scale-125"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const OrdersTable = () => {
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const statusOption = ["all", "delivered", "pending", "shipped"];
  const [status, setStatus] = useState<string>(statusOption[0]);
  const [search, setSearch] = useState<string>("");

  const filteredOrders = orders
    .filter(
      (order) =>
        order.orderID.includes(search) ||
        order.customer.includes(search.toLowerCase())
    )
    .filter((order) => (status === "all" ? true : order.status === status))
    .sort((a, b) => {
      if (isAscending) {
        return a.orderID > b.orderID ? 1 : -1;
      } else {
        return a.orderID < b.orderID ? 1 : -1;
      }
    });
  return (
    <div className="w-full space-y-2 rounded-xl bg-[#F8F8F8] p-4 select-none">
      <div className="w-full h-fit flex-between">
        <div className="w-fit font-semibold">Order Details</div>
        <div className="w-fit h-fit flex-between gap-2">
          {/* Search Bar */}
          <div className="w-fit flex-center gap-1 cursor-pointer bg-white border border-primary py-1 px-2">
            <IoSearchOutline size={20} className="text-primary" />
            <input
              type="text"
              placeholder="Search by Order ID or Customer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 placeholder:text-primary bg-none border-none outline-none"
            />
          </div>

          <div className="relative group w-fit h-fit">
            <Button className="h-fit text-white bg-primary capitalize py-1 px-3 rounded-md flex items-center">
              {status}{" "}
              <MdOutlineKeyboardArrowDown
                size={20}
                className="ml-1 group-hover:-rotate-180 ease-in-out duration-300"
              />
            </Button>
            <div className="hidden group-hover:block animate-slide-down absolute left-0 right-0 -bottom-[25.5vh] z-40 w-full min-w-fit h-fit bg-slate-200 shadow-md rounded-md overflow-hidden">
              {statusOption.map((sp, index) => (
                <div
                  key={index}
                  onClick={() => setStatus(sp)}
                  className={`w-full cursor-pointer capitalize p-2 border-b border-b-slate-300 ${
                    status === sp && "text-primary bg-slate-100"
                  } hover:text-primary ease-in-out duration-300`}
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

      <div className="relative w-full h-fit max-h-[72vh] border border-gray-300 rounded-2xl overflow-auto">
        <table className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
          <thead className="sticky top-0 bg-[#EAEAEA] shadow-sm z-10">
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Order</th>
              <th className="px-4 py-2 text-left">Shipping</th>
              <th className="px-4 py-2 text-left">Delivery</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className="h-fit group border-b cursor-pointer hover:bg-[#ffb43335] ease-in-out duration-300"
              >
                <td>
                  <Link
                    href={`/admin/orders/order/${order.orderID}`}
                    className="text-primary px-4 py-2 hover:underline underline-offset-4"
                  >
                    {order.orderID}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/admin/customers/user/${order.customer}`}
                    className="px-4 py-2 hover:underline underline-offset-4"
                  >
                    {order.customer}
                  </Link>
                </td>
                <td className="px-4 py-2">{order.orderDate}</td>
                <td className="px-4 py-2">{order.shippingDate || "-"}</td>
                <td className="px-4 py-2">{order.deliveryDate || "-"}</td>
                <td className="px-4 py-2">₹ {order.price}</td>
                <td
                  className={`px-4 py-2 ${
                    order.status === "delivered"
                      ? "text-green-600"
                      : order.status === "pending"
                      ? "text-orange-500"
                      : "text-blue-600"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const orders = [
  {
    orderID: "012345",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012346",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "-",
    deliveryDate: "-",
    price: 100000,
    status: "pending",
  },
  {
    orderID: "012347",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012346",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "-",
    deliveryDate: "-",
    price: 100000,
    status: "pending",
  },
  {
    orderID: "012347",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012347",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012347",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012347",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
  {
    orderID: "012347",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "-",
    price: 2400,
    status: "shipped",
  },
  {
    orderID: "012348",
    customer: "Gojo",
    orderDate: "24-10-2020",
    shippingDate: "28-10-2020",
    deliveryDate: "29-10-2020",
    price: 2400,
    status: "delivered",
  },
];
