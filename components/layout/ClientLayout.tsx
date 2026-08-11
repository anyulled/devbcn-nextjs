"use client";
import BackToTop from "@/components/elements/BackToTop";
import Footer8 from "@/components/layout/footer/Footer8";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AddClassBody from "../elements/AddClassBody";

const legacyServiceWorkerMigrationKey = "devbcn-legacy-service-worker-migration-v1";

const revealAosContent = () => {
  document.querySelectorAll<HTMLElement>("[data-aos]").forEach((element) => {
    element.removeAttribute("data-aos");
    element.classList.add("aos-animate");
  });
};

const removeLegacyServiceWorker = async () => {
  if (window.localStorage.getItem(legacyServiceWorkerMigrationKey)) {
    return;
  }

  const registrations = "serviceWorker" in navigator ? await navigator.serviceWorker.getRegistrations() : [];
  const cacheNames = "caches" in window ? await window.caches.keys() : [];
  const results = await Promise.allSettled([
    ...registrations.map((registration) => registration.unregister()),
    ...cacheNames.map((cacheName) => window.caches.delete(cacheName)),
  ]);

  const failure = results.find((result) => result.status === "rejected");
  if (failure?.status === "rejected") {
    throw failure.reason;
  }

  window.localStorage.setItem(legacyServiceWorkerMigrationKey, "complete");
};

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isPortalLayout = pathname?.startsWith("/admin") || pathname?.startsWith("/sponsor");
  const isMinimalLayout = isPortalLayout || pathname?.includes("/convince-your-boss");

  useEffect(() => {
    const handleHashScroll = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace("#", "");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [pathname]);

  useEffect(() => {
    void removeLegacyServiceWorker().catch((error: unknown) => {
      console.error("Unable to remove the legacy service worker:", error);
    });

    void import("aos")
      .then(({ default: aos }) => {
        aos.init();
      })
      .catch((error: unknown) => {
        console.error("Unable to initialize animations:", error);
        revealAosContent();
      });
  }, []);

  return (
    <>
      <div id="top" />
      <AddClassBody />
      {children}
      {!isMinimalLayout && (
        <>
          <Footer8 />
          <BackToTop target="#top" />
        </>
      )}
    </>
  );
}
