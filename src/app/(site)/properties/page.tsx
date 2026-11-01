import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertiesClient } from "./PropertiesClient";

export const metadata: Metadata = {
  title: "Properties to Rent",
  description:
    "Search rental properties across London and Southampton with Rex Estate Agents.",
};

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-rex-cream px-4 py-40 text-center text-sm text-rex-stone">
          Loading properties…
        </div>
      }
    >
      <PropertiesClient />
    </Suspense>
  );
}
