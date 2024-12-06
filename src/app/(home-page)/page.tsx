"use client";

import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { LoadingScreen } from "@/components/common/Loader";
import { useHomeNavQuery } from "@/services/page/root/homePage/homeNavQuery";

import { HomeChooseYourPolicy } from "./choose-your-policy";
import { HomeCorporatePartners } from "./corporate-partners";
import { HomeDownloadpp } from "./download-app";
import { HomeHeroSection1 } from "./hero-section-1";
import { HomeITROneGo } from "./itr-in-one-go";
import { ListServices } from "./ListServices";
import { HomeOnGoingProjects } from "./onGoingProjects";
import OurServices from "./our-services";
import { HomeUserInsights } from "./user-insights";

export default function Home() {
  const HomePageQuery = useHomeNavQuery();

  // If the query is still loading or has no data, show a loader
  if (HomePageQuery.isPending) {
    return <LoadingScreen />;
  }

  // If the query has an error, you could show an error screen here
  if (HomePageQuery.isError) {
    return (
      <div className="text-center text-red-500">
        Error loading the page. Please try again later.
      </div>
    );
  }

  // Fallback to placeholders if data is unavailable
  const pageData = HomePageQuery.data?.data.home;

  const ourServicesCards = HomePageQuery.data?.data.home.cards;

  return (
    <div>
      <HomeNavbar />

      <HomeHeroSection1 pageData={pageData} />
      <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
      <OurServices ourServicesCards={ourServicesCards} />
      <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
      <ListServices pageData={pageData} />
      <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
      <HomeChooseYourPolicy />
      <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
      <HomeITROneGo />
      <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
      <HomeDownloadpp />
      <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
      <HomeOnGoingProjects ongoingProjects={pageData?.ongoingPro} />
      <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
      <HomeCorporatePartners pageData={pageData} />
      <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
      <HomeUserInsights />
      <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
      <HomeFooter />
    </div>
  );
}
