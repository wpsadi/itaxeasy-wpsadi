import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { DINSearchForm } from "@/components/easyservices/DirectorDetails";

import { GSTINSearchForm } from "@/components/easyservices/gstinsearch";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <DINSearchForm></DINSearchForm>
      <HomeFooter/>
    </>
  );
}