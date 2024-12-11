
import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import PanAadhaarStatus from "@/components/easyservices/panaadharlink";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <PanAadhaarStatus></PanAadhaarStatus>
      <HomeFooter/>
    </>
  );
}
