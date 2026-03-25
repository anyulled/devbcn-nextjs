"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type CleanupState = "idle" | "cleaning" | "done" | "error";

async function clearLegacyServiceWorkerState(): Promise<void> {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map(async (registration) => {
        await registration.unregister();
      })
    );
  }

  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(async (cacheName) => {
        await caches.delete(cacheName);
      })
    );
  }
}

export default function ServiceWorkerResetPage() {
  const [state, setState] = useState<CleanupState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const runCleanup = useCallback(async () => {
    setState("cleaning");
    setMessage(null);

    try {
      await clearLegacyServiceWorkerState();
      setState("done");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unknown error");
      console.error("Service worker reset failed:", error);
    }
  }, []);

  useEffect(() => {
    void runCleanup();
  }, [runCleanup]);

  return (
    <main className="container d-flex align-items-center justify-content-center py-5 min-vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          <section className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5 text-center">
              <p className="text-uppercase text-muted fw-semibold small mb-2">Recovery route</p>
              <h1 className="display-6 fw-bold mb-3">Reset this browser</h1>
              <p className="lead mb-4">This page removes the legacy service worker and clears the cached assets that can keep an old DevBcn version alive.</p>

              {state === "cleaning" && (
                <div className="alert alert-info mb-4" role="status">
                  Cleaning local site data...
                </div>
              )}

              {state === "done" && (
                <div className="alert alert-success mb-4" role="status">
                  Cleanup complete. This browser should load the current site now.
                </div>
              )}

              {state === "error" && (
                <div className="alert alert-warning mb-4" role="alert">
                  The automatic cleanup failed. You can try again or clear the site data manually.
                  {message ? <div className="mt-2 small text-start">{message}</div> : null}
                </div>
              )}

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link className="btn btn-primary btn-lg" href="/">
                  Go to home
                </Link>
                <button className="btn btn-outline-secondary btn-lg" onClick={() => void runCleanup()} type="button">
                  Retry cleanup
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
