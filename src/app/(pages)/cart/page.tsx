import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import CartPage from "./Cart";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <CartPage />
      <HomeFooter />
    </>
  );
}
