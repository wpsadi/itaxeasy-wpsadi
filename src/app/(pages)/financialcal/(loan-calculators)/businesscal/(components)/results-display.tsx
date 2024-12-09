import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { formatINRCurrency } from "../(lib)/format-currency";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultsDisplayProps {
  results: {
    emi: number;
    loanAmount: number;
    totalInterest: number;
    totalAmount: number;
  };
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const data = {
    labels: ["Loan Amount", "Total Interest"],
    datasets: [
      {
        data: [results.loanAmount, results.totalInterest],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Pie data={data} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>EMI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatINRCurrency(results.emi)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatINRCurrency(results.totalInterest)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatINRCurrency(results.totalAmount)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
