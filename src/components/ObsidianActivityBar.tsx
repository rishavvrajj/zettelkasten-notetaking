"use client";

import React from "react";

interface ObsidianActivityBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ObsidianActivityBar({ activeTab, setActiveTab }: ObsidianActivityBarProps) {
  return (
    <div className="w-12 bg-[#1E1E1E] border-r border-neutral-800 flex flex-col items-center py-3 justify-between flex-shrink-0 select-none">
      <div className="flex flex-col items-center gap-2">
        {/* Explorer */}
        <button
          onClick={() => setActiveTab("explorer")}
          className={`p-2 rounded-lg transition-colors ${
            activeTab === "explorer"
              ? "text-white bg-neutral-800"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
          }`}
          title="File Explorer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </button>

        {/* Search */}
        <button
          onClick={() => setActiveTab("search")}
          className={`p-2 rounded-lg transition-colors ${
            activeTab === "search"
              ? "text-white bg-neutral-800"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
          }`}
          title="Search"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Graph */}
        <button
          onClick={() => setActiveTab("graph")}
          className={`p-2 rounded-lg transition-colors ${
            activeTab === "graph"
              ? "text-white bg-neutral-800"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
          }`}
          title="Graph View"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            <circle cx="6" cy="6" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <circle cx="12" cy="18" r="2.5" />
            <line x1="8" y1="7" x2="10" y2="16" />
            <line x1="16" y1="7" x2="14" y2="16" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors"
          title="Settings"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
