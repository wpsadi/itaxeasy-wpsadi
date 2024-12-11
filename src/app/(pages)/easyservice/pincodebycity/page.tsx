import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { CitySearchForm } from "@/components/easyservices/cityPincode";

import { GSTINSearchForm } from "@/components/easyservices/gstinsearch";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <CitySearchForm></CitySearchForm>
      <HomeFooter/>
    </>
  );
}