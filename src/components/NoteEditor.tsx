"use client";

import React, { useState, useEffect } from "react";
import { Note } from "@/types/note";
import { extractWikiLinks, slugify } from "@/lib/noteUtils";

interface NoteEditorProps {
  note: Note | null;
  allNotes: Note[];
  onUpdateNote: (updated: Note) => void;
  onSelectNoteByTitle: (title: string) => void;
  onCreateAndSelectNote: (title: string) => void;
}

export default function NoteEditor({
  note,
  allNotes,
  onUpdateNote,
  onSelectNoteByTitle,
  onCreateAndSelectNote,
}: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [newTagInput, setNewTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"Saved locally" | "Unsaved changes">("Saved locally");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
      setSaveStatus("Saved locally");
    }
  }, [note?.id]);

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0b0d12] text-zinc-500 p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#141821] border border-[#222736] flex items-center justify-center text-indigo-400 mb-4 shadow-xl">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-zinc-300 mb-1">No note selected</h2>
        <p className="text-sm text-zinc-500 max-w-sm">
          Choose a note from the sidebar or create a new one to start writing and linking ideas.
        </p>
      </div>
    );
  }

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setSaveStatus("Unsaved changes");
    setIsSaving(true);
    const updated: Note = {
      ...note,
      title: newTitle,
      updatedAt: new Date().toISOString(),
    };
    onUpdateNote(updated);
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus("Saved locally");
    }, 400);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setSaveStatus("Unsaved changes");
    setIsSaving(true);
    const updated: Note = {
      ...note,
      content: newContent,
      updatedAt: new Date().toISOString(),
    };
    onUpdateNote(updated);
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus("Saved locally");
    }, 400);
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const cleanTag = newTagInput.trim().replace(/^#/, "").toLowerCase();
    if (tags.includes(cleanTag)) {
      setNewTagInput("");
      return;
    }
    const updatedTags = [...tags, cleanTag];
    setTags(updatedTags);
    setNewTagInput("");
    onUpdateNote({
      ...note,
      tags: updatedTags,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((t) => t !== tagToRemove);
    setTags(updatedTags);
    onUpdateNote({
      ...note,
      tags: updatedTags,
      updatedAt: new Date().toISOString(),
    });
  };

  // Render text with clickable wiki-links
  const renderContentWithWikiLinks = (text: string) => {
    if (!text) return null;

    // Regex for [[WikiLink]]
    const regex = /\[{2,3}([^\]|]+?)(?:\|([^\]]+?))?\]{2,3}/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const fullMatch = match[0];
      const targetTitle = match[1].trim();
      const matchIndex = match.index;

      // Push preceding text
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      // Check if target note exists
      const targetNote = allNotes.find(
        (n) => n.title.toLowerCase() === targetTitle.toLowerCase() || slugify(n.title) === slugify(targetTitle)
      );

      if (targetNote) {
        parts.push(
          <span
            key={`wiki-${matchIndex}`}
            onClick={() => onSelectNoteByTitle(targetNote.title)}
            className="wiki-link"
            title={`Open note: ${targetNote.title}`}
          >
            {targetTitle}
          </span>
        );
      } else {
        parts.push(
          <span
            key={`unresolved-${matchIndex}`}
            onClick={() => onCreateAndSelectNote(targetTitle)}
            className="unresolved-wiki-link"
            title={`Create new note: ${targetTitle}`}
          >
            {targetTitle} (Create)
          </span>
        );
      }

      lastIndex = matchIndex + fullMatch.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0b0d12] overflow-hidden">
      {/* Top Bar / Breadcrumb & Status */}
      <div className="px-6 py-3 border-b border-[#222736] flex items-center justify-between bg-[#0e1117]/50 backdrop-blur">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Notes</span>
          <span>/</span>
          <span className="text-zinc-200 font-medium truncate max-w-[200px]">{note.title || "Untitled"}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isSaving ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`}></span>
            {saveStatus}
          </span>
        </div>
      </div>

      {/* Main Editor Scroll Area */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 max-w-4xl mx-auto w-full space-y-6">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Note Title..."
          className="w-full text-2xl lg:text-3xl font-bold bg-transparent text-white placeholder-zinc-600 focus:outline-none border-b border-transparent focus:border-[#222736] pb-2 transition-colors"
        />

        {/* Tags bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#141821] border border-[#222736] text-indigo-400 text-xs font-medium"
            >
              <span>#{t}</span>
              <button
                onClick={() => handleRemoveTag(t)}
                className="text-zinc-500 hover:text-red-400 text-xs font-bold"
              >
                ×
              </button>
            </span>
          ))}

          <form onSubmit={handleAddTag} className="inline-flex items-center">
            <input
              type="text"
              placeholder="+ Add tag..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              className="px-2.5 py-1 text-xs bg-transparent border border-dashed border-[#222736] rounded-md text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 w-28"
            />
          </form>
        </div>

        {/* Markdown Textarea & Live Preview helper */}
        <div className="grid grid-cols-1 gap-6 pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="font-medium text-zinc-400">Content (Markdown & [[Wiki-links]])</span>
              <span>{content.length} characters</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Write your atomic note here... Use [[Note Title]] to link concepts."
              rows={16}
              className="w-full p-4 bg-[#121620] border border-[#222736] rounded-xl text-zinc-200 placeholder-zinc-600 font-mono text-sm leading-relaxed focus:outline-none focus:border-indigo-500 resize-y shadow-inner transition-colors"
            />
          </div>

          {/* Rendered Live Preview Box */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-medium text-zinc-400">Preview & Clickable Links</span>
            <div className="p-6 bg-[#121620]/60 border border-[#222736] rounded-xl text-zinc-300 text-sm leading-relaxed prose prose-invert max-w-none whitespace-pre-wrap">
              {renderContentWithWikiLinks(content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
