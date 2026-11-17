import DynamicHeaderWrapper from "@/components/layout/DynamicHeaderWrapper";
import { getStaticEditionNavigation } from "@/lib/server/navigation";
import { Suspense } from "react";

export default function Layout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  const navigation = getStaticEditionNavigation("2027");

  return (
    <>
      <Suspense fallback={null}>
        <DynamicHeaderWrapper navigation={navigation} />
      </Suspense>
      {children}
      <Suspense fallback={null}>{modal}</Suspense>
    </>
  );
}
