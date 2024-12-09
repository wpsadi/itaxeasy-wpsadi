import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { GSTCalculator } from "./gst-calculator";

export type GSTCalType = {
  gstRate: number;
  gstType: "include" | "exclude";
  amount: number;
};

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <GSTCalculator />
      <HomeFooter />
    </>
  );
}
