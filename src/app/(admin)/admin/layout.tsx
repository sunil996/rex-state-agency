import { notFound } from "next/navigation";

/**
 * TEMPORARY — admin UI hidden for early static launch.
 * Restore the previous AdminLayout (login + sidebar) when enabling live admin.
 * Original implementation is kept in `admin-layout.disabled.tsx` for easy restore.
 */
export default function AdminLayout({
  children: _children,
}: {
  children: React.ReactNode;
}) {
  notFound();
}
