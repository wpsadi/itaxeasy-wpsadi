import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { GSTINSearchForm } from "@/components/easyservices/gstinsearch";
import UPIVerification from "@/components/easyservices/upiverification";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <UPIVerification></UPIVerification>
      <HomeFooter/>
    </>
  );
}