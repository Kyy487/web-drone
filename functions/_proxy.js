const STRIPPED_REQUEST_HEADERS = [
  "host",
  "cf-connecting-ip",
  "cf-ipcountry",
  "cf-ray",
  "cf-visitor",
  "x-forwarded-proto",
  "x-forwarded-host",
];

const STRIPPED_RESPONSE_HEADERS = ["content-encoding", "content-length", "transfer-encoding"];

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function proxyToOrigin(request, env, path) {
  const origin = (env.DRONE_API_ORIGIN || "").trim().replace(/\/+$/, "");

  if (!origin) {
    return jsonResponse(503, {
      error: "DRONE_API_ORIGIN is not configured",
      hint: "Set DRONE_API_ORIGIN to the public URL of the drone API (for example a Cloudflare Tunnel URL).",
    });
  }

  let target;
  try {
    const url = new URL(request.url);
    target = new URL("/" + String(path || "").replace(/^\/+/, "") + url.search, origin);
  } catch {
    return jsonResponse(500, { error: "DRONE_API_ORIGIN is not a valid URL" });
  }

  const headers = new Headers(request.headers);
  STRIPPED_REQUEST_HEADERS.forEach((name) => headers.delete(name));

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

  let response;
  try {
    response = await fetch(target, init);
  } catch (error) {
    return jsonResponse(502, {
      error: "Failed to reach the drone API",
      detail: error instanceof Error ? error.message : String(error),
    });
  }

  const out = new Headers(response.headers);
  STRIPPED_RESPONSE_HEADERS.forEach((name) => out.delete(name));
  out.set("cache-control", "no-store");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: out,
  });
}
