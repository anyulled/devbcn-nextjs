import DynamicHeaderWrapper from "@/components/layout/DynamicHeaderWrapper";
import { CURRENT_EDITION } from "@/config/editions";
import { getEditionNavigation } from "@/lib/server/navigation";

export default async function GlobalLayout({ children }: { children: React.ReactNode }) {
  const navigation = await getEditionNavigation(CURRENT_EDITION);

  return (
    <>
      <DynamicHeaderWrapper navigation={navigation} />
      {children}
    </>
  );
}
