import type { Metadata } from "next";
import HomePage from "@/components/site/HomePage";

export const metadata: Metadata = {
  title: "Design 2 — Mayfair Noir",
  description:
    "Rex Estate Agents homepage preview — Mayfair Noir colour direction.",
};

export default function Design2Page() {
  return <HomePage />;
}
