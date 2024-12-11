"use client"

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";
  import { useQuery } from "@tanstack/react-query";
import axios from "axios";





export default function StatusWiseTax(){



    // const fetchTaxData = async () => {
    //     const response = await axios.get("https://node-api-y43d.onrender.com/status-wise-income-tax-code");
    //     return response.data; // Return the data from the response
    // };

    // // Use the useQuery hook to fetch data
    // const { data, isLoading, isError, error } = useQuery({
    //     queryKey: ["statusWiseTaxData"], // Unique key for caching
    //     queryFn: fetchTaxData, // Fetch function
    // });

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (isError) {
    //     return <div>Error: {error.message}</div>;
    // }


    const handleDownloadPDF = async () => {
        const element = document.querySelector("#Status-wise-income-tax") as HTMLElement | null;
    
        if (element) {
            const canvas = await html2canvas(element, { scale: 2 }); // Increase scale for better quality
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
    
            pdf.save("Status-wise-income-taxTable.pdf"); // Download the PDF
        } else {
            console.error("Table element not found");
        }
    };
    interface InfoObject {
        [key: number]: [string, string, string];
      }
    
    const InfoOjb : InfoObject = {
        1:["HUF","3","H"],
        2:["Cooperative Society","11","A"],
        3:["Company (Public )","12","C"],
        4:["A.O.P.","7","A"],
        5:["Artificial Juridical","10","J"],
        6:["Body of Individuals","9","B"],
        7:["A.O.P. Trust","8","T"],
        8:["Firm","5","F"],
        9:["Local Authority","16","L"],
        10:["Company ( Govt. )","12","C"],
        11:["Individual","1","P"],
        12:["Company (Private )","13","C"],
    }

    return (
        <div className=" p-8 bg-white" >
            <h1 className="text-2xl">Status wise Income Tax Code and PAN Code</h1>
            <div className="flex justify-end">
                <Button className="bg-blue-500 text-white" variant={"secondary"} onClick={handleDownloadPDF}>Download PDF</Button>
            </div>
            <div className="container flex m-10" id="Status-wise-income-tax">
                <Table className="table-auto border-collapse border border-gray-500 text-lg">
                    <TableHeader className="bg-blue-500 text-white">
                        <TableRow className="border-b border-gray-500">
                        <TableHead className="text-white border border-gray-500">
                        Status
                        </TableHead>
                        <TableHead className="text-white border border-gray-500">
                        Income Tax code
                        </TableHead>
                        <TableHead className="text-white border border-gray-500">
                        Pan Code (4th digit of Pan)
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.values(InfoOjb).map((value: [string, string, string], index) => {
                            const [status, taxCode, panCode] = value;
                            return (
                            <TableRow key={index} className="border-b border-gray-500">
                                <TableCell className="border border-gray-500">{status}</TableCell>
                                <TableCell className="border border-gray-500">{taxCode}</TableCell>
                                <TableCell className="border border-gray-500">{panCode}</TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>

                </Table>
            </div>
        </div>
    )
} 