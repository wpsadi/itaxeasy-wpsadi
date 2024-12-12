import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { IFSCSearchForm } from "@/components/easyservices/ifscsearch";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <IFSCSearchForm />
      <HomeFooter />
    </>
  );
}
