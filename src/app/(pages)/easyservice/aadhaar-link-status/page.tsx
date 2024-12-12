import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { CheckAadhaarLinkStatus } from "@/components/easyservices/aadhaar-link-status";


export default function Page() {
  return (
    <>
      <HomeNavbar />
      <CheckAadhaarLinkStatus></CheckAadhaarLinkStatus>
      <HomeFooter/>
    </>
  );
}