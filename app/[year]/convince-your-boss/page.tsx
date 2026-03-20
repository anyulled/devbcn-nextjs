import { getEditionConfig, getAvailableEditions } from "@/config/editions";
import ConvinceYourBossForm from "@/components/sections/convince-your-boss/ConvinceYourBossForm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

export async function generateStaticParams() {
  const years = getAvailableEditions();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: Readonly<PageProps>): Promise<Metadata> {
  const { year } = await params;
  try {
    getEditionConfig(year);
    return {
      title: `Convince Your Boss - DevBcn ${year}`,
      description: `Generate a letter to help you request approval to attend DevBcn ${year}.`,
    };
  } catch {
    return {
      title: "Not Found",
    };
  }
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { year } = await params;

  try {
    const config = getEditionConfig(year);
    return (
      <main className="main-content">
        <ConvinceYourBossForm config={config} year={year} />
      </main>
    );
  } catch {
    notFound();
  }
}
