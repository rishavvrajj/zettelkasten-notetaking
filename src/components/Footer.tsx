import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#121212] py-10 px-6 text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-white text-neutral-900 flex items-center justify-center font-bold text-[10px]">
              ZK
            </div>
            <span className="font-semibold text-white text-sm">Zettelkasten</span>
          </div>
          <p className="max-w-sm text-neutral-400 leading-relaxed">
            A minimalist, Obsidian-inspired knowledge workspace designed to turn scattered notes into a connected second brain.
          </p>
        </div>

        <div>
          <h4 className="font-semibold uppercase tracking-wider text-white mb-3 text-[11px]">Product</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/notes" className="hover:text-white transition-colors">
                Workspace
              </Link>
            </li>
            <li>
              <Link href="/#features" className="hover:text-white transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition-colors">
                Sign In
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold uppercase tracking-wider text-white mb-3 text-[11px]">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/notes" className="hover:text-white transition-colors">
                Knowledge Graph
              </Link>
            </li>
            <li>
              <Link href="/notes" className="hover:text-white transition-colors">
                Wiki-links Guide
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-neutral-500">
        <p>© {new Date().getFullYear()} Zettelkasten. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Built for deep thinkers and structured learners.</p>
      </div>
    </footer>
  );
}
