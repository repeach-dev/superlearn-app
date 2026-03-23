"use client";

import React from "react";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
// import { DefaultProps } from "@/types/default-type";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const MainPageProviders: React.FC<any> = ({ children }) => {
  const [queryClient] = React.useState(getQueryClient);
  const providers: any[] = [
  ]

  return (
    <QueryClientProvider client={ queryClient }>
        { providers.reduce((acc, Provider) => {
          return <Provider>{ acc }</Provider>
        }, children) }
    </QueryClientProvider>
  )
};
