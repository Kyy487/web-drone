import { proxyToOrigin } from "./functions/_proxy.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/data" || url.pathname.startsWith("/data/")) {
      return proxyToOrigin(request, env, url.pathname.slice(1));
    }

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return proxyToOrigin(request, env, url.pathname.slice("/api/".length));
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
};
