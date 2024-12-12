import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import BlogsPage from "./BlogsShow";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <BlogsPage />
      <HomeFooter />
    </>
  );
}
