import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { CONTENT_TAG } from "@/lib/content/server";

/**
 * Webhook target for Supabase Database Webhooks (or any CI step).
 *
 * POST/GET https://your-site/api/revalidate?secret=REVALIDATE_SECRET
 * The secret can also be sent as the `x-revalidate-secret` header.
 */
async function handle(request: NextRequest): Promise<Response> {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { revalidated: false, message: "REVALIDATE_SECRET is not configured on the server." },
      { status: 503 },
    );
  }

  const provided =
    request.nextUrl.searchParams.get("secret") ?? request.headers.get("x-revalidate-secret");
  if (provided !== secret) {
    return Response.json({ revalidated: false, message: "Invalid secret." }, { status: 401 });
  }

  revalidateTag(CONTENT_TAG, { expire: 0 });
  return Response.json({ revalidated: true, tag: CONTENT_TAG, now: Date.now() });
}

export async function GET(request: NextRequest): Promise<Response> {
  return handle(request);
}

export async function POST(request: NextRequest): Promise<Response> {
  return handle(request);
}
