import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { GSTINSearchForm } from "@/components/easyservices/gstinsearch";
import { TrackGSTForm } from "@/components/easyservices/trackgst";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <TrackGSTForm/>
      <HomeFooter/>
    </>
  );
}