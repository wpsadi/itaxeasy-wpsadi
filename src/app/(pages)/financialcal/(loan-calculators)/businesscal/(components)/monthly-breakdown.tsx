"use client";

import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatINRCurrency } from "../(lib)/format-currency";


export interface MonthlyBreakdownProps {
  monthlyData: Array<{
    month: number;
    emi: number;
    towards_loan: number;
    towards_interest: number;
    outstanding_loan: number;
  }>;
}

export function MonthlyBreakdown({ monthlyData }: MonthlyBreakdownProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(monthlyData.length / itemsPerPage);

  const paginatedData = monthlyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Monthly Breakdown</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>EMI</TableHead>
              <TableHead>Towards Loan</TableHead>
              <TableHead>Towards Interest</TableHead>
              <TableHead>Outstanding Loan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((data) => (
              <TableRow key={data.month}>
                <TableCell>{data.month}</TableCell>
                <TableCell>{formatINRCurrency(data.emi)}</TableCell>
                <TableCell>{formatINRCurrency(data.towards_loan)}</TableCell>
                <TableCell>
                  {formatINRCurrency(data.towards_interest)}
                </TableCell>
                <TableCell>
                  {formatINRCurrency(data.outstanding_loan)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "disabled" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={currentPage === totalPages ? "disabled" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
