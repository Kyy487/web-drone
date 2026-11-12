import { proxyToOrigin } from "../_proxy.js";

export async function onRequest(context) {
  const { request, env, params } = context;
  const path = Array.isArray(params.path) ? params.path.join("/") : params.path || "";

  return proxyToOrigin(request, env, path);
}
