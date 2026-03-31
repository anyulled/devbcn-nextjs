import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import "@/styles/admin.scss";

export default async function SponsorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sponsor/login");
  }

  // Ensure the user is a sponsor contact or admin
  const { data: sponsorUsers } = await supabase.from("sponsor_users").select("id").eq("user_id", user.id);

  const { data: adminRole } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();

  if ((!sponsorUsers || sponsorUsers.length === 0) && adminRole?.role !== "admin") {
    // If not a sponsor contact and not an admin, they shouldn't be here
    await supabase.auth.signOut();
    redirect("/sponsor/login?error=Unauthorized");
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img src="/assets/img/logo/logo.png" alt="DevBcn" />
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
            {adminRole?.role === "admin" && (
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
