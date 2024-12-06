"use client";
import {  useUserInsights } from "@/services/page/root/homePage/userInsightQuery";
import Card from "@/styles/cardStyles"

// If you could find a way to make the following the useUserInsights function with ts, then plz do so

export const HomeUserInsights = ()=>{
  const userInsightQuery  = useUserInsights();


  
    return (<>
    <div className="max-w-7xl lg:px-8 mx-auto">
            <h3 className="text-center text-slate-900 text-3xl md:text-4xl font-extrabold">
              User Insights
            </h3>
            <div className="flex flex-wrap gap-10 my-16 mx-auto justify-center sm:justify-between ">
             
              <Card text={`${userInsightQuery[1]?.data?.count || 0}+`} color="rgb(0, 85, 212)">
                Total Visitors
              </Card>
              <Card
                text={`${userInsightQuery[0] ?.data?.data?.totalUsers || 0}+`}
                color="rgb(0, 85, 212)"
              >
                Total Active User
              </Card>
              <Card
                text={`${userInsightQuery[0]?.data?.data?.totalPhoneNumbers || 0}+`}
                logo="logo"
                color="rgb(0, 85, 212)"
              >
                Total Phone Contacts
              </Card>
              <Card
                text={`${userInsightQuery[0]?.data?.data?.totalEmails || 0}+`}
                logo="logo"
                color="rgb(0, 85, 212)"
              >
                Total Mailing Addresses
              </Card>
            </div>
          </div>
    </>)
}