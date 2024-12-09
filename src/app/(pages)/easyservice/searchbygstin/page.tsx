
import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { SrchByGST } from "./SrchByGST";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <SrchByGST />
      <HomeFooter />
    </>
  );
}
