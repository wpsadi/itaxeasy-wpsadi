import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { CarLoanCal } from "./CarLoanCal";

export default function Page() {
  return (
    <>
    <div className="bg-white min-h-screen">
    <HomeNavbar />
      <CarLoanCal />
      <HomeFooter />
    </div>

    </>
  );
}
