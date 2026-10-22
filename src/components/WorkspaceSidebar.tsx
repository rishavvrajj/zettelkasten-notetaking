"use client";

import React from "react";
import { Note } from "@/types/note";
import Link from "next/link";

interface WorkspaceSidebarProps {
  notes: Note[];
  currentNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string, e: React.MouseEvent) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export default function WorkspaceSidebar({
  notes,
  currentNoteId,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
  searchQuery,
  onSearchChange,
  selectedTag,
  onSelectTag,
}: WorkspaceSidebarProps) {
  // Extract all unique tags across notes
  const allTags = Array.from(
    new Set(notes.flatMap((n) => n.tags))
  ).sort();

  return (
    <aside className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 bg-[#0e1117] border-r border-[#222736] flex flex-col h-full select-none">
      {/* Top Header */}
      <div className="p-4 border-b border-[#222736] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-indigo-500 transition-colors">
            ZK
          </div>
          <span className="font-semibold text-white tracking-tight">Zettelkasten</span>
        </Link>
        <button
          onClick={onCreateNote}
          className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          title="Create New Note"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Note</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-[#222736]">
        <div className="relative">
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search notes or content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#141821] border border-[#222736] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-2.5 text-zinc-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="px-3 py-2.5 border-b border-[#222736] flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => onSelectTag(null)}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedTag === null
                ? "bg-indigo-600 text-white"
                : "bg-[#141821] text-zinc-400 hover:bg-[#1e2433] hover:text-zinc-200"
            }`}
          >
            All ({notes.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag === selectedTag ? null : tag)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? "bg-indigo-600 text-white"
                  : "bg-[#141821] text-zinc-400 hover:bg-[#1e2433] hover:text-zinc-200"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Note List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {notes.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-xs px-4">
            <p>No notes found.</p>
            <p className="mt-1">Try adjusting your search or create a new note.</p>
          </div>
        ) : (
          notes.map((note) => {
            const isActive = note.id === currentNoteId;
            // Get snippet
            const snippet =
              note.content
                .replace(/^#+\s+.*/gm, "")
                .trim()
                .substring(0, 75) || "Empty note...";

            return (
              <div
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={`group relative p-3 rounded-xl cursor-pointer transition-all border ${
                  isActive
                    ? "bg-[#181f30] border-indigo-500/50 shadow-sm"
                    : "bg-transparent border-transparent hover:bg-[#141821] hover:border-[#222736]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`text-xs font-semibold tracking-tight truncate ${
                      isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
                    }`}
                  >
                    {note.title || "Untitled Note"}
                  </h3>
                  <button
                    onClick={(e) => onDeleteNote(note.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 p-0.5 rounded transition-opacity"
                    title="Delete Note"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {snippet}
                </p>

                {/* Tags and timestamp */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#191e28]">
                  <div className="flex items-center gap-1 overflow-hidden">
                    {note.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-[#1a202c] text-indigo-400 font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-600 flex-shrink-0">
                    {new Date(note.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer stats */}
      <div className="p-3 border-t border-[#222736] flex items-center justify-between text-xs text-zinc-500">
        <span>{notes.length} notes</span>
        <span className="text-[10px] text-zinc-600">Local Zettelkasten</span>
      </div>
    </aside>
  );
}
