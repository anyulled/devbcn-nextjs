import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import "@/styles/admin.scss";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch user role to ensure they are an admin
  const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();

  if (roleData?.role !== "admin") {
    // If not an admin, redirect to sponsor portal if they are a contact, or logout
    const { data: contactData } = await supabase.from("sponsor_users").select("sponsor_id").eq("email", user.email).single();

    if (contactData) {
      redirect("/sponsor");
    } else {
      // Not an admin and not a known sponsor contact
      await supabase.auth.signOut();
      redirect("/admin/login?error=Unauthorized");
    }
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img src="/assets/img/logo/logo.png" alt="DevBcn" />
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
              <Link href="/admin-job-offers">
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
