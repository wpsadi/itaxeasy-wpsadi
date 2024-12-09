import { Card } from "@/components/ui/card";

import { BusinessProfileCard } from "./(businessProfile)/businessProfile";
import { UserProfile } from "./(userProfile)/userProfile";

export type ProfileType = "user" | "business";

interface ProfileCardProps {
  activeTab: ProfileType;
}

export function ProfileCard({ activeTab }: ProfileCardProps) {
  console.log("ProfileCard", activeTab);
  return (
    <>
      {activeTab === "user" && (
        <>
          <Card className="p-6">
            <UserProfile />
          </Card>
        </>
      )}
      {activeTab === "business" && <BusinessProfileCard />}
    </>
  );
}
