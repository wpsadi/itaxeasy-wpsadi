"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BusinessProfileForm } from "./(businessProfile)/business-form";
import { ProfileForm } from "./(userProfile)/user-form";
import { ProfileCard, ProfileType } from "./leftCard";

export function ProfileLayout() {
  const [activeTab, setActiveTab] = useState<ProfileType>("user");

  return (
    <div className="container mx-auto py-6 min-h-screen">
      <Tabs
        defaultValue="user"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as ProfileType)}
      >
        {/* Tabs Header */}
        <div className=" bg-white z-10 shadow-md">
          <div className="w-full flex flex-row  justify-center items-center sticky top-0">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="user" aria-label="User Profile">
                User Profile
              </TabsTrigger>
              <TabsTrigger value="business" aria-label="Business Profile">
                Business Profile
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[400px_1fr] px-3 md:px-6 min-h-[88vh]">
          {/* Left Profile Card */}
          <ProfileCard activeTab={activeTab} />

          {/* Right Form */}
          <div>
            <TabsContent value="user">
              <ProfileForm />
            </TabsContent>
            <TabsContent value="business">
              <BusinessProfileForm />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
