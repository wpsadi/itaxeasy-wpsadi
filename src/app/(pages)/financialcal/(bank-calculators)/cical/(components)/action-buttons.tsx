import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { RefObject } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


interface ActionButtonsProps {
  onClear: () => void;
  contentRef: RefObject<HTMLDivElement>;
}

export function ActionButtons({ onClear, contentRef }: ActionButtonsProps) {
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("compound_interest_calculator.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex space-x-2 print:hidden">
      <Button onClick={handlePrint}>Print</Button>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <Button variant="outline" onClick={onClear}>
        Clear
      </Button>
    </div>
  );
}
