"use client";

import { useRouter } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { useStore } from "@/lib/store";
import type { Property } from "@/lib/types";

export default function AdminNewPropertyPage() {
  const router = useRouter();
  const { addProperty } = useStore();

  return (
    <div>
      <h1 className="font-display text-2xl uppercase tracking-[0.08em]">
        Add Property
      </h1>
      <p className="mt-2 text-sm text-rex-stone">
        Create a new rental listing. Photos uploaded here preview locally for
        this demo session.
      </p>
      <div className="mt-8 border border-rex-line bg-white p-6 md:p-8">
        <PropertyForm
          submitLabel="Publish listing"
          onSubmit={(values) => {
            const property: Property = {
              ...(values as Omit<Property, "id" | "createdAt">),
              id: `p${Date.now()}`,
              createdAt: new Date().toISOString().slice(0, 10),
            };
            addProperty(property);
            router.push("/admin/properties");
          }}
        />
      </div>
    </div>
  );
}
