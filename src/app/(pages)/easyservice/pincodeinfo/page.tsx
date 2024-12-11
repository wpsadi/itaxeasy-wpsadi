import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { GSTINSearchForm } from "@/components/easyservices/gstinsearch";
import { PincodeSearchForm } from "@/components/easyservices/SearchPinCode";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <PincodeSearchForm></PincodeSearchForm>
      <HomeFooter/>
    </>
  );
}