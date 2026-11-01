"use client";

import { useParams, useRouter } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { useStore } from "@/lib/store";

export default function AdminEditPropertyPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getPropertyById, updateProperty } = useStore();
  const property = getPropertyById(params.id);

  if (!property) {
    return (
      <div className="border border-rex-line bg-white p-8">
        <p className="font-display text-xl uppercase tracking-[0.08em]">
          Property not found
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl uppercase tracking-[0.08em]">
        Edit Property
      </h1>
      <p className="mt-2 text-sm text-rex-stone">
        Update listing details, status and gallery images.
      </p>
      <div className="mt-8 border border-rex-line bg-white p-6 md:p-8">
        <PropertyForm
          initial={property}
          submitLabel="Save changes"
          onSubmit={(values) => {
            updateProperty(property.id, values);
            router.push("/admin/properties");
          }}
        />
      </div>
    </div>
  );
}
