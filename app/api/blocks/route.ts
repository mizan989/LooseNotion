import { NextResponse, type NextRequest } from "next/server";
import { requireUser } from "@/lib/server/auth";
import { getPageContent } from "@/lib/server/blocks";

/** GET /api/blocks?pageId=... — used for client-side refetching if a page is opened without SSR data. */
export async function GET(request: NextRequest) {
  await requireUser();
  const pageId = request.nextUrl.searchParams.get("pageId");
  if (!pageId) return NextResponse.json({ error: "pageId is required" }, { status: 400 });

  const content = await getPageContent(pageId);
  return NextResponse.json({ content });
}
