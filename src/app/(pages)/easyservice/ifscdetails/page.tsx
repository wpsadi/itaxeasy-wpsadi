
import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { GSTINSearchForm } from "@/components/easyservices/gstinsearch";
import { IFSCSearchForm } from "@/components/easyservices/ifscsearch";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <IFSCSearchForm/>
      <HomeFooter/>
    </>
  );
}
