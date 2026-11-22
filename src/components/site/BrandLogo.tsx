import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type BrandLogoVariant = "header-dark" | "header-light" | "hero" | "footer" | "mark";

const MARK_SRC = "/brand/Gemini_Generated_Image_ry3z9fry3z9fry3z.png";
const LOCKUP_SRC = "/brand/Gemini_Generated_Image_6hayew6hayew6hay.png";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  href?: string | null;
  priority?: boolean;
  className?: string;
}

function Wordmark({ dark }: { dark: boolean }) {
  const title = dark ? "text-rex-gold-bright" : "text-rex-ink";
  const sub = dark ? "text-rex-gold-soft" : "text-rex-ink/70";

  return (
    <span className="flex flex-col leading-none">
      <span
        className={`font-display text-[1.2rem] font-bold tracking-[0.18em] md:text-[1.35rem] ${title}`}
      >
        REX
      </span>
      <span
        className={`mt-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] md:text-[10px] ${sub}`}
      >
        Estate Agents
      </span>
    </span>
  );
}

export function BrandLogo({
  variant = "header-light",
  href = "/",
  priority = false,
  className = "",
}: BrandLogoProps) {
  let content: ReactNode;

  if (variant === "mark") {
    content = (
      <Image
        src={MARK_SRC}
        alt="Rex Estate Agents"
        width={48}
        height={48}
        priority={priority}
        className={`h-10 w-10 object-cover md:h-11 md:w-11 ${className}`}
      />
    );
  } else if (variant === "hero") {
    content = (
      <Image
        src={LOCKUP_SRC}
        alt="Rex Estate Agents"
        width={420}
        height={140}
        priority={priority}
        className={`h-14 w-auto object-contain md:h-24 ${className}`}
      />
    );
  } else if (variant === "footer") {
    content = (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        <Image
          src={MARK_SRC}
          alt=""
          width={48}
          height={48}
          className="h-11 w-11 shrink-0 object-cover ring-1 ring-white/10"
          aria-hidden
        />
        <Wordmark dark />
      </span>
    );
  } else {
    const dark = variant === "header-dark";
    content = (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <Image
          src={MARK_SRC}
          alt=""
          width={44}
          height={44}
          priority={priority}
          className="h-9 w-9 shrink-0 object-cover ring-1 ring-white/10 md:h-10 md:w-10"
          aria-hidden
        />
        <Wordmark dark={dark} />
      </span>
    );
  }

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center"
      aria-label="Rex Estate Agents home"
    >
      {content}
    </Link>
  );
}
