import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import BlogPost from "./SpecificBlog";

export default function Page() {
  return (
    <>
      <HomeNavbar />
      <BlogPost />
      <HomeFooter />
    </>
  );
}
