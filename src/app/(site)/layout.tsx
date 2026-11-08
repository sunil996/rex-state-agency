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
    <div className="flex min-h-screen max-w-[100%] flex-col overflow-x-hidden">
      <div className="fixed inset-x-0 top-0 z-[65]">
        <DesignRibbon />
      </div>
      <Header />
      <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      <Footer />
      <DesignSwitcher />
    </div>
  );
}
