import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { SimpleInterestCalculator } from "./simple-interest";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <SimpleInterestCalculator />
      <HomeFooter />
    </>
  );
}
