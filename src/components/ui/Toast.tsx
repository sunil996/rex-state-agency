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
    <div className="fixed bottom-24 left-4 right-4 z-[80] flex max-w-[calc(100%-2rem)] items-start gap-3 border border-rex-gold/40 bg-rex-ink px-4 py-3 text-white shadow-2xl sm:bottom-6 sm:left-auto sm:right-4 sm:max-w-sm">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-rex-gold" />
      <p className="min-w-0 flex-1 text-sm leading-relaxed">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center text-white/60 hover:text-white"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
