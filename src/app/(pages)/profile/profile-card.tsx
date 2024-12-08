import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import { StatusBadge } from "./status-badge";

export type ProfileType = "user" | "business";

interface ProfileCardProps {
  activeTab: ProfileType;
}

export function ProfileCard({ activeTab }: ProfileCardProps) {
    console.log("ProfileCard",activeTab);
  return (
    <Card className="p-6">
      {
        activeTab === "user" && (<>
        <div className="relative mb-6">
        <div className="h-32 w-full rounded-lg bg-gradient-to-r from-blue-200 to-pink-200" />
        <Avatar className="absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 translate-y-1/2 transform border-4 border-white">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold">Sarthak Sahu</h2>
        <p className="text-sm text-muted-foreground">
          sarthaksahu813@gmail.com
        </p>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <StatusBadge type="aadhaar" verified={true} />
        <StatusBadge type="pan" verified={true} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center rounded-lg border p-4">
          <div className="text-center">
            <div className="text-sm font-medium">Business Profile</div>
            <div className="mt-1">
              <StatusBadge type="check" verified={true} size="sm" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-lg border p-4">
          <div className="text-center">
            <div className="text-sm font-medium">Pan Aadhaar Link</div>
            <div className="mt-1">
              <StatusBadge type="cross" verified={false} size="sm" />
            </div>
          </div>
        </div>
      </div>
        </>)
      }
    </Card>
  );
}
