import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { BusinessLoanCalculator } from "./business-loan-calculator";

export default function Page() {
  return (
    <>
    
      <HomeNavbar />
      <BusinessLoanCalculator />
      <HomeFooter />
    </>
  );
}
