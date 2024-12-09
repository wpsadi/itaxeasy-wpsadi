import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { CompoundInterestCalculator } from "./compound-interest";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <CompoundInterestCalculator />
      <HomeFooter />
    </>
  );
}
