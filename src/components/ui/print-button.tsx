"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-amber-500 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 active:scale-95 transition-all shadow-md"
    >
      <Printer className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline">Save as PDF</span>
    </button>
  );
}
