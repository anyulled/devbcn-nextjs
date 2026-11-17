import DynamicHeaderWrapper from "@/components/layout/DynamicHeaderWrapper";
import { getEditionNavigation } from "@/lib/server/navigation";
import { Suspense } from "react";

async function YearHeader({ params }: Readonly<{ params: Promise<{ year: string }> }>) {
  const { year } = await params;
  const navigation = await getEditionNavigation(year);

  return <DynamicHeaderWrapper navigation={navigation} />;
}

export default function Layout({
  children,
  modal,
  params,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode; params: Promise<{ year: string }> }>) {
  return (
    <>
      <Suspense fallback={null}>
        <YearHeader params={params} />
      </Suspense>
      {children}
      <Suspense fallback={null}>{modal}</Suspense>
    </>
  );
}
