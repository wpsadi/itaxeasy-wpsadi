import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { CompanyIDSearchForm } from "@/components/easyservices/companyIDfrom";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <CompanyIDSearchForm></CompanyIDSearchForm>
      <HomeFooter/>
    </>
  );
}