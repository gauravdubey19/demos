"use client";

import React, { useEffect, useState } from "react";
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
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Order } from "@/context/GlobalProvider";
import { OrderTable } from "../Customers/CustomersDetail";

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
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomersOrders = async () => {
      try {
        const ordersRes = await fetch(`/api/orders/get-all-orders`);
        const data = await ordersRes.json();
        // console.log(data);

        setCustomerOrders(data as Order[]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user collections:", error);
      }
    };

    if (customerOrders.length === 0) fetchCustomersOrders();
  }, [customerOrders]);

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
        <div className="w-full h-[calc(100vh-90px)] space-y-4 p-4 overflow-y-auto">
          <OrderChart />
          <OrderTable
            orderPage="all-orders"
            orders={customerOrders}
            isLoading={isLoading}
          />
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
        data: [45, 35, 25, 20, 10],
        backgroundColor: [
          "#FFB433",
          "#FFC766",
          "#FFC766a5",
          "#ffdb9c9a",
          "#FFEDCE",
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
          label: (context: any) => ` ${context.label}: ${context.raw}%`, // Show percentage in tooltip
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
        <div className="chart-container h-full bg-[#F8F8F8] shadow-md rounded-lg p-4 hover:shadow-lg ease-in-out duration-300 overflow-hidden">
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-gray-500">Year 2020</p>
          <Line data={totalOrdersData} options={lineChartOptions} />
        </div>

        {/* Top Selling Categories Pie Chart */}
        <div className="chart-container h-fit lg:h-[50vh] bg-[#F8F8F8] shadow-md rounded-lg p-4 hover:shadow-lg ease-in-out duration-300 overflow-hidden">
          <h2 className="text-xl font-bold">Top Selling Categories</h2>
          <div className="relative w-full h-fit flex-center">
            <Pie
              data={topSellingCategoriesData}
              options={pieChartOptions}
              className="w-full h-fit lg:scale-125"
            />
          </div>
        </div>
      </div>
    </>
  );
};
