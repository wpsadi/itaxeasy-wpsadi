import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { PincodeSearchForm } from "@/components/easyservices/SearchPinCode";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <PincodeSearchForm></PincodeSearchForm>
      <HomeFooter />
    </>
  );
}
