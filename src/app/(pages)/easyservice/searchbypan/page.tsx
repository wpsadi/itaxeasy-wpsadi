import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import PANSearch from "@/components/easyservices/pansearch";

export default function Page() {
  return (
    <>
      <HomeNavbar />

      <PANSearch />

      <HomeFooter />
    </>
  );
}
