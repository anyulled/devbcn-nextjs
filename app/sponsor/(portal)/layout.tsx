import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSponsorRedirectPath, getPortalAccess } from "@/lib/auth/portal-access";
import { createClient } from "@/lib/supabase/server";

export default async function SponsorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const access = await getPortalAccess(supabase);
  const redirectPath = getSponsorRedirectPath(access);

  if (redirectPath) {
    redirect(redirectPath);
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Image src="/assets/img/logo/logo.png" alt="DevBcn" width={120} height={40} />
          <span>Sponsor Portal</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link href="/sponsor">
                <i className="fas fa-home"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/sponsor/job-offers">
                <i className="fas fa-briefcase"></i> My Job Offers
              </Link>
            </li>
            <li>
              <Link href="/sponsor/profile">
                <i className="fas fa-building"></i> Company Profile
              </Link>
            </li>
            {access.isGlobalAdmin && (
              <li>
                <Link href="/admin">
                  <i className="fas fa-user-shield"></i> Back to Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <form action="/auth/signout" method="post">
            <button type="submit" className="logout-button">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </form>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
