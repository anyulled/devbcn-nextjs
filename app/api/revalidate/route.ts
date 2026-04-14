import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CURRENT_EDITION, isValidEditionYear } from "@/config/editions";
import { getSessionizeTag, isArchivedEditionYear } from "@/lib/revalidate";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");
  const expectedToken = process.env.REVALIDATE_SECRET;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const parsedYear = await (async (): Promise<string | NextResponse> => {
    try {
      const body = (await req.json()) as { year?: string } | null;
      if (body?.year === undefined) {
        return CURRENT_EDITION;
      }
      if (!isValidEditionYear(body.year)) {
        return NextResponse.json({ message: "Invalid edition year" }, { status: 400 });
      }
      return body.year;
    } catch (error) {
      if (error instanceof SyntaxError) {
        return CURRENT_EDITION;
      }

      console.error("Failed to parse revalidation payload:", error);
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }
  })();

  if (parsedYear instanceof Response) {
    return parsedYear;
  }
  if (isArchivedEditionYear(parsedYear)) {
    return NextResponse.json({ message: "Archived editions cannot be revalidated" }, { status: 400 });
  }

  revalidateTag(getSessionizeTag(parsedYear), "default");

  return NextResponse.json({
    revalidated: true,
    year: parsedYear,
    timestamp: new Date().toISOString(),
  });
}
