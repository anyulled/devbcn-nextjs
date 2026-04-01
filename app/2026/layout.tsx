import DynamicHeaderWrapper from "@/components/layout/DynamicHeaderWrapper";
import { getEditionNavigation } from "@/lib/shared/navigation";

export default async function Layout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const navigation = await getEditionNavigation("2026");

  return (
    <>
      <DynamicHeaderWrapper navigation={navigation} />
      {children}
      {modal}
    </>
  );
}
