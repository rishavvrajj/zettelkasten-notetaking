"use client";

import React from "react";
import { Note } from "@/types/note";

interface ObsidianTabNavProps {
  openTabs: Note[];
  currentNoteId: string | null;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
  onNewTab: () => void;
}

export default function ObsidianTabNav({
  openTabs,
  currentNoteId,
  onSelectTab,
  onCloseTab,
  onNewTab,
}: ObsidianTabNavProps) {
  return (
    <div className="h-9 bg-[#1E1E1E] border-b border-neutral-800 flex items-center justify-between px-2 select-none flex-shrink-0">
      {/* Tabs Container */}
      <div className="flex items-center gap-1 overflow-x-auto h-full pt-1">
        {openTabs.map((tab) => {
          const isActive = tab.id === currentNoteId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group relative flex items-center gap-2 px-3 h-full text-xs cursor-pointer border-t-2 transition-colors ${
                isActive
                  ? "bg-[#1E1E1E] text-white border-neutral-400 font-medium border-b border-b-[#1E1E1E]"
                  : "bg-transparent text-neutral-400 border-transparent hover:bg-neutral-800/50 hover:text-white"
              }`}
            >
              <span className="truncate max-w-[120px]">{tab.title}</span>
              <button
                onClick={(e) => onCloseTab(tab.id, e)}
                className="opacity-60 group-hover:opacity-100 hover:text-white p-0.5 rounded transition-opacity"
                title="Close Tab"
              >
                ✕
              </button>
            </div>
          );
        })}
        <button
          onClick={onNewTab}
          className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
          title="New Note Tab"
        >
          +
        </button>
      </div>

      {/* Window Controls */}
      <div className="flex items-center gap-2 px-2 text-neutral-400">
        <button className="hover:text-white text-xs p-1" title="More Options">
          ⋯
        </button>
      </div>
    </div>
  );
}
