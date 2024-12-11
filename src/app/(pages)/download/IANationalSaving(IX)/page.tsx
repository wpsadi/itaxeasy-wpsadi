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


export default function IANationalSavingIX(){
    const handleDownloadPDF = async () => {
        const element = document.querySelector("#IANationalSaving(IX)") as HTMLElement | null;
    
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
    
            pdf.save("IANationalSaving(IX)Table.pdf"); // Download the PDF
        } else {
            console.error("Table element not found");
        }
    };

    return (
        <div className=" p-8 bg-white" >
        <h1 className="text-2xl text-center">Amount of interest accruing on the certificate of Rs. 100 denomination</h1>
        <div className="flex justify-end">
            <Button onClick={handleDownloadPDF} className="bg-blue-500 text-white" variant={"secondary"}>Download PDF</Button>
        </div>
        <div className="container flex m-10" id="IANationalSaving(IX)">
        <Table className="table-auto border-collapse border border-gray-500 text-lg">
                <TableHeader className="bg-blue-500 text-white">
                    <TableRow className="border-b border-gray-500 h-24">
                    <TableHead className="text-white border border-gray-500 w-64" >
                    When NSC was purchased
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    Compounded rate of interest
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
                    fifth Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    Sixth Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    Seventh Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    Eighth Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    ninth Year
                    </TableHead>
                    <TableHead className="text-white border border-gray-500">
                    tenth Year
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-b border-gray-500">
                        <TableCell className="border border-gray-500 ">
                            Certificate purchased on or after 02-09-1993 but before 01-01-1999
                        </TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-gray-500">
                        <TableCell className="border border-gray-500">
                        Certificate purchased on or after 01-01-1999
                        </TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
                        <TableCell className="border border-gray-500">TableValue1</TableCell>
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
        * Discontinued with effect from December 20, 2015
National Saving Certificates (IXth Issue):- These certificates are issued with effect from December 1, 2011. Maturity period of 10 years and interest is accrued at the rate of 8.7 percent (8.9 percent if investment made on or after April 1, 2012) and 8.8 per cent(if investment made on or after April 1, 2013) which is compounded half yearly. However, interest is taxable on yearly basis according to the rates given above.

        </p>
        
        <p className="text-center text-purple-700 text-lg">[As amended by Finance Act, 2022]</p>
    </div>
    )
} 