import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "server";
import superjson from "superjson";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5000/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
  transformer: superjson,
});
