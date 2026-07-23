import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { isValidEditionYear } from "@/config/editions";
import { Sponsor } from "@/config/editions/types";
import { getSponsorsForEdition } from "@/lib/supabase/public-queries";

const BASE_URL = "https://www.devbcn.com";

function mapSponsorCategory(key: string): string {
  switch (key) {
    case "top":
      return "Top Sponsor";
    case "premium":
      return "Premium Sponsor";
    case "regular":
      return "Regular Sponsor";
    case "basic":
      return "Basic Sponsor";
    case "communities":
      return "Community";
    case "media_partners":
      return "Media Partner";
    case "supporters":
      return "Supporter";
    default:
      return "Sponsor";
  }
}

function isAuthorizedToken(token: string | null, expectedToken: string): boolean {
  const safeToken = token ?? "";
  const safeExpectedToken = expectedToken ?? "";
  const tokenBuffer = Buffer.from(safeToken);
  const expectedBuffer = Buffer.from(safeExpectedToken);

  if (tokenBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(tokenBuffer, expectedBuffer);
}

function checkAuthentication(authHeader: string | null): NextResponse | null {
  const expectedToken = process.env.API_AUTH_TOKEN;

  if (!expectedToken) {
    return NextResponse.json({ error: "Server configuration error: Authentication token not set" }, { status: 500 });
  }

  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

  if (!isAuthorizedToken(token, expectedToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

function processSponsorLists(sponsorsData: Record<string, Sponsor[] | null>): Array<{ name: string; category: string; image: string }> {
  const flatSponsors: Array<{ name: string; category: string; image: string }> = [];

  for (const [key, sponsorsList] of Object.entries(sponsorsData)) {
    if (!sponsorsList || !Array.isArray(sponsorsList)) continue;

    const categoryName = mapSponsorCategory(key);
    for (const sponsor of sponsorsList) {
      const imageUrl = sponsor.image.startsWith("http") ? sponsor.image : `${BASE_URL}${sponsor.image.startsWith("/") ? "" : "/"}${sponsor.image}`;

      flatSponsors.push({
        name: sponsor.name,
        category: categoryName,
        image: imageUrl,
      });
    }
  }

  return flatSponsors;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ year: string }> }) {
  const resolvedParams = await params;
  const { year } = resolvedParams;

  const authError = checkAuthentication(request.headers.get("authorization"));
  if (authError) return authError;

  if (!isValidEditionYear(year)) {
    return NextResponse.json({ error: "Edition not found" }, { status: 404 });
  }

  const sponsorsData = (await getSponsorsForEdition(year)) as unknown as Record<string, Sponsor[] | null>;
  const flatSponsors = processSponsorLists(sponsorsData);

  return NextResponse.json(flatSponsors, { status: 200 });
}
