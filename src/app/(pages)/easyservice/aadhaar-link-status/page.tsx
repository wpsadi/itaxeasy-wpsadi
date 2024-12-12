import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { CheckAadhaarLinkStatus } from "@/components/easyservices/aadhaar-link-status";

import { GSTINSearchForm } from "@/components/easyservices/gstinsearch";
import { Head } from "@/components/easyservices/Head";

export default function Page() {
  return (
    <>

      <HomeNavbar />
        <CheckAadhaarLinkStatus></CheckAadhaarLinkStatus>
      <HomeFooter/>
    </>
  );
}