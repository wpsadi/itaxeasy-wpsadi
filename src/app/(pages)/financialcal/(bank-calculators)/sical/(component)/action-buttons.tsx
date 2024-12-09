import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


interface ActionButtonsProps {
  onClear: () => void;
}

export function ActionButtons({ onClear }: ActionButtonsProps) {
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.querySelector(".print-content");
    if (!element) return;

    try {
      const canvas = await html2canvas(element as HTMLElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("interest_calculator.pdf");
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
    <div className="flex space-x-2">
      <Button onClick={handlePrint}>Print</Button>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <Button variant="outline" onClick={onClear}>
        Clear
      </Button>
    </div>
  );
}
