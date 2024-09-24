"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { PiCubeLight } from "react-icons/pi";
import { BsCartCheck } from "react-icons/bs";
import { GiProgression } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi2";
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

const Dashboard = () => {
  const { data: session } = useSession();

  const totals = [
    {
      head: "Total Products",
      value: "₹ 20.1K",
      color: "#704324",
      icon: PiCubeLight,
    },
    {
      head: "Total Orders",
      value: "2.48K",
      color: "#2cd369",
      icon: BsCartCheck,
    },
    {
      head: "Total Sales",
      value: "20.81K",
      color: "#962cd3",
      icon: GiProgression,
    },
    {
      head: "Total Customers",
      value: "6,584",
      color: "#1743BE",
      icon: HiOutlineUsers,
    },
  ];

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
      tooltip: {
        enabled: true,
        backgroundColor: "#3D2C8D", // Dark purple background for tooltip
        titleFont: { size: 14 },
        titleColor: "#fff",
        bodyFont: { size: 12 },
        bodyColor: "#fff",
        padding: 8,
        displayColors: false, // Remove color box in tooltips
        callbacks: {
          label: (context: any) => `${context.raw}`, // Show raw data
        },
      },
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
        borderColor: "#FFAC28", // Line color
        fill: "start", // Fill below the line
        backgroundColor: "rgba(255, 172, 40, 0.1)", // Gradient background for line fill
      },
      point: {
        radius: 5,
        borderWidth: 2,
        backgroundColor: "#FFAC28",
        borderColor: "#FFFFFF", // White border around points
        hoverRadius: 8, // Larger hover effect
        hoverBackgroundColor: "#3D2C8D", // Purple on hover
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
      <section className="w-full h-full overflow-hidden bg-[]">
        <div className="space-y-2 p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Welcome Back{" "}
            {session?.user?.name ? session?.user?.name.split(" ")[0] : "Admin"},
          </h2>
          <p>Here’s what happening with your store today.</p>
        </div>
        <div className="w-full h-[81.5vh] overflow-y-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-4">
            {totals.map((t, index) => (
              <div
                key={index}
                className="w-full md:w-60 lg:w-52 xl:w-60 h-32 flex items-center gap-2 p-2 shadow-2xl rounded-xl hover:shadow-primary ease-in-out duration-300"
              >
                <div
                  className="h-full w-1"
                  style={{ backgroundColor: t.color }}
                />
                <div className="relative w-full h-full flex justify-between gap-2">
                  <div className="space-y-2">
                    <p className="text-sm md:text-md xl:text-lg">{t.head}</p>
                    <p
                      className="text-4xl md:text-3xl xl:text-4xl font-semibold"
                      style={{ color: t.color }}
                    >
                      {t.value}
                    </p>
                  </div>
                  <div className="w-fit h-full flex-center">
                    <t.icon color={t.color} size={40} />
                  </div>
                  <div className="absolute bottom-0 left-0 text-xs md:text-sm xl:text-md">
                    Year {new Date().getFullYear()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4">
            {/* charts section */}
            <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
              {/* Total Orders Line Chart */}
              <div className="chart-container h-full bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold">Total Orders</h2>
                <p className="text-gray-500">Year 2020</p>
                <Line data={totalOrdersData} options={lineChartOptions} />
              </div>

              {/* Top Selling Categories Pie Chart */}
              <div className="chart-container h-[50vh] bg-white shadow-md rounded-lg p-4 overflow-hidden">
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
            {/* Total Customers Line Chart */}
            <div className="chart-container w-full h-fit bg-white drop-shadow-md rounded-lg p-4 overflow-hidden">
              <h2 className="text-xl font-bold">Total Customers</h2>
              <p className="text-gray-500">Year 2020</p>
              <div className="relative w-full h-[65vh] flex-center">
                <Line
                  data={totalCustomersData}
                  options={lineChartOptions}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
