import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { HomeLoanCalculator } from "./HomeLoanCalculator";

export default function Page() {
  return (
    <>
    <div className="bg-white min-h-screen">
    <HomeNavbar />
      <HomeLoanCalculator />
      <HomeFooter />
    </div>
  
    </>
  );
}
