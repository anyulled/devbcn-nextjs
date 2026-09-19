import DynamicHeaderWrapper from "@/components/layout/DynamicHeaderWrapper";
import { getEditionNavigation } from "@/lib/shared/navigation";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const navigation = await getEditionNavigation("2027");
  return (
    <>
      <DynamicHeaderWrapper navigation={navigation} />
      {children}
    </>
  );
}
