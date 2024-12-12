import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import TanSearch from "@/components/easyservices/tansearch";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <TanSearch></TanSearch>
      <HomeFooter />
    </>
  );
}
