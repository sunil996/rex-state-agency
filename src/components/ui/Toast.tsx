"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex max-w-sm items-start gap-3 border border-rex-gold/40 bg-rex-ink px-4 py-3 text-white shadow-2xl">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-rex-gold" />
      <p className="text-sm leading-relaxed">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-white/60 hover:text-white"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
