import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { GSTINSearchForm } from "@/components/easyservices/gstinsearch";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <GSTINSearchForm></GSTINSearchForm>
      <HomeFooter />


    </>
  );
}
