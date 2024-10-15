

import React from 'react';
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AnalysisProps {
    data: {
        answeredCount: number;
        unansweredCount: number;
        total: number;
    };
}

const Analysis = ({ data }: AnalysisProps) => {

    // Use the data from props for the chart
    const pieChartData = {
        labels: ["Answered Queries", "Unanswered Queries"],
        datasets: [
            {
                label: "Queries",
                // Map the answered and unanswered counts to the chart data
                data: [data.answeredCount, data.unansweredCount],
                backgroundColor: ["#fdd899", "#ffb433"],
                hoverOffset: 4,
            },
        ],
    };

    const pieChartOptions: ChartOptions<"pie"> = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.label}: ${context.raw} queries`, // Show query count in tooltip
                },
                backgroundColor: "#FFAC28", // Tooltip background color
                bodyFont: { size: 12 },
                bodyColor: "#fff", // White text for tooltip
                padding: 8,
            },
        },
        animation: {
            duration: 2000, // Animation duration in milliseconds
            easing: "easeInOutQuart", // Animation easing function
        },
    };

    return (
        <div className="bg-[#f8f8f8] p-6 rounded-lg shadow-md mb-6 border">
            <h2 className="text-xl font-semibold mb-4">Queries Analysis</h2>
            <div className="flex items-center">
                <div className="w-1/3 h-40 pl-20">
                    <Pie data={pieChartData} options={pieChartOptions} />
                </div>
                <div className="w-2/3 pl-4">
                    <p className="flex items-center mb-2">
                        <span className="inline-block w-3 h-3 bg-orange-300 rounded-full mr-2"></span>
                        No. of unanswered queries: <span className="ml-auto">{data.unansweredCount}</span>
                    </p>
                    <p className="flex items-center mb-2">
                        <span className="inline-block w-3 h-3 bg-yellow-300 rounded-full mr-2"></span>
                        No. of answered queries: <span className="ml-auto">{data.answeredCount}</span>
                    </p>
                    <hr className="my-2" />
                    <p className="flex items-center">
                        Total Queries: <span className="ml-auto">{data.total}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Analysis;
