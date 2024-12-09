"use client";

import { Chart, ChartConfiguration } from "chart.js/auto";
import { useEffect, useRef } from "react";

interface ChartDisplayProps {
  principal: number;
  totalInterest: number;
}

export function ChartDisplay({ principal, totalInterest }: ChartDisplayProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const config: ChartConfiguration = {
          type: "doughnut",
          data: {
            labels: ["Principal amount", "Total interest"],
            datasets: [
              {
                data: [principal, totalInterest],
                backgroundColor: ["#3b82f6", "#93c5fd"],
                borderColor: "#ffffff",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
          },
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [principal, totalInterest]);

  return (
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
