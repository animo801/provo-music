import { NextRequest, NextResponse } from "next/server";
import { fetchShowsByMonth } from "@/app/lib/notion";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get("year") ?? "");
  const month = parseInt(searchParams.get("month") ?? "");

  if (!year || !month || month < 1 || month > 12) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const shows = await fetchShowsByMonth(year, month);
  return NextResponse.json(shows);
}
