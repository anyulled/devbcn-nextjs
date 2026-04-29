import { NextResponse } from "next/server";
import { z } from "zod";

import { getPortalAccess } from "@/lib/auth/portal-access";
import { createRouteHandlerClient } from "@/lib/supabase/server";

const sponsorProfileSchema = z.object({
  sponsorId: z.string().uuid(),
  website: z.string().url().or(z.literal("")).optional(),
  logo_url: z.string().url().or(z.literal("")).optional(),
  description: z.string().max(2000).optional(),
  twitter: z.string().max(255).or(z.literal("")).optional(),
  linkedin: z.string().max(255).or(z.literal("")).optional(),
  bluesky: z.string().max(255).or(z.literal("")).optional(),
  instagram: z.string().max(255).or(z.literal("")).optional(),
});

export async function PUT(request: Request) {
  const supabase = await createRouteHandlerClient();
  const access = await getPortalAccess(supabase);

  console.log("[Profile Update] User:", access.user?.id, "isSponsorContact:", access.isSponsorContact, "sponsorIds:", access.sponsorIds);

  if (!access.user || !access.isSponsorContact) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = sponsorProfileSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid sponsor profile payload" }, { status: 400 });
  }

  console.log("[Profile Update] Payload sponsorId:", payload.data.sponsorId, "User sponsorIds:", access.sponsorIds);

  if (!access.sponsorIds.includes(payload.data.sponsorId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: currentSponsor, error: currentSponsorError } = await supabase.from("sponsors").select("status").eq("id", payload.data.sponsorId).single();

  if (currentSponsorError || !currentSponsor) {
    return NextResponse.json({ error: "Sponsor not found" }, { status: 404 });
  }

  const nextStatus = currentSponsor.status === "published" ? "needs_review" : currentSponsor.status;
  const { sponsorId, ...profileValues } = payload.data;

  console.log("[Profile Update] Updating sponsor:", sponsorId, "with values:", profileValues);

  const { error } = await supabase
    .from("sponsors")
    .update({
      ...profileValues,
      status: nextStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", sponsorId);

  if (error) {
    console.error("[Profile Update] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("[Profile Update] Success");
  return NextResponse.json({ ok: true });
}
