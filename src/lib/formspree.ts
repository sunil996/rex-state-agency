/** Early-launch form endpoints (Formspree). Override via env if needed. */
export const FORMSPREE = {
  contact:
    process.env.NEXT_PUBLIC_FORMSPREE_CONTACT ||
    "https://formspree.io/f/mgaabdjb",
  viewing:
    process.env.NEXT_PUBLIC_FORMSPREE_VIEWING ||
    "https://formspree.io/f/xoeezrob",
  valuation:
    process.env.NEXT_PUBLIC_FORMSPREE_VALUATION ||
    "https://formspree.io/f/meaawnbn",
} as const;

export async function submitFormspree(
  endpoint: string,
  payload: Record<string, string>,
) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    errors?: Array<{ message?: string }>;
  };

  if (!res.ok) {
    const message =
      data.error ||
      data.errors?.map((e) => e.message).filter(Boolean).join(", ") ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
}
