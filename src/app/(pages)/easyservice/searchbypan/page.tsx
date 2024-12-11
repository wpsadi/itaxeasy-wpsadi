import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { GSTINSearchForm } from "@/components/easyservices/gstinsearch";
import { PANSearchForm } from "@/components/easyservices/pandetails";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <PANSearchForm></PANSearchForm>
      <HomeFooter/>
    </>
  );
}