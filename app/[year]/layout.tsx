import DynamicHeaderWrapper from "@/components/layout/DynamicHeaderWrapper";
import { getEditionNavigation } from "@/lib/utils/navigation";

export default async function Layout({ children, modal, params }: { children: React.ReactNode; modal: React.ReactNode; params: Promise<{ year: string }> }) {
  const { year } = await params;
  const navigation = await getEditionNavigation(year);

  return (
    <>
      <DynamicHeaderWrapper navigation={navigation} />
      {children}
      {modal}
    </>
  );
}
