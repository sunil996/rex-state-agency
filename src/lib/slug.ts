import { slugify } from "@/lib/format";
import { PropertyModel } from "@/lib/models/Property";

export async function uniquePropertySlug(base: string) {
  const root = slugify(base) || `property-${Date.now()}`;
  let slug = root;
  let i = 2;

  while (await PropertyModel.exists({ slug })) {
    slug = `${root}-${i}`;
    i += 1;
  }

  return slug;
}
