"use client";

import React, { useState, useEffect } from "react";
import { Note } from "@/types/note";
import { slugify } from "@/lib/noteUtils";

interface ObsidianEditorProps {
  note: Note | null;
  allNotes: Note[];
  onUpdateNote: (updated: Note) => void;
  onSelectNoteByTitle: (title: string) => void;
  onCreateAndSelectNote: (title: string) => void;
}

export default function ObsidianEditor({
  note,
  onUpdateNote,
}: ObsidianEditorProps) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      let rawContent = note.content || "";
      const lines = rawContent.split("\n");
      if (
        lines.length > 0 &&
        (lines[0].startsWith("#") || lines[0].toLowerCase().trim() === note.title.toLowerCase().trim())
      ) {
        let startIdx = 1;
        while (startIdx < lines.length && !lines[startIdx].trim()) {
          startIdx++;
        }
        rawContent = lines.slice(startIdx).join("\n");
      }
      setContent(rawContent);
    }
  }, [note?.id]);

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#1E1E1E] text-neutral-400 p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-200 mb-3 shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-sm font-medium text-neutral-200">No note selected</p>
        <p className="text-xs text-neutral-400 mt-1">Choose a note from the sidebar or create a new one.</p>
      </div>
    );
  }

  const handleContentChange = (newVal: string) => {
    setContent(newVal);
    onUpdateNote({
      ...note,
      content: newVal,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onUpdateNote({
      ...note,
      title: newTitle,
      updatedAt: new Date().toISOString(),
    });
  };

  const getFolderPath = () => {
    if (!note.folder) return "workspace";
    const segments = note.folder.split("/").map((s) => s.trim()).filter(Boolean);
    if (segments.length > 0 && slugify(segments[segments.length - 1]) === slugify(note.title)) {
      segments.pop();
    }
    if (segments.length === 0) return "";
    return segments.join(" / ");
  };

  const folderPath = getFolderPath();

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1E1E] overflow-hidden text-neutral-100">
      {/* Top Breadcrumb Bar */}
      <div className="px-6 py-2.5 border-b border-neutral-800 flex items-center justify-between bg-[#1E1E1E] text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          {folderPath && (
            <>
              <span className="text-neutral-500">{folderPath}</span>
              <span className="text-neutral-700">/</span>
            </>
          )}
          <span className="text-neutral-200 font-medium">{title}</span>
        </div>

        <div className="text-[11px] text-neutral-500">
          {content.length} chars
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col p-8 lg:p-16 overflow-y-auto max-w-4xl mx-auto w-full space-y-6">
        {/* Separated Title with H1 Size */}
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Note title..."
          className="w-full text-3xl lg:text-4xl font-bold bg-transparent text-white placeholder-neutral-600 focus:outline-none border-b border-neutral-800 pb-3 transition-colors"
        />

        {/* Normal Textarea Editor for natural text editing */}
        <div className="flex-1 flex flex-col space-y-4">
          <textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full flex-1 min-h-[350px] bg-transparent font-sans text-sm sm:text-base text-neutral-200 leading-relaxed focus:outline-none resize-y placeholder-neutral-600"
            placeholder="Start writing your atomic note..."
          />
        </div>
      </div>
    </div>
  );
}
