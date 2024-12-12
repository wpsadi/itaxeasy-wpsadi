import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import UPIVerification from "@/components/easyservices/upiverification";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <UPIVerification></UPIVerification>
      <HomeFooter />
    </>
  );
}
