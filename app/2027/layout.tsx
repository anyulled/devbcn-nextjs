import DynamicHeaderWrapper from "@/components/layout/DynamicHeaderWrapper";
import { getEditionNavigation } from "@/lib/server/navigation";

export default async function Layout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  const navigation = await getEditionNavigation("2027");

  return (
    <>
      <DynamicHeaderWrapper navigation={navigation} />
      {children}
      {modal}
    </>
  );
}
