import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isNotes = pathname?.startsWith("/notes");

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b border-neutral-800 bg-[#1E1E1E]/90 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-7 h-7 rounded-md bg-white text-neutral-900 flex items-center justify-center font-bold text-xs shadow-sm transition-transform group-hover:scale-105">
          ZK
        </div>
        <span className="font-semibold text-sm tracking-tight text-white">Zettelkasten</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
        <Link href="/#features" className="hover:text-white transition-colors">
          Features
        </Link>
        <Link href="/#pricing" className="hover:text-white transition-colors">
          Pricing
        </Link>
        <Link href="/notes" className="hover:text-white transition-colors">
          Workspace
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        {!isNotes && (
          <Link
            href="/login"
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Sign In
          </Link>
        )}
        <Link
          href="/notes"
          className="px-3.5 py-1.5 text-xs font-medium text-neutral-900 bg-white hover:bg-neutral-200 rounded-md shadow-sm transition-all flex items-center gap-1.5"
        >
          <span>{isNotes ? "Workspace" : "Get Started"}</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
