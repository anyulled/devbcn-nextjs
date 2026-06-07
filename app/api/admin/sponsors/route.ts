import { NextResponse } from "next/server";
import { z } from "zod";

import { getPortalAccess } from "@/lib/auth/portal-access";
import { createAdminClient } from "@/lib/supabase/admin";
import { createRouteHandlerClient } from "@/lib/supabase/server";

const sponsorContactSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().max(255).optional().or(z.literal("")),
});

const adminSponsorSchema = z.object({
  name: z.string().min(2).max(255),
  edition: z.string().min(4).max(50),
  categoryId: z.coerce.number().int().positive(),
  status: z.enum(["draft", "published", "needs_review"]),
  internalOwnerUserId: z.string().uuid().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  logo_url: z.string().url().optional().or(z.literal("")),
  description: z.string().max(2000).optional().or(z.literal("")),
  twitter: z.string().max(255).optional().or(z.literal("")),
  linkedin: z.string().max(255).optional().or(z.literal("")),
  bluesky: z.string().max(255).optional().or(z.literal("")),
  instagram: z.string().max(255).optional().or(z.literal("")),
  contacts: z.array(sponsorContactSchema),
});

function normalizeOptionalString(value: string | null | undefined) {
  return value ? value.trim() || null : null;
}

function normalizeContacts(contacts: Array<z.infer<typeof sponsorContactSchema>>) {
  const seenEmails = new Set<string>();

  return contacts.reduce<Array<{ email: string; name: string | null }>>((accumulator, contact) => {
    const email = contact.email.trim().toLowerCase();

    if (!email || seenEmails.has(email)) {
      return accumulator;
    }

    seenEmails.add(email);
    accumulator.push({
      email,
      name: normalizeOptionalString(contact.name),
    });
    return accumulator;
  }, []);
}

export async function POST(request: Request) {
  const supabase = await createRouteHandlerClient();
  const access = await getPortalAccess(supabase);

  if (!access.user || !access.isGlobalAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = adminSponsorSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid sponsor payload" }, { status: 400 });
  }

  const normalizedContacts = normalizeContacts(payload.data.contacts);
  const adminClient = createAdminClient();
  const { data: authUsersPage, error: authUsersError } = await adminClient.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (authUsersError) {
    return NextResponse.json({ error: authUsersError.message }, { status: 500 });
  }

  const userIdByEmail = new Map(authUsersPage.users.filter((user) => Boolean(user.email)).map((user) => [user.email!.toLowerCase(), user.id]));

  const { data: sponsor, error: sponsorInsertError } = await supabase
    .from("sponsors")
    .insert({
      name: payload.data.name.trim(),
      edition: payload.data.edition.trim(),
      category_id: payload.data.categoryId,
      status: payload.data.status,
      internal_owner_user_id: payload.data.internalOwnerUserId || null,
      website: normalizeOptionalString(payload.data.website),
      logo_url: normalizeOptionalString(payload.data.logo_url),
      description: normalizeOptionalString(payload.data.description),
      twitter: normalizeOptionalString(payload.data.twitter),
      linkedin: normalizeOptionalString(payload.data.linkedin),
      bluesky: normalizeOptionalString(payload.data.bluesky),
      instagram: normalizeOptionalString(payload.data.instagram),
    })
    .select("id")
    .single();

  if (sponsorInsertError || !sponsor) {
    return NextResponse.json({ error: sponsorInsertError?.message || "Failed to create sponsor" }, { status: 500 });
  }

  if (normalizedContacts.length > 0) {
    const { error: contactsInsertError } = await supabase.from("sponsor_users").insert(
      normalizedContacts.map((contact) => ({
        sponsor_id: sponsor.id,
        email: contact.email,
        name: contact.name,
        user_id: userIdByEmail.get(contact.email) ?? null,
      }))
    );

    if (contactsInsertError) {
      return NextResponse.json({ error: contactsInsertError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, sponsorId: sponsor.id });
}
