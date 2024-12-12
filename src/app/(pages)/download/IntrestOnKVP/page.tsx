import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function IntrestOnKVP() {
  return (
    <div className=" p-8 bg-white">
      <h1 className="text-2xl text-center">Interest on Kisan Vikas Patra</h1>
      <div className="flex justify-end">
        <Button className="bg-blue-500 text-white" variant={"secondary"}>
          Download PDF
        </Button>
      </div>
      <div className="container flex m-10">
        <Table className="table-auto border-collapse border border-gray-500 text-lg">
          <TableHeader className="bg-blue-500 text-white">
            <TableRow className="border-b border-gray-500 h-24">
              <TableHead className="text-white border border-gray-500">
                Period From the Date of certificate to the date of its
                encashment
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                1st Year
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                2nd Year
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                2 Years and 6 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                3rd Year
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                3 Years and 6 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                4th Year
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                4 Years and 6 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                5th Year
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                5 Years and 6 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                6th Year
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                6 Years and 6 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                7 Years
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                7 Years and 3 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                7 Years and 6 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                7 Years and 8 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                8 Years
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                8 Years and 4 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                8 Years and 6 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                8 Years and 7 Months
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                9 Years
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500">
                Certificate purchased on or after 02-09-1993 but before
                01-01-1999
              </TableCell>
              <TableCell className="border border-gray-500">
                Purchased from 2.9.1993 to 31.12.1998
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500">
                Certificate purchased on or after 01-01-1999
              </TableCell>
              <TableCell className="border border-gray-500">
                Purchased from 7 years and 6 Months
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
              <TableCell className="border border-gray-500">
                TableValue1
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p className="text-center text-purple-700 text-lg">
        [As amended by Finance Act, 2022]
      </p>
    </div>
  );
}
