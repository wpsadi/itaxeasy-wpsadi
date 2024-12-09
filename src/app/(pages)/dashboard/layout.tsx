import React from "react";

import { EnsureAuthenticated } from "@/components/common/EnsureAuthenticated";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <EnsureAuthenticated>{children}</EnsureAuthenticated>;
}
