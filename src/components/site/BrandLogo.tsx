import Image from "next/image";
import Link from "next/link";

type BrandLogoVariant = "header-dark" | "header-light" | "hero" | "footer" | "mark";

const config: Record<
  BrandLogoVariant,
  { src: string; width: number; height: number; className: string }
> = {
  "header-dark": {
    src: "/brand/logo-flat-dark.png",
    width: 148,
    height: 80,
    className: "h-11 w-auto md:h-12",
  },
  "header-light": {
    src: "/brand/logo-light.png",
    width: 148,
    height: 80,
    className: "h-11 w-auto md:h-12",
  },
  hero: {
    src: "/brand/logo-flat-dark.png",
    width: 280,
    height: 152,
    className: "h-20 w-auto md:h-28",
  },
  footer: {
    src: "/brand/logo-flat-dark.png",
    width: 160,
    height: 87,
    className: "h-14 w-auto",
  },
  mark: {
    src: "/brand/logo-mark.png",
    width: 48,
    height: 48,
    className: "h-10 w-10 md:h-11 md:w-11",
  },
};

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  href?: string | null;
  priority?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = "header-light",
  href = "/",
  priority = false,
  className = "",
}: BrandLogoProps) {
  const item = config[variant];
  const image = (
    <Image
      src={item.src}
      alt="Rex Estate Agents"
      width={item.width}
      height={item.height}
      priority={priority}
      className={`object-contain ${item.className} ${className}`}
    />
  );

  if (!href) return image;

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label="Rex Estate Agents home">
      {image}
    </Link>
  );
}
