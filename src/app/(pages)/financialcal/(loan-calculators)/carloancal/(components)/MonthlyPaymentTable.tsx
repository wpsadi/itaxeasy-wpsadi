"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatCurrency } from "../(utils)/formatCurrency";

interface MonthlyPayment {
  month: number;
  openingBalance: number;
  emi: number;
  interest: number;
  principal: number;
  closingBalance: number;
}

interface MonthlyPaymentTableProps {
  payments: MonthlyPayment[];
}

export function MonthlyPaymentTable({ payments }: MonthlyPaymentTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 12;

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const totalPages = Math.ceil(payments.length / paymentsPerPage);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Opening Balance</TableHead>
            <TableHead>EMI</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Principal</TableHead>
            <TableHead>Closing Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPayments.map((payment) => (
            <TableRow key={payment.month}>
              <TableCell>{payment.month}</TableCell>
              <TableCell>{formatCurrency(payment.openingBalance)}</TableCell>
              <TableCell>{formatCurrency(payment.emi)}</TableCell>
              <TableCell>{formatCurrency(payment.interest)}</TableCell>
              <TableCell>{formatCurrency(payment.principal)}</TableCell>
              <TableCell>{formatCurrency(payment.closingBalance)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
