import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

export default function ApiLayout(
    {
        children
    }: {
        children: React.ReactNode;
    }
){
    return (<>
    <div className="bg-white">
    <HomeNavbar/>
    {children}
    <HomeFooter/>
    </div>

    </>)
}