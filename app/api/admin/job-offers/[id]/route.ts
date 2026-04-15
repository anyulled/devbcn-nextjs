import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = await createClient();

  const body = await request.json();
  const { title, location, url, text, sponsorId } = body;

  const updates: Record<string, string | null> = {
    title,
    location: location || null,
    url: url || null,
    text: text || null,
  };

  if (sponsorId) {
    updates.sponsorId = sponsorId;
  }

  const { data, error } = await supabase.from("job_offers").update(updates).eq("id", id).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
