import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { SettingsSections } from "@/components/settings/settings-sections";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata = { title: "Configurações" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <PageHeader
        title="Configurações"
        description="Gerencie sua conta, preferências e segurança."
      />
      <SettingsSections user={user} />
    </>
  );
}
