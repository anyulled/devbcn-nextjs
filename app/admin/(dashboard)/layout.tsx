import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAdminRedirectPath, getPortalAccess } from "@/lib/auth/portal-access";
import { createClient } from "@/lib/supabase/server";
import "@/styles/admin.scss";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const access = await getPortalAccess(supabase);
  const redirectPath = getAdminRedirectPath(access);

  if (redirectPath) {
    redirect(redirectPath);
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Image src="/assets/img/logo/logo.png" alt="DevBcn" width={120} height={40} />
          <span>DevBcn Admin</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link href="/admin">
                <i className="fas fa-chart-line"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/sponsors">
                <i className="fas fa-handshake"></i> Sponsors
              </Link>
            </li>
            <li>
              <Link href="/admin/categories">
                <i className="fas fa-tags"></i> Categories
              </Link>
            </li>
            <li>
              <Link href="/admin/job-offers">
                <i className="fas fa-briefcase"></i> Job Offers
              </Link>
            </li>
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
