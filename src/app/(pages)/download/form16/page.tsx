"use client"

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
  import { useState, ChangeEvent } from 'react';

  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";


import { FiPlus, FiMinus } from 'react-icons/fi';

export default function Page(){

    interface RowData {
        quarter: string;
        code: string;
        amountPaid: number;
        taxDeducted: number;
        taxDeposited: number;
      }
    
    //   const initialLines = [
    //     {
    //       col1: '',
    //       col2: '',
    //       col3: '',
    //       col4: '',
    //       col5: '',
    //       col6: '',
    //     },
    //   ];
    
    //   const [lines, setLines] = useState(initialLines);
    
    //   // Add a new line
    //   const addLine = () => {
    //     setLines((prevLines) => [
    //       ...prevLines,
    //       {
    //         col1: '',
    //         col2: '',
    //         col3: '',
    //         col4: '',
    //         col5: '',
    //         col6: '',
    //       },
    //     ]);
    //   };
    
    //   // Remove a line
    //   const removeLine = (index: number) => {
    //     setLines((prevLines) => prevLines.filter((_, i) => i !== index));
    //   };


    const BreakupAmount6AinitialLines = [
        {
          col1: '',
          col2: '',
          col3: '',
          col4: '',
          col5: '',
          col6: '',
        },
      ];
    
      const [BreakupAmount6Alines, BreakupAmount6AsetLines] = useState(BreakupAmount6AinitialLines);
    
      // Add a new line
      const BreakupAmount6AaddLine = () => {
        BreakupAmount6AsetLines((prevLines) => [
          ...prevLines,
          {
            col1: '',
            col2: '',
            col3: '',
            col4: '',
            col5: '',
            col6: '',
          },
        ]);
      };
    
      // Remove a line
      const BreakupAmount6AremoveLine = (index: number) => {
        BreakupAmount6AsetLines((prevLines) => prevLines.filter((_, i) => i !== index));
      };


    const BreakupAmount10initialLines = [
        {
          col1: '',
          col2: '',
          col3: '',
          col4: '',
          col5: '',
          col6: '',
        },
      ];
    
      const [BreakupAmount10lines, BreakupAmount10setLines] = useState(BreakupAmount10initialLines);
    
      // Add a new line
      const BreakupAmount10addLine = () => {
        BreakupAmount10setLines((prevLines) => [
          ...prevLines,
          {
            col1: '',
            col2: '',
            col3: '',
            col4: '',
            col5: '',
            col6: '',
          },
        ]);
      };
    
      // Remove a line
      const BreakupAmount10removeLine = (index: number) => {
        BreakupAmount10setLines((prevLines) => prevLines.filter((_, i) => i !== index));
      };




            const CentralGovtChallaninitialLines = [
        {
          col1: '',
          col2: '',
          col3: '',
          col4: '',
          col5: '',
          col6: '',
        },
      ];
    
      const [CentralGovtChallanlines, CentralGovtChallansetLines] = useState(CentralGovtChallaninitialLines);
    
      // Add a new line
      const CentralGovtChallanaddLine = () => {
        CentralGovtChallansetLines((CentralGovtChallanprevLines) => [
          ...CentralGovtChallanprevLines,
          {
            col1: '',
            col2: '',
            col3: '',
            col4: '',
            col5: '',
            col6: '',
          },
        ]);
      };
    
      // Remove a line
      const CentralGovtChallanremoveLine = (index: number) => {
        CentralGovtChallansetLines((prevLines) => prevLines.filter((_, i) => i !== index));
      };




    const initialCentralGovtTaxLines = [
        {
          col1: '',
          col2: '',
          col3: '',
          col4: '',
          col5: '',
          col6: '',
        },
      ];
    
      const [CentralGovtTaxlines, CentralGovtTaxSetLines] = useState(initialCentralGovtTaxLines);
    
      // Add a new line
      const CentralGovtTaxSetLinesaddLine = () => {
        CentralGovtTaxSetLines((prevLines) => [
          ...prevLines,
          {
            col1: '',
            col2: '',
            col3: '',
            col4: '',
            col5: '',
            col6: '',
          },
        ]);
      };
    
      // Remove a line
      const removeCentralGovtTaxLine = (index: number) => {
        CentralGovtTaxSetLines((prevLines) => prevLines.filter((_, i) => i !== index));
      };



    const handleDownloadPDF = async () => {
        const element = document.querySelector("#form16") as HTMLElement | null;
    
        if (element) {
            const canvas = await html2canvas(element, { scale: 2 }) ; // Increase scale for better quality
            const imgData = canvas.toDataURL("image/png");
    
            const pdf = new jsPDF("p", "mm", "a4"); // Create a new PDF in A4 size
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
    
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
    
            const imgHeightInPDF = (canvasHeight * pdfWidth) / canvasWidth; // Scaled height to fit PDF width
            let remainingHeight = canvasHeight;
            let position = 0;
    
            // Add the table to the PDF page by page
            while (remainingHeight > 0) {
                const sliceCanvas = document.createElement("canvas"); // Create a new canvas for each slice
                sliceCanvas.width = canvasWidth;
                sliceCanvas.height = Math.min(canvasHeight, pdfHeight * (canvasWidth / pdfWidth)); // Slice height based on page height
    
                const ctx = sliceCanvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(
                        canvas,
                        0,
                        position, // Start drawing from the current position
                        canvasWidth,
                        sliceCanvas.height, // Draw only the visible part
                        0,
                        0,
                        canvasWidth,
                        sliceCanvas.height
                    );
    
                    const slicedImgData = sliceCanvas.toDataURL("image/png");
                    pdf.addImage(
                        slicedImgData,
                        "PNG",
                        0,
                        0,
                        pdfWidth,
                        (sliceCanvas.height * pdfWidth) / canvasWidth
                    );
    
                    remainingHeight -= sliceCanvas.height;
                    position += sliceCanvas.height;
    
                    if (remainingHeight > 0) {
                        pdf.addPage(); // Add a new page if there's more content
                    }
                }
            }
    
            pdf.save("form16Table.pdf"); // Download the PDF
        } else {
            console.error("Table element not found");
        }
    };
    
    const initialData: RowData[] = ['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, index) => ({
        quarter,
        code: `QUOXNNMG${index + 1}`,
        amountPaid: 1790258.36,
        taxDeducted: 468246.0,
        taxDeposited: 468246.0,
      }));
    
      const [rows, setRows] = useState<RowData[]>(initialData);

        // Calculate the totals for the columns dynamically
        const calculateTotal = (field: keyof RowData): number => {
            return rows.reduce((total, row) => total + (typeof row[field] === 'number' ? row[field] : 0), 0);
        };

        // Handle input change for each row
        const handleInputChange = (
            e: ChangeEvent<HTMLInputElement>, 
            index: number, 
            field: keyof RowData
          ) => {
            const updatedRows = [...rows]; // Explicitly typing updatedRows as RowData[]
            
            // Convert the input value to a number if it's not NaN
            const newValue = parseFloat(e.target.value) || 0; // Ensure it's a number (0 if invalid)
        
            updatedRows[index] = { ...updatedRows[index], [field]: newValue }; // Properly update the field in the row
            setRows(updatedRows);
          };

    return (
    <div className=" p-8 bg-white" >
        <div className="flex justify-start">
            <Button className="bg-blue-500 text-white" variant={"secondary"} onClick={handleDownloadPDF}>Download PDF</Button>
        </div>
        <div className="container flex m-10" id="form16">

        <Table className="border border-neutral-900">
      {/* Table Caption */}
      <TableCaption className="text-center font-semibold">FORM NO. 16</TableCaption>

      {/* Table Header */}
      <TableHeader>
        <TableRow>
          <TableCell className="text-center font-semibold" colSpan={12}>
            <h6>[See rule 31(1)(a)]</h6>
          </TableCell>
          <TableCell>

          </TableCell>
          <TableCell>
            
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-center text-lg font-bold" colSpan={12}>
            <h6>PART A</h6>
          </TableCell>
          <TableCell>
        </TableCell>
        <TableCell>            
        </TableCell>
        <TableCell>            
        </TableCell>
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        <TableRow>
          <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 text-center" colSpan={12}>
            Certificate under section 203 of the Income-tax Act, 1961 for tax
            deducted at source on salary paid to an employee under section 192
            or pension/interest income of specified senior citizen under
            section 194P
          </TableCell>
          <TableCell>
        </TableCell>
        <TableCell>            
        </TableCell>
        <TableCell>            
        </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="text-sm font-bold text-gray-900" colSpan={3}>
            Certificate No.
            <input
              className="ml-2 outline-none text-neutral-800 font-medium bg-white"
              placeholder="Enter Certificate No."
            />
          </TableCell>
          <TableCell className="text-sm font-bold text-gray-900" colSpan={12}>
            Last updated on
            <input
              className="ml-2 outline-none text-neutral-800 font-medium bg-white"
              placeholder="Enter Last Updated Date"
            />
          </TableCell>
        <TableCell>            
        </TableCell>
        <TableCell>            
        </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="text-sm font-bold text-gray-900" colSpan={3}>
            Name and address of the Employer/Specified Bank
          </TableCell>
          <TableCell className="text-sm font-bold text-gray-900" colSpan={12}>
            Name and address of the Employee/Specified senior citizen
          </TableCell>
          <TableCell>            
        </TableCell>
        <TableCell>            
        </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={3}>
            <textarea
              className="w-full h-28 resize-none px-2 py-4 border-0 hover:border-2 text-sm text-neutral-500 font-medium"
              placeholder="Employer Address"
            />
          </TableCell>
          <TableCell colSpan={12}>
            <textarea
              className="w-full h-28 resize-none px-2 py-4 border-0 hover:border-2 outline-none text-sm text-neutral-500 font-medium"
              placeholder="Employee Address"
            />
          </TableCell>
          <TableCell>          
        </TableCell>
        <TableCell>            
        </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="text-sm font-bold text-gray-900">
            PAN of the Deductor
          </TableCell>
          <TableCell className="text-sm font-bold text-gray-900">
            TAN of the Deductor
          </TableCell>
          <TableCell className="text-sm font-bold text-gray-900">
            PAN of the Employee/Specified senior citizen
          </TableCell>
          <TableCell className="text-sm font-bold text-gray-900" colSpan={12}>
            Employee Reference No. provided by the Employer/Pension Payment
            order no. provided by the Employer (If available)
          </TableCell>
          <TableCell>          
          </TableCell>
          <TableCell>

          </TableCell>
        </TableRow>

        {/* New Rows */}
        <TableRow>
          <TableCell className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600">
            <input
              className="focus:outline no-border w-full text-neutral-500 font-medium text-left bg-white"
              placeholder="Enter PAN of the Deductor"
            />
          </TableCell>
          <TableCell className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600">
            <input
              className="focus:outline-none no-border w-full text-neutral-500 font-medium text-left bg-white"
              placeholder="Enter TAN of the Deductor"
            />
          </TableCell>
          <TableCell className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600">
            <input
              className="focus:outline-none no-border w-full text-neutral-500 font-medium text-left bg-white"
              placeholder="Enter PAN of the Employee"
            />
          </TableCell>
          <TableCell className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600" colSpan={15}>
            <input
              className="focus:outline-none no-border w-full text-neutral-500 font-medium text-left bg-white"
              placeholder="Enter Employee Reference No."
            />
          </TableCell>
        </TableRow>



        <TableRow>
          <TableCell className="text-sm font-bold text-gray-900 col-span-2 border border-neutral-600">
            CIT (TDS)
          </TableCell>
          <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600">
            Assessment Year
          </TableCell>
          <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600" colSpan={15}>
            Period with the Employer
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="text-sm font-medium text-neutral-500 col-span-4 border border-neutral-600">
            <textarea
              className="border-0 hover:border-2 w-full text-neutral-500 px-2 py-4 h-28 resize-none text-justify outline-none"
              placeholder="Enter CIT (TDS)"
            />
          </TableCell>
          <TableCell className="px-2 py-4 text-sm font-medium text-neutral-500 col-span-2 border border-neutral-600">
            <input
              className="w-full border-0 hover:border-2 text-neutral-500 font-medium text-left bg-white"
              placeholder="Enter Assessment Year"
            />
          </TableCell>
          <TableCell className="py-4 text-sm font-bold text-gray-900 col-span-1 border border-neutral-600" colSpan={2}>
            From
            <input
              className="mx-2 w-3/4 outline-none border-0 hover:border-2 text-neutral-500 font-medium text-center bg-white"
              placeholder="From"
            />
          </TableCell>
          <TableCell className=" py-4 text-sm font-bold text-gray-900 col-span-1 border border-neutral-600" colSpan={14}>
            To
            <input
              className="w-4/5 mx-2 border-0 hover:border-2 outline-none text-neutral-500 font-medium text-center py-4 bg-white"
              placeholder="To"
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600 text-center" colSpan={18}>
            Summary of amount paid/credited and tax deducted at source
            thereon in respect of the employee
          </TableCell>
        </TableRow>
        <TableRow>
  <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600 pt-5">
    Quarter(s)
  </TableCell>
  <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600 text-justify" >
    Receipt Numbers of original quarterly statements of TDS under sub-section (3) of Section 200
  </TableCell>
  <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600">
    Amount paid/credited
  </TableCell>
  <TableCell className="px-2 py-4 text-sm font-bold text-gray-950 border border-neutral-600">
    Amount of tax deducted(Rs.)
  </TableCell>
  <TableCell className="px-2 py-4 text-sm font-bold text-gray-950 border border-neutral-600 text-justify" colSpan={18}>
    Amount of tax deposited / remitted Amount paid/credited (Rs.)
  </TableCell>
</TableRow>
{rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="px-2 py-4 text-sm font-bold text-gray-950 border border-neutral-600 text-justify">
              <input
                className="focus:outline-none border-0 hover:border-2 text-neutral-500 font-medium text-left bg-white"
                type="text"
                defaultValue={row.quarter}
              />
            </TableCell>
            <TableCell className="px-2 py-4 text-sm font-bold text-gray-950 border border-neutral-600 text-justify" >
              <input
                className="focus:outline-none border-0 hover:border-2 text-neutral-500 font-medium text-left bg-white"
                type="text"
                defaultValue={row.code}
              />
            </TableCell>
            <TableCell className="px-2 py-4 text-sm font-bold text-gray-950 border border-neutral-600 text-justify" >
              <input
                className="focus:outline-none border-0 hover:border-2 w-full text-neutral-500 font-medium text-left bg-white"
                type="number"
                value={row.amountPaid}
                onChange={(e) => handleInputChange(e, index, 'amountPaid')}
              />
            </TableCell>
            <TableCell className="px-2 py-4 text-sm font-bold text-gray-950 border border-neutral-600 text-justify" >
              <input
                className="focus:outline-none border-0 hover:border-2 w-full text-neutral-500 font-medium text-left bg-white"
                type="number"
                value={row.taxDeducted}
                onChange={(e) => handleInputChange(e, index, 'taxDeducted')}
              />
            </TableCell>
            <TableCell colSpan={18} className="px-2 py-4 text-sm font-bold text-gray-950 border border-neutral-600 text-justify" >
              <input
                className="focus:outline-none border-0 hover:border-2 w-full text-neutral-500 font-medium text-left bg-white"
                type="number"
                value={row.taxDeposited}
                onChange={(e) => handleInputChange(e, index, 'taxDeposited')}
              />
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="font-bold text-gray-900 text-left">Total</TableCell>
          <TableCell></TableCell>
          <TableCell>
            <input
              type="number"
              value={calculateTotal('amountPaid')}
              className="outline-none w-full bg-white"
              readOnly
            />
          </TableCell>
          <TableCell>
            <input
              type="number"
              value={calculateTotal('taxDeducted')}
              className="outline-none w-full bg-white"
              readOnly
            />
          </TableCell>
          <TableCell colSpan={18}>
            <input
              type="number"
              value={calculateTotal('taxDeposited')}
              className="outline-none w-full bg-white"
              readOnly
            />
          </TableCell>
        </TableRow>
<TableRow>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 text-center" colSpan={17}>
    I. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL GOVERNMENT ACCOUNT THROUGH BOOK ADJUSTMENT
    <p className="text-xs text-neutral-500">
      (The deductor to provide payment-wise details of tax deducted and deposited with respect to the deductee)
    </p>
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="text-center text-sm font-bold text-gray-900 border border-neutral-600" rowSpan={2} colSpan={1}>
    Sl. No
  </TableCell>
  <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600 text-center " rowSpan={2}>
    Tax Deposited in respect of the deductee (Rs.)
  </TableCell>
  <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600 text-center" rowSpan={1} colSpan={18}>
      Book Identification Number (BIN)
  </TableCell>
</TableRow>

<TableRow>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600">
            Receipt Numbers of Form No. 24G
        </TableCell>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600  ">
            DDO serial number in Form no.24G
        </TableCell>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600  ">
            Date of transfer voucher (dd/mm/yyyy)
        </TableCell>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600 " colSpan={14}>
            Status of matching with Form no. 24G
        </TableCell>
</TableRow>    




{/* *****data2***** */}

{CentralGovtTaxlines.map((line, index) => (
        <TableRow key={index}>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-1" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col1}
              onChange={(e) => {
                const updatedLines = [...CentralGovtTaxlines];
                updatedLines[index].col1 = e.target.value;
                CentralGovtTaxSetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-3" colSpan={1}>
            <input
              className="focus:outline-none text-left w-full bg-white"
              value={line.col2}
              onChange={(e) => {
                const updatedLines = [...CentralGovtTaxlines];
                updatedLines[index].col2 = e.target.value;
                CentralGovtTaxSetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col3}
              onChange={(e) => {
                const updatedLines = [...CentralGovtTaxlines];
                updatedLines[index].col3 = e.target.value;
                CentralGovtTaxSetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col4}
              onChange={(e) => {
                const updatedLines = [...CentralGovtTaxlines];
                updatedLines[index].col4 = e.target.value;
                CentralGovtTaxSetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-500 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col5}
              onChange={(e) => {
                const updatedLines = [...CentralGovtTaxlines];
                updatedLines[index].col5 = e.target.value;
                CentralGovtTaxSetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-500 col-span-2" colSpan={18}>
            <input
              className="focus:outline-none text-left no-border w-full bg-white"
              value={line.col6}
              onChange={(e) => {
                const updatedLines = [...CentralGovtTaxlines];
                updatedLines[index].col6 = e.target.value;
                CentralGovtTaxSetLines(updatedLines);
              }}
            />
            <span className="flex justify-end">
              {/* Only show the '+' button if it's the last line */}
              {index === CentralGovtTaxlines.length - 1 && (
                <FiPlus
                  onClick={CentralGovtTaxSetLinesaddLine}
                  className="cursor-pointer text-green-500 ml-2"
                  size={20}
                />
              )}
              {/* Show the '-' button for all lines except the first one */}
              {index > 0 && (
                <FiMinus
                  onClick={() => removeCentralGovtTaxLine(index)}
                  className="cursor-pointer text-red-500 ml-2"
                  size={20}
                />
              )}
            </span>
          </TableCell>
        </TableRow>
      ))}

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
    Total (Rs.)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-3 text-left">
    <input
      type="number"
      value={"Total"}
      className="outline-none w-full"
    />
  </TableCell>

</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 text-center" colSpan={18}>
    II. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL GOVERNMENT ACCOUNT THROUGH CHALLAN
    <p className="text-xs text-neutral-500">
      (The deductor to provide payment-wise details of tax deducted and deposited with respect to the deductee)
    </p>
  </TableCell>
</TableRow>


<TableRow>
  <TableCell className="px-2 py-4 text-center text-sm font-bold text-gray-900 border border-neutral-600" rowSpan={2} colSpan={1}>
    Sl. No
  </TableCell>
  <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600 text-center " rowSpan={2}>
  Tax Deposited in respect of the deductee (Rs.)
  </TableCell>
  <TableCell colSpan={18} className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600 text-center">
        Challan Identification Number (CIN)
  </TableCell>
</TableRow>

    <TableRow >
        <TableCell className="px-2 py-1 text-sm font-bold text-gray-900 border border-neutral-600">
        BSR Code of the Bank Branch
        </TableCell>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600  ">
        Date on which Tax deposited (dd/mm/yyyy)
        </TableCell>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600  ">
        Challan Serial Number
        </TableCell>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600 " colSpan={14}>
        Status of matching with OLTAS*
        </TableCell>
    </TableRow>

{CentralGovtChallanlines.map((line, index) => (
        <TableRow key={index}>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-1" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col1}
              onChange={(e) => {
                const updatedLines = [...CentralGovtChallanlines];
                updatedLines[index].col1 = e.target.value;
                CentralGovtChallansetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-3" colSpan={1}>
            <input
              className="focus:outline-none text-left w-full bg-white"
              value={line.col2}
              onChange={(e) => {
                const updatedLines = [...CentralGovtChallanlines];
                updatedLines[index].col2 = e.target.value;
                CentralGovtChallansetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col3}
              onChange={(e) => {
                const updatedLines = [...CentralGovtChallanlines];
                updatedLines[index].col3 = e.target.value;
                CentralGovtChallansetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col4}
              onChange={(e) => {
                const updatedLines = [...CentralGovtChallanlines];
                updatedLines[index].col4 = e.target.value;
                CentralGovtChallansetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-500 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col5}
              onChange={(e) => {
                const updatedLines = [...CentralGovtChallanlines];
                updatedLines[index].col5 = e.target.value;
                CentralGovtChallansetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-500 col-span-2" colSpan={18}>
            <input
              className="focus:outline-none text-left no-border w-full bg-white"
              value={line.col6}
              onChange={(e) => {
                const updatedLines = [...CentralGovtChallanlines];
                updatedLines[index].col6 = e.target.value;
                CentralGovtChallansetLines(updatedLines);
              }}
            />
            <span className="flex justify-end">
              {/* Only show the '+' button if it's the last line */}
              {index === CentralGovtChallanlines.length - 1 && (
                <FiPlus
                  onClick={CentralGovtChallanaddLine}
                  className="cursor-pointer text-green-500 ml-2"
                  size={20}
                />
              )}
              {/* Show the '-' button for all lines except the first one */}
              {index > 0 && (
                <FiMinus
                  onClick={() => CentralGovtChallanremoveLine(index)}
                  className="cursor-pointer text-red-500 ml-2"
                  size={20}
                />
              )}
            </span>
          </TableCell>
        </TableRow>
      ))}


<TableRow>
    <TableCell className="px-2 py-4 text-md font-extrabold text-gray-900 border border-neutral-600 col-span-1" colSpan={20}>
      Verification
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell className="px-10 py-10 text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-justify leading-6" colSpan={18}>
      I,{' '}
      <input
          className="text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3 ml-2 bg-white "
        /> 
      , son/daughter of
      <input
          className="text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3 ml-2 bg-white "
        /> 
      working in the capacity of{' '}
      <input
          className="text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3 ml-2 bg-white "
        /> 
      (designation) do hereby certify that a sum of Rs.{' '}
      <input
          className="text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3 ml-2 bg-white "
        /> 
      [Rs.{' '}
        <input
          className="text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3 ml-2 bg-white "
        /> 
      (in words)] has been deducted and a sum of Rs.
      <input
          className="text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3 ml-2 bg-white "
        /> {' '}
      [Rs.{' '}
        <input
          className="text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3 ml-2 bg-white "
        /> 
      ] has been deposited to the credit of the Central Government. I further
      certify that the information given above is true, complete and correct
      and is based on the books of account, documents, TDS statements, TDS
      deposited and other available records.
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left" colSpan={1}>

    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 col-span-3 text-left">
      <input
        className="border-none bg-white focus:outline-none text-left w-full"
      />
    </TableCell>
    <TableCell className="px-2 py-8 text-sm font-medium text-neutral-500 border border-neutral-600 col-span-8 row-span-2 text-left" colSpan={18}>
      (Signature of person responsible for deduction of Tax)
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 col-span-4 text-left">
      <span className="text-gray-900 font-bold">Designation:</span>
      <input
        className="text-left w-3/4 bg-white outline-none"
      />
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 col-span-8 text-left">
      <span className="text-gray-900 font-bold">Full Name:</span>{' '}
      <input
        className="text-left w-3/4 bg-white outline-none"
      />
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell className="py-4 border border-neutral-600 text-sm font-medium text-neutral-500 " colSpan={18}>
      <p className="font-bold text-gray-900">Notes:</p>
      1. Part B (Annexure) of the certificate in Form No.16 shall be issued by
      the employer.
      <br />
      2. If an assessee is employed under one employer during the year, Part
      &apos;A&apos; of the certificate in Form No.16 issued for the quarter
      ending on 31st March of the financial year shall contain the details of
      tax deducted and deposited for all the quarters of the financial year.
      <br />
      3. If an assessee is employed under more than one employer during the
      year, each of the employers shall issue Part A of the certificate in Form
      No.16 pertaining to the period for which such assessee was employed with
      each of the employers. Part B (Annexure) of the certificate in Form No.
      16 may be issued by each of the employers or the last employer at the
      option of the assessee.
      <br />
      4. To update PAN details in Income Tax Department database, apply for
      &apos;PAN change request&apos; through NSDL or UTITSL.
    </TableCell>
  </TableRow>

  <TableRow >
    <TableCell className="py-4 text-sm font-bold text-gray-900 underline col-span-12 text-center" colSpan={18}>
      Legend used in Form 16
    </TableCell>
  </TableRow>

  <TableRow >
    <TableCell className="text-sm font-bold text-gray-900 text-center" colSpan={18}>
      * Status of matching with OLTAS
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-1">
      Legend
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 " colSpan={2}>
      Description
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-9" colSpan={14}>
      Definition
    </TableCell>
  </TableRow>

  {/* Example for Legend "U" */}
  <TableRow>
    <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600  text-left" colSpan={1}>
      U
    </TableCell>
    <TableCell className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600 text-left" colSpan={2}>
      Unmatched
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 text-left" colSpan={14}>
      Deductors have not deposited taxes or have furnished incorrect
      particulars of tax payment. Final credit will be reflected only when
      payment details in bank match with details of deposit in TDS / TCS
      statement
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600  text-left" colSpan={1}>
      P
    </TableCell>
    <TableCell className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600 text-left" colSpan={2}>
    Provisional
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 text-left" colSpan={14}>
    Provisional tax credit is effected only for TDS / TCS Statements filed by Government deductors. "P " status will be changed to Final (F) on verification of payment details submitted by Pay and Accounts Officer (PAO)
      statement
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600  text-left" colSpan={1}>
      F
    </TableCell>
    <TableCell className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600 text-left" colSpan={2}>
    Final
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 text-left" colSpan={14}>
    In case of non-government deductors, payment details of TDS / TCS deposited in bank by deductor have matched with the payment details mentioned in the TDS / TCS statement filed by the deductors. In case of government deductors, details of TDS / TCS booked in Government account have been verified by Pay & Accounts Officer (PAO)
      statement
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600  text-left" colSpan={1}>
      O
    </TableCell>
    <TableCell className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600 text-left" colSpan={2}>
    Overbooked
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 text-left" colSpan={14}>
    Payment details of TDS / TCS deposited in bank by deductor have matched with details mentioned in the TDS / TCS statement but the amount is over claimed in the statement. Final (F) credit will be reflected only when deductor reduces claimed amount in the statement or makes new payment for excess amount claimed in the statement
    </TableCell>
  </TableRow>

      </TableBody>
    </Table>
        </div>

      <div>
              {/* part 2 */}

      <Table className=" pt-20">
    <TableHeader className="bg-white">
        <TableRow>
        <TableCell colSpan={12} className="text-center border border-neutral-900">
            <h5 className="font-bold text-lg">FORM NO. 16</h5>
        </TableCell>
        </TableRow>
    </TableHeader>
    <TableBody className="bg-white">
        <TableRow>
        <TableCell colSpan={12} className="text-center text-lg font-bold text-gray-900 border border-neutral-900">
            <h6>PART B</h6>
        </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={12} className="text-center text-sm font-bold text-gray-900 border border-neutral-900 px-2 py-2">
            Certificate under section 203 of the Income-tax Act, 1961 for tax deducted at source on salary paid to an employee under section 192 or pension/interest income of specified senior citizen under section 194P
        </TableCell>
        </TableRow>
        <TableRow>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600 text-left px-2 py-4" colSpan={2}>
            Certificate No.
            <input
            className="bg-white focus:outline-none w-64 mx-2 text-neutral-500 font-medium border-b border-gray-300"
            />
        </TableCell>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600 text-left px-2 py-4" colSpan={10}>
            Last updated on
            <input
            className="bg-white focus:outline-none w-64 mx-2 text-neutral-500 font-medium border-b border-gray-300"
            />
        </TableCell>
        </TableRow>
        <TableRow>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600 px-2 py-4" colSpan={2}>
            Name and address of the Employer/Specified Bank
        </TableCell>
        <TableCell className="text-sm font-bold text-gray-900 border border-neutral-600 px-2 py-4" colSpan={10}>
            Name and address of the Employee/Specified senior citizen
        </TableCell>
        </TableRow>
        <TableRow>
        <TableCell className="text-sm font-medium text-neutral-500 border border-neutral-600 px-2 py-4" colSpan={2}>
            <textarea
            className="bg-white text-neutral-500 font-medium w-full h-28 resize-none px-2 py-2 text-justify outline-none border border-gray-300"
            />
        </TableCell>
        <TableCell className="text-sm font-medium text-neutral-500 border border-neutral-600 px-2 py-4" colSpan={10}>
            <textarea
            className="bg-white text-neutral-500 font-medium w-full h-28 resize-none px-2 py-2 text-justify outline-none border border-gray-300"
            />
        </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={1} className="text-sm font-bold text-gray-900 border border-neutral-600 px-2 py-4">
            PAN of the Deductor
        </TableCell>
        <TableCell colSpan={2} className="text-sm font-bold text-gray-900 border border-neutral-600 px-2 py-4">
            TAN of the Deductor
        </TableCell>
        <TableCell colSpan={11} className="text-sm font-bold text-gray-900 border border-neutral-600 px-2 py-4">
            PAN of the Employee/Specified senior citizen
        </TableCell>
        </TableRow>

        <TableRow>
  <TableCell colSpan={1} className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600">
    <input
      className="bg-white w-full border-0 text-neutral-500 font-medium text-left"
    />
  </TableCell>
  <TableCell colSpan={2} className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600">
    <input
      className="bg-white w-full outline-none text-neutral-500 font-medium text-left"
    />
  </TableCell>
  <TableCell colSpan={11} className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600">
    <input
      className="bg-white w-full outline-none text-neutral-500 font-medium text-left"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell colSpan={1} className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600" >
    CIT (TDS)
  </TableCell>
  <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600" colSpan={2}>
    Assessment Year
  </TableCell>
  <TableCell className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600" colSpan={9}>
    Period with the Employer
  </TableCell>
</TableRow>

<TableRow>
  <TableCell colSpan={1} className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600">
    <textarea
      className="bg-white w-full h-28 resize-none px-2 py-2 text-neutral-500 font-medium outline-none border border-gray-300"
    />
  </TableCell>
  <TableCell colSpan={2} className="px-2 py-4 text-sm font-medium text-neutral-500 border border-neutral-600">
    <input
      className="bg-white w-full outline-none px-2 py-4 text-neutral-500 font-medium"
    />
  </TableCell>
  <TableCell colSpan={1} className="py-4 text-sm font-bold text-gray-900 border border-neutral-600">
    From{' '}
    <input
      className="mx-2 w-3/4 outline-none bg-white text-neutral-500 font-medium text-center py-4"
    />
  </TableCell>
  <TableCell colSpan={7} className="py-4 text-sm font-bold text-gray-900 border border-neutral-600">
    To{' '}
    <input
      className="w-4/5 mx-2 outline-none bg-white text-neutral-500 font-medium text-center py-4"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell colSpan={12} className="px-2 py-4 text-sm font-bold text-gray-900 text-right border border-neutral-600">
    Annexure-I
  </TableCell>
</TableRow>

<TableRow>
  <TableCell colSpan={12} className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center">
    Details of Salary Paid and any other income and tax deducted
  </TableCell>
</TableRow>

<TableRow>
  <TableCell colSpan={3} className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center">
    Whether opting for taxation u/s 115BAC
  </TableCell>
  <TableCell colSpan={4} className=" text-center px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600">
    No
  </TableCell>
</TableRow>

<TableRow>
  <TableCell colSpan={1} className="px-2 py-2 text-sm font-semibold text-gray-900 text-center border border-neutral-600">
    1.
  </TableCell>
  <TableCell colSpan={2} className="px-2 py-2 text-sm font-semibold text-gray-900 text-center border border-neutral-600">
    Gross Salary
  </TableCell>
  <TableCell colSpan={1} className="px-2 py-2 text-sm font-semibold text-gray-900 text-center border border-neutral-600">
    Rs.
  </TableCell>
  <TableCell colSpan={8} className="px-2 py-2 text-sm font-semibold text-gray-900 text-center border border-neutral-600">
    Rs.
  </TableCell>
</TableRow>

<TableRow>
  <TableCell colSpan={1} className="px-2 py-2 text-sm font-semibold text-gray-900 text-center border border-neutral-600  ">
    (a)
  </TableCell>
  <TableCell colSpan={2} className="px-2 py-2 text-sm font-semibold text-gray-900 text-left border border-neutral-600">
    Salary as per provisions contained in section 17(1)
  </TableCell>
  <TableCell colSpan={1} className="px-2 py-2 text-sm font-semibold text-neutral-500 text-left border border-neutral-600">
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell colSpan={8} className="px-2 py-2 text-sm font-semibold text-neutral-500 text-right border border-neutral-600">
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (b)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
    Value of perquisites under section 17(2) (as per Form No. 12BA, wherever applicable)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-right col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (c)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
    Profits in lieu of salary under section 17(3) (as per Form No. 12BA, wherever applicable)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-right col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-right col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (d)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-9" colSpan={2}>
    Total
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={9}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (e)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
    Reported total amount of salary received from other employer(s)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-right col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    2.
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-11" colSpan={11}>
    Less: Allowances to the extent exempt under section 10
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (a)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
    Travel concession or assistance under section 10(5)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (b)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
    Death-cum-retirement gratuity under section 10(10)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (c)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
    Commuted value of pension under section 10(10A)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (d)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
    Cash equivalent of leave salary encashment under section 10 (10AA)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
        (e)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
        House rent allowance under section 10(13A)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
        (f)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
        Amount of any other exemption under section 10
        <span className="font-extrabold">
          [Note: Break-up to be filled and signed by employer in the
          table provided at the bottom of this form]
        </span>
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
        (g)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
        Total amount of any other exemption under section 10
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
        <input
          type="number"
          value={"totalAllowances"}
          className="border-0"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-right col-span-2" colSpan={8} />
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
        (h)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
        Total amount of exemption claimed under section 10
        [2(a)+2(b)+2(c)+2(d)+2(e)+2(g)]
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-right col-span-2" colSpan={1}>
        <input
          type="number"
          className="border-0"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
        <input
          type="number"
          value={"totalExemption"}
          className="border-0"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
        3.
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
        Total amount of salary received from current employer
        [1(d)-2(h)]
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-right col-span-2" colSpan={1}>
        <input
          type="number"
          className="border-0"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
        <input
          type="number"
          value={"totalSalaryCurrentEmployer"}
          className="border-0"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
        4.
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-11" colSpan={11}>
        Less: Deductions under section 16
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
        (a)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
        Standard deduction under section 16(ia)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
        (b)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
        Entertainment allowance under section 16(ii)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
        (c)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
        Tax on employment under section 16(iii)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
        (a)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
        Income (or admissible loss) from house property reported by employee offered for TDS
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left"  colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
        (b)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
        Income under the head Other Sources offered for TDS
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
        8.
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
        Total amount of other income reported by the employee [7(a)+7(b)]
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={1}>
        <input type="number" className="border-none" />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
        <input
          value={"totalIncomeReported"}
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
        9.
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-extrabold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
        Gross total income (6+8)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={1}>
        <input type="number" className="border-none" />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-extrabold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
        <input
          value={"grossTotalIncome"}
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
        10.
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
        Deductions under Chapter VI-A
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-center" colSpan={1}>
        Gross Amount
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-center" colSpan={8}>
        Deductible Amount
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
        (a)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
        Deduction in respect of life insurance premia, contributions to provident fund etc. under section 80C
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
        (b)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
        Deduction in respect of contribution to certain pension funds under section 80CCC
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
        (c)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
        Deduction in respect of contribution by taxpayer to pension scheme under section 80CCD (1)
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={1}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
      <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>

    <TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (d)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
    Total deduction under section 80C, 80CCC and 80CCD(1)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-right" colSpan={1}>
    <input
      value={"totalDeductionsGrossAmountABC"}
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
    <input
      value={"totalDeductionsDeductibleAmountABC"}
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>
<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (e)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
    Deductions in respect of amount paid/deposited to notified pension scheme under section 80CCD (1B)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-right" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>
<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (f)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
    Deduction in respect of contribution by Employer to pension scheme under section 80CCD (2)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>
<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-1" colSpan={1}>
    (g)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left" colSpan={2}>
    Deduction in respect of health insurance premia under section 80D
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>
<TableRow className="bg-white">
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}> (h) </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-7" colSpan={2}>
    Deduction in respect of interest on loan taken for higher education under section 80E
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow className="bg-white">
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-6" colSpan={2} />
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-2" colSpan={1}>
    Gross Amount
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-2" colSpan={1}>
    Qualifying Amount
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center col-span-2" colSpan={8}>
    Deductible Amount
  </TableCell>
</TableRow>

<TableRow className="bg-white">
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>(i)</TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-5" colSpan={1}>
    Total Deduction in respect of donations to certain funds, charitable institutions, etc. under section 80G
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow className="bg-white">
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>(j)</TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-5" colSpan={1}>
    Deduction in respect of interest on deposits in savings account under section 80TTA
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center">
    (k)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-5">
    Amount Deductible under any other provision (s) of Chapter VI-A
    [Note: Break-up to be filled and signed by employer in the table
    provided at the bottom of this form]
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-6 text-left" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center" colSpan={1}>
    (l)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-5" colSpan={1}>
    Total of amount deductible under any other provision(s) of
    Chapter VI-A
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={1}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 text-left col-span-2" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center">
    11.
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-justify col-span-5">
    Aggregate of deductible amount under Chapter VI-A
    [10(d)+10(e)+10(f)+10(g)+10(h)+10(i)+10(j)+10(l)]
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-6 text-left" colSpan={8}>
    <input
      value={"aggregateOfDeductibleAmount"}
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-extrabold text-gray-900 border border-neutral-600 text-center">
    12.
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-extrabold text-gray-900 border border-neutral-600 text-left col-span-5">
    Total taxable income (9-11)
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-extrabold text-gray-900 border border-neutral-600 col-span-6 text-left" colSpan={8}>
    <input
      value={"totalTaxableIncome"}
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center">
    13.
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-5">
    Tax on total income
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-right" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-center">
    14.
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 text-left col-span-5">
    Rebate under section 87A, if applicable
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-right" colSpan={8}>
    <input
      type="number"
      className="border-none"
    />
  </TableCell>
</TableRow>
<TableRow>
      <TableCell className="text-center font-semibold text-gray-900 border border-neutral-600">15.</TableCell>
      <TableCell className="text-left font-semibold text-gray-900 col-span-5 border border-neutral-600 ">
        Surcharge, wherever applicable
      </TableCell>
      <TableCell className="text-right font-semibold text-gray-900 col-span-6 border border-neutral-600" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell className="text-center font-semibold text-gray-900 border border-neutral-600">16</TableCell>
      <TableCell className="text-left font-semibold text-gray-900 col-span-5 border border-neutral-600">
        Health and education cess
      </TableCell>
      <TableCell className="text-right font-semibold text-gray-900 col-span-6 border border-neutral-600" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell className="text-center font-semibold text-gray-900 border border-neutral-600">17.</TableCell>
      <TableCell className="text-left font-semibold text-gray-900 col-span-5 border border-neutral-600">
        Tax payable (13+15+16-14)
      </TableCell>
      <TableCell className="text-right font-semibold text-gray-900 col-span-6 border border-neutral-600" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell className="text-center font-semibold text-gray-900 border border-neutral-600">18.</TableCell>
      <TableCell className="text-left font-semibold text-gray-900 col-span-5 border border-neutral-600">
        Less: Relief under section 89 (attach details)
      </TableCell>
      <TableCell className="text-right font-semibold text-gray-900 col-span-6 border border-neutral-600" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell className="text-center font-semibold text-gray-900 border border-neutral-600">19.</TableCell>
      <TableCell className="text-left font-semibold text-gray-900 col-span-5 border border-neutral-600">
        Net tax payable (17-18)
      </TableCell>
      <TableCell className="text-right font-semibold text-gray-900 col-span-6 border border-neutral-600" colSpan={8}>
        <input
          type="number"
          className="border-none"
        />
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell className="text-md font-bold text-gray-900 text-center" colSpan={10}>Verification</TableCell>
    </TableRow>

    <TableRow>
      <TableCell className="text-sm font-bold text-gray-900 col-span-1 text-justify leading-6 border border-neutral-600 p-20" colSpan={10}>
        I,
        <input
          className="text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3 ml-2 bg-white "
        /> 
        , son/daughter of{' '}
        <input
          className="text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3 bg-white"
        />
        .Working in the capacity of{' '}
        <input
          className="text-left border-b-2  -border--clr-neutral-900 outline-none w-1/3 bg-white"
        />
        (Designation) do hereby certify that the information given above
        is true, complete and correct and is based on the books of
        account, documents, TDS statements, and other available records.
      </TableCell>
    </TableRow>

    <TableRow>
        <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
            Place
        </TableCell>
        <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 col-span-5 text-left h-full">
            <input
            className="border-none w-full h-full focus:outline-none text-left bg-white"
            />
        </TableCell>
        <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 text-left" colSpan={14}>
            (Signature of person responsible for deduction of Tax)
        </TableCell>
    </TableRow>

    <TableRow>
    <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
        Date
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 col-span-5 text-left">
        <input
        className="border-none focus:outline-none text-left bg-white"
        />
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 text-left">
        Full Name:
    </TableCell>
    <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-600 col-span-4 text-left" colSpan={10}>
        <input
        className="border-none focus:outline-none text-left bg-white"
        />
    </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-12 p-7 text-center" colSpan={14}>
    2. (f) Break up for ‘Amount of any other exemption under section 10’ to be filled in the table below
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-center">
    Sl. No.
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-5">
    Particular of Amount for any other exemption under section 10 Rs.
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-2">
    Gross Amount Rs.
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 text-left">
    Qualifying Amount Rs.
  </TableCell>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 text-left" colSpan={14}>
    Deductible Amount Rs.
  </TableCell>
</TableRow>


{BreakupAmount10lines.map((line, index) => (
        <TableRow key={index}>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-1" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col1}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount10lines];
                updatedLines[index].col1 = e.target.value;
                BreakupAmount10setLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-3" colSpan={1}>
            <input
              className="focus:outline-none text-left w-full bg-white"
              value={line.col2}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount10lines];
                updatedLines[index].col2 = e.target.value;
                BreakupAmount10setLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col3}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount10lines];
                updatedLines[index].col3 = e.target.value;
                BreakupAmount10setLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={line.col4}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount10lines];
                updatedLines[index].col4 = e.target.value;
                BreakupAmount10setLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-500 col-span-2" colSpan={18}>
            <input
              className="focus:outline-none text-left no-border w-full bg-white"
              value={line.col6}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount10lines];
                updatedLines[index].col6 = e.target.value;
                BreakupAmount10setLines(updatedLines);
              }}
            />
            <span className="flex justify-end">
              {/* Only show the '+' button if it's the last line */}
              {index === BreakupAmount10lines.length - 1 && (
                <FiPlus
                  onClick={BreakupAmount10addLine}
                  className="cursor-pointer text-green-500 ml-2"
                  size={20}
                />
              )}
              {/* Show the '-' button for all lines except the first one */}
              {index > 0 && (
                <FiMinus
                  onClick={() => BreakupAmount10removeLine(index)}
                  className="cursor-pointer text-red-500 ml-2"
                  size={20}
                />
              )}
            </span>
          </TableCell>
        </TableRow>
      ))}


<TableRow className="border-collapse grid grid-cols-12 h-10">
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 col-span-1 center"></TableCell>
</TableRow>

<TableRow>
  <TableCell className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-12 text-left" colSpan={10}>
    10(k). Break up for ‘Amount deductible under any other provision(s) of Chapter VIA ‘to be filled in the table below
  </TableCell>
</TableRow>

<TableRow>
  <TableCell className="text-sm font-bold text-gray-900 text-center">
    Sl. No.
  </TableCell>
  <TableCell className="text-sm font-bold text-gray-900">
    Particular of Amount deductible under any other provision(s) of Chapter VIA Rs.
  </TableCell>
  <TableCell className="text-sm font-bold text-gray-900">
    Gross Amount Rs.
  </TableCell>
  <TableCell className="text-sm font-bold text-gray-900 text-left">
    Qualifying Amount Rs.
  </TableCell>
  <TableCell className="text-sm font-bold text-gray-900 text-left">
    Deductible Amount Rs.
  </TableCell>
</TableRow>


{/* ************breakup Chapter VI A***************** */}

{BreakupAmount6Alines.map((BreakupAmount6Aline, index) => (
        <TableRow key={index}>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-1" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={BreakupAmount6Aline.col1}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount6Alines];
                updatedLines[index].col1 = e.target.value;
                BreakupAmount6AsetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-3" colSpan={1}>
            <input
              className="focus:outline-none text-left w-full bg-white"
              value={BreakupAmount6Aline.col2}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount6Alines];
                updatedLines[index].col2 = e.target.value;
                BreakupAmount6AsetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={BreakupAmount6Aline.col3}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount6Alines];
                updatedLines[index].col3 = e.target.value;
                BreakupAmount6AsetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-2" colSpan={1}>
            <input
              className="focus:outline-none w-full bg-white"
              value={BreakupAmount6Aline.col4}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount6Alines];
                updatedLines[index].col4 = e.target.value;
                BreakupAmount6AsetLines(updatedLines);
              }}
            />
          </TableCell>
          <TableCell className="px-2 py-2 text-sm font-medium text-neutral-500 border border-neutral-500 col-span-2" colSpan={18}>
            <input
              className="focus:outline-none text-left no-border w-full bg-white"
              value={BreakupAmount6Aline.col6}
              onChange={(e) => {
                const updatedLines = [...BreakupAmount6Alines];
                updatedLines[index].col6 = e.target.value;
                BreakupAmount6AsetLines(updatedLines);
              }}
            />
            <span className="flex justify-end">
              {/* Only show the '+' button if it's the last line */}
              {index === BreakupAmount6Alines.length - 1 && (
                <FiPlus
                  onClick={BreakupAmount6AaddLine}
                  className="cursor-pointer text-green-500 ml-2"
                  size={20}
                />
              )}
              {/* Show the '-' button for all lines except the first one */}
              {index > 0 && (
                <FiMinus
                  onClick={() => BreakupAmount6AremoveLine(index)}
                  className="cursor-pointer text-red-500 ml-2"
                  size={20}
                />
              )}
            </span>
          </TableCell>
        </TableRow>
      ))}

<TableRow className="h-10">
  <TableCell></TableCell>
</TableRow>

<TableRow className="border-neutral-600">
  <TableCell className="text-sm font-bold text-gray-900">
    Place
  </TableCell>
  <TableCell className="text-sm font-medium text-neutral-500">
    <input
      className="border-none focus:outline-none text-left w-full bg-white"
    />
  </TableCell>
  <TableCell className="text-sm font-medium text-neutral-500" colSpan={6}>
    (Signature of person responsible for deduction of Tax)
  </TableCell>
</TableRow>

<TableRow className="border-neutral-600">
  <TableCell className="text-sm font-bold text-gray-900">
    Date
  </TableCell>
  <TableCell className="text-sm font-medium text-neutral-500">
    <input
      className="focus:outline-none text-left w-full bg-white"
    />
  </TableCell>
  <TableCell className="text-sm font-bold text-gray-900">
    Full Name:
  </TableCell>
  <TableCell className="text-sm font-medium text-neutral-500">
    <input
      className="outline-none text-left w-full bg-white"
    />
  </TableCell>
</TableRow>








        </TableBody>
        </Table>
      </div>

    </div>
    )
}