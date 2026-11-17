import DynamicHeaderWrapper from "@/components/layout/DynamicHeaderWrapper";
import { CURRENT_EDITION } from "@/config/editions";
import { getStaticEditionNavigation } from "@/lib/server/navigation";
import { Suspense } from "react";

export default function GlobalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const navigation = getStaticEditionNavigation(CURRENT_EDITION);

  return (
    <>
      <Suspense fallback={null}>
        <DynamicHeaderWrapper navigation={navigation} />
      </Suspense>
      {children}
    </>
  );
}
