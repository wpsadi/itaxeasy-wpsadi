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
  } from "@/components/ui/table";
  
  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";


export default function IAIndiraVikasPatras(){
    const handleDownloadPDF = async () => {
        const element = document.querySelector("#IAIndiraVikasPatras") as HTMLElement | null;
    
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
    
            pdf.save("IAIndiraVikasPatrasTable.pdf"); // Download the PDF
        } else {
            console.error("Table element not found");
        }
    };

    return (
        <div className=" p-8 bg-white" >
        <h1 className="text-2xl text-center">Status wise Income Tax Code and PAN Code</h1>
        <div className="flex justify-end">
            <Button className="bg-blue-500 text-white" variant={"secondary"} onClick={handleDownloadPDF}>Download PDF</Button>
        </div>
        <div className="container flex m-10" id="IAIndiraVikasPatras">
            <Table className="table-auto border-collapse border border-gray-500 text-lg">
                <TableHeader className="bg-blue-500 text-white">
                    <TableRow className="border-b border-gray-500 h-24">
                    <TableHead className="text-white border border-gray-500">
                    When NSC was purchased
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    Compounded rate of interest
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    1st Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    2nd Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    3rd Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    4th Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    5th Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    5 <span className="text-xs text-start">1/2</span> Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    6th Year
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-b border-gray-500">
                        <TableCell className="border border-gray-500">
                            Certificate purchased on or after 02-09-1993 but before 01-01-1999
                        </TableCell>
                        <TableCell className="border border-gray-500">222.32</TableCell>
                        <TableCell className="border border-gray-500">152.33</TableCell>
                        <TableCell className="border border-gray-500">196</TableCell>
                        <TableCell className="border border-gray-500">13.43</TableCell>
                        <TableCell className="border border-gray-500">222.32</TableCell>
                        <TableCell className="border border-gray-500">222.32</TableCell>
                        <TableCell className="border border-gray-500">222.32</TableCell>
                        <TableCell className="border border-gray-500">222.32</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-gray-500">
                        <TableCell className="border border-gray-500">
                        Certificate purchased on or after 01-01-1999
                        </TableCell>
                        <TableCell className="border border-gray-500">NA</TableCell>
                        <TableCell className="border border-gray-500">137.51</TableCell>
                        <TableCell className="border border-gray-500">173.26</TableCell>
                        <TableCell className="border border-gray-500">12.25</TableCell>
                        <TableCell className="border border-gray-500">NA</TableCell>
                        <TableCell className="border border-gray-500">NA</TableCell>
                        <TableCell className="border border-gray-500">NA</TableCell>
                        <TableCell className="border border-gray-500">NA</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        
        <p className="text-center text-purple-700 text-lg">[As amended by Finance Act, 2022]</p>
    </div>
    )
} 