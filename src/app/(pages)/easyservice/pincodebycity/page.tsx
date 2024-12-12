import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { CitySearchForm } from "@/components/easyservices/cityPincode";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <CitySearchForm></CitySearchForm>
      <HomeFooter />
    </>
  );
}
