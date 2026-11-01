import { DesignRibbon } from "@/components/site/DesignRibbon";
import { DesignSwitcher } from "@/components/site/DesignSwitcher";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-x-0 top-0 z-[65]">
        <DesignRibbon />
      </div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <DesignSwitcher />
    </div>
  );
}
