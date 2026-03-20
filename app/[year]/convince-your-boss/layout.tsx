import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ConvinceYourBossLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ year: string }>;
}>) {
  const { year } = await params;

  return (
    <div className="minimal-layout">
      <div className="container py-4">
        <Link id="back-home" href={`/${year}`} className="btn-back-home inline-flex items-center text-primary hover:underline">
          <ArrowLeft size={18} className="mr-2" />
          Back to DevBcn {year} Home
        </Link>
      </div>
      {children}
    </div>
  );
}
