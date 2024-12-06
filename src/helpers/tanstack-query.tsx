"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { env } from "@/env";

function TanstackQuery({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({});
  const nodeENV = env.NODE_ENV;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {nodeENV !== "production" && <ReactQueryDevtools />}
        {children}
      </QueryClientProvider>
    </>
  );
}

export default TanstackQuery;
