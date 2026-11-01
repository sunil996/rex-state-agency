import type { Metadata } from "next";
import HomePage from "@/components/site/HomePage";

export const metadata: Metadata = {
  title: "Design 1 — British Editorial",
  description:
    "Rex Estate Agents homepage preview — British Editorial colour direction.",
};

export default function Design1Page() {
  return <HomePage />;
}
