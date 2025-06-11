"use client";
import { LocationProvider } from "@/components/location-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <LocationProvider>{children}</LocationProvider>
    </QueryClientProvider>
  );
}
