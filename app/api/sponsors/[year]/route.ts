import { NextRequest, NextResponse } from "next/server";
import { editions, isValidEditionYear, EditionYear } from "@/config/editions";
import { Sponsor } from "@/config/editions/types";

const SPONSOR_CATEGORY_MAPPING: Record<string, string> = {
  top: "Top Sponsor",
  premium: "Premium Sponsor",
  regular: "Regular Sponsor",
  basic: "Basic Sponsor",
  communities: "Community",
  media_partners: "Media Partner",
  supporters: "Supporter",
};

const BASE_URL = "https://www.devbcn.com";

function checkAuthentication(authHeader: string | null): NextResponse | null {
  const expectedToken = process.env.API_AUTH_TOKEN;

  if (!expectedToken) {
    return NextResponse.json({ error: "Server configuration error: Authentication token not set" }, { status: 500 });
  }

  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

  // eslint-disable-next-line security/detect-possible-timing-attacks
  if (token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

function processSponsorLists(sponsorsData: Record<string, Sponsor[] | null>): Array<{ name: string; category: string; image: string }> {
  const flatSponsors: Array<{ name: string; category: string; image: string }> = [];

  for (const [key, sponsorsList] of Object.entries(sponsorsData)) {
    if (sponsorsList && Array.isArray(sponsorsList)) {
      // eslint-disable-next-line security/detect-object-injection
      const categoryName = SPONSOR_CATEGORY_MAPPING[key] || "Sponsor";
      flatSponsors.push(
        ...sponsorsList.map((sponsor) => {
          const imageUrl = sponsor.image.startsWith("http") ? sponsor.image : `${BASE_URL}${sponsor.image.startsWith("/") ? "" : "/"}${sponsor.image}`;

          return {
            name: sponsor.name,
            category: categoryName,
            image: imageUrl,
          };
        })
      );
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

  const validYear = year as EditionYear;
  // eslint-disable-next-line security/detect-object-injection
  const editionConfig = editions[validYear];
  if (!editionConfig) {
    return NextResponse.json({ error: "Edition not found" }, { status: 404 });
  }

  const sponsorsData = editionConfig.sponsorsData as unknown as Record<string, Sponsor[] | null>;
  const flatSponsors = processSponsorLists(sponsorsData);

  return NextResponse.json(flatSponsors, { status: 200 });
}
