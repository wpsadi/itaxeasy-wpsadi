"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DepreciationTable() {
  const handleDownloadPDF = async () => {
    const element = document.querySelector(
      "#DepriciationTable"
    ) as HTMLElement | null;

    if (element) {
      const canvas = await html2canvas(element, { scale: 2 }); // Increase scale for better quality
    //   const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4"); // Create a new PDF in A4 size
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

    //   const imgHeightInPDF = (canvasHeight * pdfWidth) / canvasWidth; // Scaled height to fit PDF width
      let remainingHeight = canvasHeight;
      let position = 0;

      // Add the table to the PDF page by page
      while (remainingHeight > 0) {
        const sliceCanvas = document.createElement("canvas"); // Create a new canvas for each slice
        sliceCanvas.width = canvasWidth;
        sliceCanvas.height = Math.min(
          canvasHeight,
          pdfHeight * (canvasWidth / pdfWidth)
        ); // Slice height based on page height

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

      pdf.save("DepriciationTable.pdf"); // Download the PDF
    } else {
      console.error("Table element not found");
    }
  };

  return (
    <div className=" p-8 bg-white">
      <h1 className="text-2xl text-center">Depreciation Table</h1>
      <div className="flex justify-end">
        <Button
          onClick={handleDownloadPDF}
          className="bg-blue-500 text-white"
          variant={"secondary"}
        >
          Download PDF
        </Button>
      </div>
      <div className="container flex m-10" id="DepriciationTable">
        <Table className="table-auto border-collapse border border-gray-500 text-lg">
          <TableHeader className="bg-blue-500 text-white">
            <TableRow className="border-b border-gray-500 h-24">
              <TableHead className="text-white border border-gray-500"></TableHead>
              <TableHead className="text-white border border-gray-500">
                Block of Assets
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                Depreciation allowance as percentage of written down value
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                Depreciation allowance as percentage of written down value
              </TableHead>
              <TableHead className="text-white border border-gray-500">
                Depreciation allowance as percentage of written down value
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500"></TableCell>
              <TableCell className="border border-gray-500"></TableCell>
              <TableCell className="border border-gray-500">
                A.Y 2018-19 onwards
              </TableCell>
              <TableCell className="border border-gray-500">
                A.Y. 2006-07 to 2017-18
              </TableCell>
              <TableCell className="border border-gray-500">
                A.Y. 2003-04 to 2005-06
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500">
                I. Buildings <br></br>
                [See Notes 1 to 4 below the Table]
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
              <TableCell className="border border-gray-500">(1)</TableCell>
              <TableCell className="border border-gray-500">
                Buildings which are used mainly for residential purposes except
                hotels and boarding houses
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
              <TableCell className="border border-gray-500">(2)</TableCell>
              <TableCell className="border border-gray-500">
                Building other than those used mainly for residential purposes
                and not covered by sub-items (1) above and (3) below
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
              <TableCell className="border border-gray-500">(3)</TableCell>
              <TableCell className="border border-gray-500">
                {" "}
                Building acquired on or after the 1st day of September, 2002 for
                installing machinery and plant forming part of water supply
                project or water treatment system and which is put to use for
                the purpose of business of providing infrastructure facilities
                under clause (i) of sub-section (4) of section 80-IA
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
              <TableCell className="border border-gray-500">(4)</TableCell>
              <TableCell className="border border-gray-500">
                Purely temporary erections such as wooden structures
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
              <TableCell className="border border-gray-500" colSpan={2}>
                II. Furniture and Fittings
              </TableCell>
              <TableCell className="border border-gray-500"></TableCell>
              <TableCell className="border border-gray-500"></TableCell>
              <TableCell className="border border-gray-500"></TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500">(1)</TableCell>
              <TableCell className="border border-gray-500">
                Furniture and Fittings including electrical fittings [See Note 5
                below the Table]
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
              <TableCell className="border border-gray-500" colSpan={2}>
                III. Machinery and Plant
              </TableCell>
              <TableCell className="border border-gray-500"></TableCell>
              <TableCell className="border border-gray-500"></TableCell>
              <TableCell className="border border-gray-500"></TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500">(1)</TableCell>
              <TableCell className="border border-gray-500">
                Machinery and plant other than those covered by sub-items (2),
                (3) and (8) below
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
              <TableCell className="border border-gray-500">(2)</TableCell>
              <TableCell className="border border-gray-500">
                Motor cars, other than those used in a business of running them
                on hire, acquired or put to use on or after the 1st day of
                April, 1990
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
              <TableCell className="border border-gray-500" colSpan={2}>
                (3)
              </TableCell>
              <TableCell className="border border-gray-500"></TableCell>
              <TableCell className="border border-gray-500"></TableCell>
              <TableCell className="border border-gray-500"></TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500">(3)(i)</TableCell>
              <TableCell className="border border-gray-500">
                Aeroplanes – Aeroengines
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
              <TableCell className="border border-gray-500">(3)(ii)</TableCell>
              <TableCell className="border border-gray-500">
                Motor buses, motor lorries and motor taxis used in a business of
                running them on hire
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
              <TableCell className="border border-gray-500">(3)(iii)</TableCell>
              <TableCell className="border border-gray-500">
                Commercial vehicle which is acquired by the assessee on or after
                the 1st day of October, 1998, but before the 1st day of April,
                1999 and is put to use for any period before the 1st day of
                April, 1999 for the purposes of business or profession in
                accordance with the third proviso to clause (ii) of sub-section
                (1) of section 32 [See Note 6 below the Table]
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
              <TableCell className="border border-gray-500">(3)(iv)</TableCell>
              <TableCell className="border border-gray-500">
                New commercial vehicle which is acquired on or after the 1st day
                of October, 1998 but before the 1st day of April, 1999 in
                replacement of condemned vehicle of over 15 years of age and is
                put to use for any period before the 1st day of April, 1999 for
                the purposes of business or profession in accordance with the
                third proviso to clause (ii) of sub-section (1) of section 32
                [See Note 6 below the Table]
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
              <TableCell className="border border-gray-500">(3)(v)</TableCell>
              <TableCell className="border border-gray-500">
                New commercial vehicle which is acquired on or after the Ist day
                of April, 1999 but before the Ist day of April, 2000 in
                replacement of condemned vehicle of over 15 years of age and is
                put to use before the 1st day of April, 2000 for the purposes of
                business or profession in accordance with the second proviso to
                clause (ii) sub-section (1) of section 32 [See Note 6 below the
                Table]
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
              <TableCell className="border border-gray-500">(3)(vi)</TableCell>
              <TableCell className="border border-gray-500">
                New commercial vehicle which is acquired on or after the 1st day
                of April, 2001 but before the 1st day of April, 2002 and is put
                to use before the 1st day of April, 2002 for the purposes of
                business or profession [See Note 6 below the Table]
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
              <TableCell className="border border-gray-500">(3)(vii)</TableCell>
              <TableCell className="border border-gray-500">
                Moulds used in rubber and plastic goods factories
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
                (3)(viii)
              </TableCell>
              <TableCell className="border border-gray-500">
                Air Pollution control equipment being <br />
                (a) Electrostatic precipitation systems
                <br />
                (b) Felt-filter systems
                <br />
                (c) Dust collector systems
                <br />
                (d) Scrubber-counter current/venturi/packed-bed/cyclonic
                scrubbers
                <br />
                (e) Ash handling system and evacuation being
                <br />
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
              <TableCell className="border border-gray-500">(3)(ix)</TableCell>
              <TableCell className="border border-gray-500">
                Water pollution control equipment being (a) Mechanical screen
                systems <br />
                (b) Aerated detritus chambers (including air compressor)
                <br />
                (c) Mechanically skimmed oil and grease removal systems
                <br />
                (d) Chemical feed systems and flash mixing equipment
                <br />
                (e) Mechanical flocculators and mechanical reactors
                <br />
                (f) Diffused air/mechanically aerated activated sludge systems
                <br />
                (g) Aerated lagoon systems
                <br />
                (h) Biofilters
                <br />
                (i) Methane-recovery anaerobic digester systems
                <br />
                (j) Air floatation systems
                <br />
                (k) Air/steam stripping systems
                <br />
                (l) Urea hydrolysis systems
                <br />
                (m) Marine outfall systems
                <br />
                (n) Centrifuge for dewatering sludge
                <br />
                (o) Rotating biological contractor or bio-disc
                <br />
                (p) Ion exchange resin column
                <br />
                (q) Activated carbon column
                <br />
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
              <TableCell className="border border-gray-500">(3)(x)</TableCell>
              <TableCell className="border border-gray-500">
                (a) Solidwaste control equipments, being-
                caustic/lime/chrome/mineral/ cryolite recovery system
                <br />
                (b) Solidwaste recycling and resource recovery systems
                <br />
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
              <TableCell className="border border-gray-500">(3)(xi)</TableCell>
              <TableCell className="border border-gray-500">
                Machinery and plant used in semi-conductor industry convering
                all integrated circuits (ICs) (excluding hybrid integrated
                circuits) ranging from small scale integration (SSI) to large
                scale integration/very large scale integration (LSI/VLSI) as
                also discrete semi-conductor devices such as diodes,
                transistors, thyristors, triacs, etc.) other than those covered
                by entries (viii), (ix) and (x) of this sub-item and sub-item
                (8) below
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
              <TableCell className="border border-gray-500">(3)(xii)</TableCell>
              <TableCell className="border border-gray-500">
                Life saving medical equipment, being- (a) D.C. Defibrillators
                for internal use and pace makers
                <br />
                (b) Haemodialysors
                <br />
                (c) Heart lung machine
                <br />
                (d) Cobalt Therapy Unit
                <br />
                (e) Colour Doppler
                <br />
                (f) SPECT Gamma Camera
                <br />
                (g) Vascular Angiography System including Digital subtraction
                Angiography
                <br />
                (h) Ventilator used with anaesthesia apparatus
                <br />
                (i) Magnetic Resonance Imaging System
                <br />
                (j) Surgical Laser
                <br />
                (k) Ventilators other than those used with anaesthesia
                <br />
                (l) Gamma knife
                <br />
                (m) Bone Marrow Transplant Equipment including silastic long
                standing intravenous catheters for chemotherapy
                <br />
                (n) Fibreoptic endoscopes including Paediatirc
                resectoscope/audit resectoscope, Peritoneoscopes, Arthoscope,
                Microlaryngoscope, Fibreoptic Flexible Nasal Pharyngo
                Bronchoscope, Fibreoptic Flexible Laryngo Bronchoscope, Video
                Laryngo Bronchoscope and Video Oesophago Gastroscope,
                Stroboscope, Fibreoptic Flexible Oesophago Gastroscope
                <br />
                (o) Laparoscope (single incision)
                <br />
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
              <TableCell className="border border-gray-500">(4)</TableCell>
              <TableCell className="border border-gray-500">
                Containers made of glass or plastic used as re-fills
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
              <TableCell className="border border-gray-500">(5)</TableCell>
              <TableCell className="border border-gray-500">
                Computers including computer software [See note 7 below the
                Table]
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
              <TableCell className="border border-gray-500">(6)</TableCell>
              <TableCell className="border border-gray-500">
                Machinery and plant, used in weaving, processing and garment
                sector of textile industry, which is purchased under TUFS on or
                after the 1st day of April, 2001 but before the 1st day of
                April, 2004 and is put to use before the 1st day of April, 2004
                [See Note 8 below the Table]
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
              <TableCell className="border border-gray-500">(7)</TableCell>
              <TableCell className="border border-gray-500">
                Machinery and plant, acquired and installed on or after the 1st
                day of September, 2002 in a water supply project or a water
                treatment system and which is put to use for the purpose of
                business of providing infrastructure facility under clause (i)
                of sub-section (4) of section 80-IA [See Notes 4 and 9 below the
                Table]
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
              <TableCell className="border border-gray-500">(8)(i)</TableCell>
              <TableCell className="border border-gray-500">
                Wooden parts used in artificial silk manufacturing machinery
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
              <TableCell className="border border-gray-500">(8)(ii)</TableCell>
              <TableCell className="border border-gray-500">
                Cinematograph films-bulbs of studio lights
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
              <TableCell className="border border-gray-500">(8)(iii)</TableCell>
              <TableCell className="border border-gray-500">
                Match factories-Wooden match frames
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
              <TableCell className="border border-gray-500">(8)(iv)</TableCell>
              <TableCell className="border border-gray-500">
                Mines and quarries (a) Tubs, winding ropes, haulage rope and
                sand stowing pipes (b) Safety lamps
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
              <TableCell className="border border-gray-500">(8)(v)</TableCell>
              <TableCell className="border border-gray-500">
                Salt works-Salt pans, reservoirs and condensers, etc., made of
                earthy, sand or clayey material or any other similar material
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
              <TableCell className="border border-gray-500">(8)(vi)</TableCell>
              <TableCell className="border border-gray-500">
                Flour Mills-Rollers
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
              <TableCell className="border border-gray-500">(8)(vii)</TableCell>
              <TableCell className="border border-gray-500">
                Iron and Steel industry-Rolling mill rolls
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
                (8)(viii)
              </TableCell>
              <TableCell className="border border-gray-500">
                Sugar Works-Rollers
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
              <TableCell className="border border-gray-500">(8)(ix)</TableCell>
              <TableCell className="border border-gray-500">
                Energy saving devices being-
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
              <TableCell className="border border-gray-500">A.</TableCell>
              <TableCell className="border border-gray-500">
                Specialised boilers and furnaces; <br />
                (a) Ignifluid/fluidized bed boilers <br />
                (b) Flameless furnaces and continuous pusher type furnaces{" "}
                <br />
                (c) Fluidized bed type hear treatment furnaces
                <br />
                (d) High efficiency boilers (thermal efficiency higher than 75
                per cent in case of coal fired and 80 per cent in case of
                oil/gas fired boilers
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
              <TableCell className="border border-gray-500">B.</TableCell>
              <TableCell className="border border-gray-500">
                Instrumentation and monitoring system energy flows; <br /> (a)
                Automatic electrical load monitoring systems
                <br />
                (b) Digital heat loss meters
                <br />
                (c) Micro-processor based control systems
                <br />
                (d) Infra-red thermography
                <br />
                (e) Meters for measuring heat losses, furnace oil flow, stream
                flow, electric energy and power factor meters
                <br />
                (f) Maximum demand indicator and clamp on power meters
                <br />
                (g) Exhaust gases analyzer
                <br />
                (h) Fuel oil pump test bench
                <br />
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
              <TableCell className="border border-gray-500">C.</TableCell>
              <TableCell className="border border-gray-500">
                Waste heat recovery equipments; (a) Economisers and feed water
                heaters
                <br />
                (b) Recuperators and air pre-heaters
                <br />
                (c) Head pumps
                <br />
                (d) Thermal energy wheel for high and low temperature waste heat
                recovery
                <br />
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
              <TableCell className="border border-gray-500">D.</TableCell>
              <TableCell className="border border-gray-500">
                Co-Generation systems; (a) Back pressure pass out, controlled
                extraction, extraction-cum- condensing turbines for
                co-generation along with pressure boilers <br />
                (b) Vapour absorption refrigeration systems
                <br />
                (c) Organic rankine cycle power systems
                <br />
                (d) Low inlet pressure small steam turbines
                <br />
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
              <TableCell className="border border-gray-500">E.</TableCell>
              <TableCell className="border border-gray-500">
                Electrical equipments (a) Shunt capacitors and synchronous
                condenser systems <br />
                (b) Automatic power cut off devices (relays) mounted on
                individual motors
                <br />
                (c) Automatic voltage controller
                <br />
                (d) Power factor controller for AC Motors
                <br />
                (e) Solid state devices for controlling motor speeds
                <br />
                (f) Thermally energy-efficient stenters (which require 800 or
                less kilocalories of heat to evaporate one kilogram of water)
                <br />
                (g) Series compensation equipment
                <br />
                (h) Flexible AC Transmission (FACT) devices- Thyristor
                controlled series compensation equipment
                <br />
                (i) Time of Day (TOD) energy meters
                <br />
                (j) Equipment to establish transmission highways for National
                Power Grid to facilitate transfer of surplus power of one region
                to the deficient region
                <br />
                (k) Remove terminal units/intelligent electronic devices,
                computer hardware/software, router/bridges, other required
                equipment and associated communication systems for supervisory
                control and data acquisition systems, energy management systems
                and distribution management systems for power transmission
                systems
                <br />
                (l) Special energy meters for Availability Based Tariff (ABT)
                <br />
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
              <TableCell className="border border-gray-500">F.</TableCell>
              <TableCell className="border border-gray-500">
                Burners; (a) 0 to 10 per cent excess air burners <br />
                (b) Emulsion burners
                <br />
                (c) Burners using air with high pre-heat temperature (above 300’
                C)
                <br />
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
              <TableCell className="border border-gray-500">G.</TableCell>
              <TableCell className="border border-gray-500">
                Other equipment; (a) Wet air oxidation equipment for recovery of
                chemicals and heat
                <br />
                (b) Mechanical vapour recompressors
                <br />
                (c) Thin film evaporators
                <br />
                (d) Automatic micro-processor based load demand controllers
                <br />
                (e) Coal based producer gas plants
                <br />
                (f) Fluid drives and fluid couplings
                <br />
                (g) Turbo Charges/super charges
                <br />
                (h) Sealed radiation sources for radiation processing plants
                <br />
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
              <TableCell className="border border-gray-500">(x)</TableCell>
              <TableCell className="border border-gray-500">
                Gas cylinders including valves and regulators
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
              <TableCell className="border border-gray-500">(xi)</TableCell>
              <TableCell className="border border-gray-500">
                Glass manufacturing concerns – Direct fire glass melting
                furnaces
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
              <TableCell className="border border-gray-500">(xii)</TableCell>
              <TableCell className="border border-gray-500">
                Mineral Oil concerns (a) Plant used in field operations (above
                ground), distribution-Returnable <br />
                (b) Plant used in field operations (below ground), but not
                including kerbside pumps including underground tanks and fitting
                used in field operations (distribution) by mineral oil concerns
                <br />
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
              <TableCell className="border border-gray-500">(xiii)</TableCell>
              <TableCell className="border border-gray-500">
                Renewal energy devices being- (a) Flat plate solar collectors{" "}
                <br />
                (b) Concentrating and pipe type solar collectors
                <br />
                (c) Solar Cookers
                <br />
                (d) Solar water heaters and systems
                <br />
                (e) Air/gas fluid heating systems
                <br />
                (f) Solar crop driers and systems
                <br />
                (g) Solar refrigeration, cold storages and air-conditioning
                systems
                <br />
                (h) Solar power generating systems
                <br />
                (i) Solar power generating systems
                <br />
                (j) Solar pumps based on solar-thermal and solar photovoltaic
                conversion
                <br />
                (k) Solar photovoltaic modules and panels for water pumping and
                other applications
                <br />
                (l) Wind mills and any specially designed devices which run on
                wind mills
                <br />
                (m) Any special devices including electric generators and pumps
                running on wind energy
                <br />
                (n) Bio-gas plant and bio-gas engines
                <br />
                (o) Electrically operated vehicles including battery powered or
                fuel-cell powered vehicles
                <br />
                (p) Agricultural and municipal waste conversion devices
                producing energy
                <br />
                (q) Equipment for utilising ocean waste and thermal energy
                <br />
                (r) Machinery and plant used in the manufacture of any of the
                above sub-items
                <br />
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
              <TableCell className="border border-gray-500">(9)(i)</TableCell>
              <TableCell className="border border-gray-500">
                Books owned by assessees carrying on a profession (a) Books,
                being annual publications <br />
                (b) Books, other than those covered by entry
                <br /> (a) above
                <br />
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
              <TableCell
                className="border border-gray-500 font-bold"
                colSpan={2}
              >
                IV. Ships
              </TableCell>
              <TableCell className="border border-gray-500"></TableCell>
              <TableCell className="border border-gray-500"></TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500">(1)</TableCell>
              <TableCell className="border border-gray-500">
                Ocean-going ships including dredgers, tugs, barges, survey
                launches and other similar ships used mainly for dredging
                purposes and fishing vessels with wooden hull
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
              <TableCell className="border border-gray-500">(2)</TableCell>
              <TableCell className="border border-gray-500">
                Vessels ordinarily operating on inland waters, not covered by
                sub-item (3) below
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
              <TableCell className="border border-gray-500">(3)</TableCell>
              <TableCell className="border border-gray-500">
                Vessels ordinarily operating on inland waters being speed boats
                (see Note 10 below the Table)
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
            <TableRow className="text-center text-xl ">
              PART B INTANGIBLE ASSETS
            </TableRow>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500" colSpan={2}>
                Know-how, patents, copyrights, trademarks, licences, franchises
                or any other business or commercial rights of similar nature
              </TableCell>
              <TableCell className="border border-gray-500">25</TableCell>
              <TableCell className="border border-gray-500">25</TableCell>
              <TableCell className="border border-gray-500">25</TableCell>
            </TableRow>
            <p className="text-lg">Note -</p>
            <TableRow className="border-b border-gray-500">
              <TableCell className="border border-gray-500" colSpan={5}>
                “Buildings” include roads, bridges, culverts, wells and
                tube-wells A building shall be deemed to be a building used
                mainly for residential purposes, if the built-up floor area
                thereof used for residential purposes is not less than sixty-six
                and two their per cent of its total built up floor area and
                shall include any such building in the factory premises. In
                respect of any structure or work by way of renovation or
                improvement in or in relation to a building referred to in
                Explanation 1 of clause (ii) of sub-item (1) of section 32, the
                percentage to be applied will be the percentage specified
                against sub-item (1) or (2) of item I as may be appropriate to
                the class of building in or in relation to which the renovation
                or improvement is effected. Where the structure is constructed
                or the work is done by way of extension of any such building,
                the percentage to be applied would be such percentage as would
                be appropriate, as if the structure or work constituted a
                separate building. Water treatment system includes system for
                desalinisation, demineralisation and purification of water.
                “Electrical fittings” include electrical wiring, switches,
                sockets, other fittings and fans, etc. “Commercial vehicle”
                means “heavy goods vehicle”, heavy passenger motor vehicle”,
                “light motor vehicle”, “Medium goods vehicle” and “medium
                passenger motor vehicle” but does not include “maxi-cab”,
                “motor-cab”, “tractor” and “road-roller”. The expressions “heavy
                goods vehicle”, “heavy passenger motor vehicle”, “light motor
                vehicle”, “medium passenger motor vehicle”, “maxi-cab”,
                “tractor” and “road-roller” shall have the meanings respectively
                as assigned to them in section 2 of the Motor Vehicles Act,
                1988] “Computer software” means any computer programme recorded
                on any disc, tape, perforated media or other information storage
                device. “TUFS” means Technology Upgradation Fund Scheme
                announced by the Government of India in the form of a Resolution
                of the Ministry of Textiles vide No. 28/1/99-CTI of 31-3-1999.
                Machinery and plant includes pipes needed for delivery from the
                source of supply of raw water to the plant and from the plant to
                the storage facility. “Speed boat” means a motor boat driven by
                a high speed internal combustion engine capable of propelling
                the boat at a speed exceeding 24 kilometres per hour in still
                water and so designed that when running at a speed, it will rise
                from the water.
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
