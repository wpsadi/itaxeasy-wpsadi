"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProfileCard, ProfileType } from "./profile-card";
import { ProfileForm } from "./profile-form";

export function ProfileLayout() {
  const [activeTab, setActiveTab] = useState< ProfileType>("user");

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="user" className="w-full sticky top-0" onValueChange={(value) => setActiveTab(value as ProfileType)}>
       <div className="w-full flex justify-center flex-row items-center">
        <div></div>
       <TabsList className="grid w-[400px] grid-cols-2  sticky top-0 ">
          <TabsTrigger value="user">User Profile</TabsTrigger>
          <TabsTrigger value="business">Business Profile</TabsTrigger>
        </TabsList>
        <div></div>
       </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[400px_1fr] px-3">
          <ProfileCard activeTab={activeTab} />
          <TabsContent value="user">
            fgfg
            <ProfileForm />
          </TabsContent>
          <TabsContent value="business">
            fgfgfrg
            {/* <div className="rounded-lg border p-8">
              Business profile content here
            </div> */}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
