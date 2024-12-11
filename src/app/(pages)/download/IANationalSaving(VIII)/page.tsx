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

export default function IANationalSavingVIII(){

    const handleDownloadPDF = async () => {
        const element = document.querySelector("#IANationalSaving(VIII)") as HTMLElement | null;
    
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
    
            pdf.save("IANationalSaving(VIII)Table.pdf"); // Download the PDF
        } else {
            console.error("Table element not found");
        }
    };
    return (
        <div className=" p-8 bg-white" >
            <div className="flex justify-end">
                <Button className="bg-blue-500 text-white" variant={"secondary"} onClick={handleDownloadPDF}>Download PDF</Button>
            </div>
            <div className="container flex m-10" id="IANationalSaving(VIII)">
                <Table className="table-auto border-collapse border border-gray-500 text-lg">
                    <TableHeader className="bg-blue-500 text-white" >
                        <TableRow>
                            <TableCell colSpan={7} className="text-center p-10">
                                Amount of interest accruing on the certificate of Rs. 100 denomination
                            </TableCell>
                        </TableRow> 
                    </TableHeader>
                    <TableHeader className="bg-blue-500 text-white">
                        <TableRow className="border-b border-gray-500 h-24">
                        <TableHead className="text-white border border-gray-500">
                        When NSC was purchased
                        </TableHead>
                        <TableHead className="text-white border border-gray-500">
                        First Year
                        </TableHead>
                        <TableHead className="text-white border border-gray-500">
                        Second Year
                        </TableHead>
                        <TableHead className="text-white border border-gray-500">
                        Third Year
                        </TableHead>
                        <TableHead className="text-white border border-gray-500">
                        Fourth Year
                        </TableHead>
                        <TableHead className="text-white border border-gray-500">
                        Fifth Year
                        </TableHead>
                        <TableHead className="text-white border border-gray-500">
                        Sixth Year
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="border-b border-gray-500">
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                        </TableRow>
                        <TableRow className="border-b border-gray-500">
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                        </TableRow>
                        <TableRow className="border-b border-gray-500">
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                            <TableCell className="border border-gray-500">TableValue1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <p className="text-lg p-10">
            * Maturity period 5 years
             Note: 1. Deduction u/s 80L is available on the accrued interest up to A.Y. 2005-06. From A.Y. 2006-07 section 80L has been deleted.
            2. Accrued interest qualifies for rebate u/s 88 except for the maturing year up to A.Y. 2005-06. From A.Y. 2006-07, the accrued interest is deductible u/s 80C except for the maturing year.
            </p>
            
            <p className="text-center text-purple-700 text-lg">[As amended by Finance Act, 2022]</p>
        </div>
    )
} 