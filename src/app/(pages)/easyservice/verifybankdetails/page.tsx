import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import VerificationOfBank from "@/components/easyservices/verifyBankDetail";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <VerificationOfBank></VerificationOfBank>
      <HomeFooter />
    </>
  );
}
