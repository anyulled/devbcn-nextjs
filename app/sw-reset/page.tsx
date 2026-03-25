import type { Metadata } from "next";
import ServiceWorkerResetPage from "@/components/pages/ServiceWorkerResetPage";

export const metadata: Metadata = {
  title: "Reset local browser data | DevBcn",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <ServiceWorkerResetPage />;
}
