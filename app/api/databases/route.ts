import { NextResponse, type NextRequest } from "next/server";
import { requireUser } from "@/lib/server/auth";
import { getDatabaseColumns, getDatabaseRows } from "@/lib/server/databases";

/** GET /api/databases?databaseId=... — columns + rows for a database, used by client refetches. */
export async function GET(request: NextRequest) {
  await requireUser();
  const databaseId = request.nextUrl.searchParams.get("databaseId");
  if (!databaseId) return NextResponse.json({ error: "databaseId is required" }, { status: 400 });

  const [columns, rows] = await Promise.all([
    getDatabaseColumns(databaseId),
    getDatabaseRows(databaseId),
  ]);
  return NextResponse.json({ columns, rows });
}
