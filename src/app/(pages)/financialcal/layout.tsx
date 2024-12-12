import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

export default function CalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeNavbar />
      <div className="min-h-screen p-3 bg-white">{children}</div>
      <HomeFooter/>
    </>
  );
}
