import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { staticContent, type PortfolioContent } from "@/lib/content";
import { fetchSupabaseContent } from "@/lib/content/supabase";

export const CONTENT_TAG = "portfolio-content";

/**
 * The single content entry point for the site.
 *
 * - Reads every section from Supabase when credentials exist.
 * - Falls back to the bundled content so the site never breaks.
 * - Cached briefly and tagged, so edits in Supabase show up within seconds and
 *   a webhook can force them immediately.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife({ stale: 30, revalidate: 5, expire: 60 });

  try {
    const remote = await fetchSupabaseContent();
    if (remote) return remote;
  } catch (error) {
    console.warn(
      "[island-journey] Supabase content unavailable — serving bundled content.",
      error,
    );
  }

  return staticContent;
}
