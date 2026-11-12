export async function onRequest(context) {
  const { request, env, params } = context;
  const origin = (env.DRONE_API_ORIGIN || "").replace(/\/+$/, "");

  if (!origin) {
    return new Response("DRONE_API_ORIGIN is not configured", { status: 500 });
  }

  const path = Array.isArray(params.path) ? params.path.join("/") : params.path || "";
  const target = new URL("/" + path + new URL(request.url).search, origin);

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("cf-connecting-ip");
  headers.delete("cf-ipcountry");
  headers.delete("cf-ray");
  headers.delete("cf-visitor");
  headers.delete("x-forwarded-proto");

  if (env.CF_ACCESS_CLIENT_ID && env.CF_ACCESS_CLIENT_SECRET) {
    headers.set("CF-Access-Client-Id", env.CF_ACCESS_CLIENT_ID);
    headers.set("CF-Access-Client-Secret", env.CF_ACCESS_CLIENT_SECRET);
  }

  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  const response = await fetch(target, init);
  const out = new Headers(response.headers);
  out.delete("content-encoding");
  out.delete("content-length");
  out.delete("transfer-encoding");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: out,
  });
}
