import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { TrackGSTForm } from "@/components/easyservices/trackgst";

export default function Page() {
  return (
    <>
      <HomeNavbar />

      <TrackGSTForm />
      <HomeFooter />
    </>
  );
}
