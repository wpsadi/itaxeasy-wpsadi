"use client"
import { Button } from "@/components/ui/button";
import jsonData from "./test.json";

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

  import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function GoldeSilver(){
        // Fetch data using useQuery
        // const { data, isLoading, isError, error } = useQuery(
        //     ['goldSilverRates'], // Query key
        //     async () => {
        //         const response = await axios.get("https://itaxeasy.com/api/downloads/gold-silver-rate");
        //         return response.data; // Return the API response
        //     }
        // );
    const handleDownloadPDF = async () => {
        const element = document.querySelector("#gold-silver-table");
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
    
            pdf.save("gold-silver-tableTable.pdf"); // Download the PDF
        } else {
            console.error("Table element not found");
        }
    };
    return (
        <div className="p-8 bg-white">
            <div className="flex justify-end">
                <Button className="bg-blue-500 text-white" variant={"secondary"} onClick={handleDownloadPDF}>Download PDF</Button>
            </div>
            <div id="gold-silver-table">
                <div className="container flex m-10"  >
                    <Table className="table-auto border-collapse border border-gray-500 text-lg">
                        <TableHeader className="bg-blue-500 text-white">
                            <TableRow className="border-b border-gray-500">
                            <TableHead className="text-white border border-gray-500">
                                Assessment year/ valuation date
                            </TableHead>
                            <TableHead className="text-white border border-gray-500">
                                Standard Gold 24 Carats Rate for 10 grams Rs.
                            </TableHead>
                            <TableHead className="text-white border border-gray-500">
                                Silver 999 touch Rate of 1 Kg. Rs.
                            </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jsonData.data.map((item) => (
                                <TableRow key={item.id} className="border-b border-gray-500">
                                <TableCell className="border border-gray-500">{item.assessmentYear}</TableCell>
                                <TableCell className="border border-gray-500">{item.stGoldRate24CPer10Grams}</TableCell>
                                <TableCell className="border border-gray-500">{item.stSilverRateFor1Kg}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>

                </div>
                <p className="text-lg">
                Notes :
                1. Value of gold contained in gold ornaments should be reduced by 14 to 20 per cent of ruling rates of standard gold, as per the practice prevalent in the bullion market and the amount of reduction has to be worked out in the following manner :
                </p>
                <div className="m-10">
                    <Table className="table-auto border-collapse border border-gray-500 text-lg">
                        <TableHeader className="bg-blue-500 text-white">
                            <TableRow className="border-b border-gray-500">
                                <TableHead className="text-white border border-gray-500 w-[60%]">
                                </TableHead>
                                <TableHead className="text-white border border-gray-500">
                                Plain gold bangles and ornaments made of solid gold
                                </TableHead>
                                <TableHead className="text-white border border-gray-500">
                                Other gold ornaments
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="border-b border-gray-500">
                            <TableCell className="border border-gray-500">Difference in value between 24 carats of standard gold and 22 carats of gold ornaments (gold ornaments are generally made of 22 carats of gold)</TableCell>
                            <TableCell className="border border-gray-500">8.33%</TableCell>
                            <TableCell className="border border-gray-500">8.33%</TableCell>
                            </TableRow>
                            <TableRow className="border-b border-gray-500">
                            <TableCell className="font-medium border border-gray-500">
                                Soldering made of copper, silver, etc., used in making ornaments
                            </TableCell>
                            <TableCell className="border border-gray-500">2.5% to 5%</TableCell>
                            <TableCell className="border border-gray-500">8.33%</TableCell>
                            </TableRow>
                            <TableRow className="border-b border-gray-500">
                            <TableCell className="font-medium border border-gray-500">
                                Shortage of gold in melting, mint charges payable to Government, expenditure on freight, insurance, etc., of sending gold ornaments to approved mint for conversion into standard gold bars
                            </TableCell>
                            <TableCell className="border border-gray-500">1.25%</TableCell>
                            <TableCell className="border border-gray-500">1.25%</TableCell>
                            </TableRow>
                            <TableRow className="border-b border-gray-500">
                            <TableCell className="font-medium border border-gray-500">
                                Margin of profit of the dealer when ornaments are sold in market
                            </TableCell>
                            <TableCell className="border border-gray-500">2%</TableCell>
                            <TableCell className="border border-gray-500">2%</TableCell>
                            </TableRow>
                            <TableRow className="border-b border-gray-500">
                            <TableCell className="font-medium border border-gray-500">
                                Total reduction
                            </TableCell>
                            <TableCell className="border border-gray-500">14.08% to 16.58%</TableCell>
                            <TableCell className="border border-gray-500">19.91%</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <p className="text-lg p-9">
                2. Silver wares, utensils, etc., is liable for wealth-tax. <br/>
                3. Conversion table:
                </p>
                <div className="p-10">
                    <Table className="table-auto border-collapse border border-gray-500 text-lg" >
                        <TableRow className="border-b border-gray-500">
                            <TableCell className="border border-gray-500" >10 grams</TableCell>
                            <TableCell className="border border-gray-500" >=</TableCell>
                            <TableCell className="border border-gray-500" >0.857 tola</TableCell>
                            <TableCell className="border border-gray-500" >1 tola</TableCell>
                            <TableCell className="border border-gray-500" >11.664 grams</TableCell>
                        </TableRow>
                        <TableRow className="border-b border-gray-500">
                            <TableCell className="border border-gray-500" >1 kilogram</TableCell>
                            <TableCell className="border border-gray-500" >=</TableCell>
                            <TableCell className="border border-gray-500" >85.734 tolas</TableCell>
                            <TableCell className="border border-gray-500" >10 tola</TableCell>
                            <TableCell className="border border-gray-500" >116.638 grams</TableCell>
                        </TableRow>
                    </Table>
                </div>
            </div>
            <p className="text-center text-purple-700">[As amended by Finance Act, 2022]</p>
        </div>
    )
} 