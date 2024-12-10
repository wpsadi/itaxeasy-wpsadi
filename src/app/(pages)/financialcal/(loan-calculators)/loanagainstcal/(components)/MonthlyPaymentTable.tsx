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
  return (
    <div className="overflow-x-auto">
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
          {payments.map((payment) => (
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
    </div>
  );
}
