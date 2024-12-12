import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { AadhaarSearchForm } from "@/components/easyservices/aadharverification";


export default function Page() {
  return (
    <>
      <HomeNavbar />
      <AadhaarSearchForm></AadhaarSearchForm>
      <HomeFooter />
    </>
  );
}
