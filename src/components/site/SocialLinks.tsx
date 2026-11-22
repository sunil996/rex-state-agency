import { Facebook, Instagram } from "lucide-react";
import { SITE_SOCIAL } from "@/lib/site";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.8a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const linkClass = {
  dark: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-3 text-white/70 ring-1 ring-white/15 transition duration-300 hover:-translate-y-0.5 hover:text-rex-gold hover:ring-rex-gold",
  light:
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-3 ring-1 ring-rex-line transition duration-300 hover:-translate-y-0.5 hover:text-rex-gold hover:ring-rex-gold",
} as const;

export function SocialLinks({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const cls = linkClass[variant];

  return (
    <div className={`flex gap-3 ${className}`.trim()}>
      <a
        href={SITE_SOCIAL.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={cls}
      >
        <Instagram className="h-4 w-4" />
      </a>
      <a
        href={SITE_SOCIAL.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className={cls}
      >
        <TikTokIcon className="h-4 w-4" />
      </a>
      <a
        href={SITE_SOCIAL.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={cls}
      >
        <Facebook className="h-4 w-4" />
      </a>
    </div>
  );
}
