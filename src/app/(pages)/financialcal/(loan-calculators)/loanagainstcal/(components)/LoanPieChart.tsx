"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LoanPieChartProps {
  loanAmount: number;
  emi: number;
  totalInterest: number;
}

export function LoanPieChart({
  loanAmount,
  emi,
  totalInterest,
}: LoanPieChartProps) {
  const data = {
    labels: ["Loan Amount", "EMI", "Total Interest"],
    datasets: [
      {
        data: [loanAmount, emi, totalInterest],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={data} />
    </div>
  );
}
