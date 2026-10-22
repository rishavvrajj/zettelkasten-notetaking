"use client";

import React, { useState } from "react";
import { Note } from "@/types/note";

interface ObsidianSidebarProps {
  notes: Note[];
  folders: string[];
  currentNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  onCreateFolder: () => void;
  onCreateNoteInFolder: (folder: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ObsidianSidebar({
  notes,
  folders,
  currentNoteId,
  onSelectNote,
  onCreateNote,
  onCreateFolder,
  onCreateNoteInFolder,
  searchQuery,
  onSearchChange,
}: ObsidianSidebarProps) {
  const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (folderName: string) => {
    setCollapsedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const rootNotes = notes.filter((n) => !n.folder || n.folder === "");

  return (
    <aside className="w-[280px] bg-[#1E1E1E] border-r border-neutral-800 flex flex-col h-full select-none flex-shrink-0 text-neutral-200">
      {/* Vault Header */}
      <div className="px-3.5 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-tight text-white">
          <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>Workspace Vault</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onCreateFolder}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded transition-colors"
            title="New Folder"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </button>
          <button
            onClick={onCreateNote}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded transition-colors"
            title="New Note"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-2 border-b border-neutral-800">
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs bg-[#1E1E1E] border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400"
        />
      </div>

      {/* File Explorer Tree */}
      <div className="flex-1 overflow-y-auto py-2 px-1.5 space-y-1 text-xs">
        {/* Folders */}
        {folders.map((folderName) => {
          const folderNotes = notes.filter((n) => n.folder === folderName);
          const isCollapsed = collapsedFolders[folderName];

          return (
            <div key={folderName} className="space-y-0.5">
              <div
                className="group flex items-center justify-between px-2 py-1 rounded-md hover:bg-neutral-800 cursor-pointer text-neutral-300 font-medium transition-colors"
              >
                <div
                  onClick={() => toggleFolder(folderName)}
                  className="flex items-center gap-1.5 flex-1 truncate"
                >
                  <span className="text-[10px] text-neutral-500">{isCollapsed ? "▶" : "▼"}</span>
                  <svg className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <span className="truncate">{folderName}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateNoteInFolder(folderName);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-white text-neutral-400 transition-opacity"
                  title={`New note in ${folderName}`}
                >
                  +
                </button>
              </div>

              {!isCollapsed && (
                <div className="pl-5 space-y-0.5 mt-0.5">
                  {folderNotes.length === 0 ? (
                    <div className="px-2 py-1 text-[11px] text-neutral-500 italic">Empty folder</div>
                  ) : (
                    folderNotes.map((note) => {
                      const isActive = note.id === currentNoteId;
                      return (
                        <div
                          key={note.id}
                          onClick={() => onSelectNote(note.id)}
                          className={`px-2 py-1.5 rounded-md cursor-pointer truncate transition-colors ${
                            isActive
                              ? "bg-neutral-800 text-white font-medium"
                              : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white"
                          }`}
                        >
                          {note.title}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Root Notes */}
        {rootNotes.map((note) => {
          const isActive = note.id === currentNoteId;
          return (
            <div
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer truncate transition-colors ${
                isActive
                  ? "bg-neutral-800 text-white font-medium"
                  : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="truncate">{note.title}</span>
            </div>
          );
        })}
      </div>

      {/* Footer vault status */}
      <div className="p-3 border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between">
        <span>Vault Active</span>
        <span>{notes.length} files</span>
      </div>
    </aside>
  );
}
