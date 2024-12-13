"use client";
import Card from "@/styles/cardStyles";

import { useUserInsights } from "../../services/page/root/homePage/userInsightQuery";

// If you could find a way to make the following the useUserInsights function with ts, then plz do so

export const HomeUserInsights = () => {
  const userInsightQuery = useUserInsights();

  return (
    <>
      <div className="max-w-7xl lg:px-8 mx-auto">
        <h3 className="text-center text-slate-900 text-3xl md:text-4xl font-extrabold">
          User Insights
        </h3>
        <div className="flex flex-wrap gap-10 my-16 mx-auto justify-center sm:justify-between ">
          <Card text={`${userInsightQuery[1]?.data?.count}+`} color="#0055d4">
            Total Visitors
          </Card>
          <Card
            text={`${userInsightQuery[0]?.data?.data?.totalUsers}+`}
            color="#0055d4"
          >
            Total Active User
          </Card>
          <Card
            text={`${userInsightQuery[0]?.data?.data?.totalPhoneNumbers}+`}
            logo="logo"
            color="#0055d4"
          >
            Total Phone Contacts
          </Card>
          <Card
            text={`${userInsightQuery[0]?.data?.data?.totalEmails}+`}
            logo="logo"
            color="#0055d4"
          >
            Total Mailing Addresses
          </Card>
        </div>
      </div>
    </>
  );
};
