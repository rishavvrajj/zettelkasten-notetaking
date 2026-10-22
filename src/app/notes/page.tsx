"use client";

import React, { useState, useEffect } from "react";
import { Note } from "@/types/note";
import { INITIAL_NOTES } from "@/lib/mockNotes";
import { slugify } from "@/lib/noteUtils";
import ObsidianActivityBar from "@/components/ObsidianActivityBar";
import ObsidianSidebar from "@/components/ObsidianSidebar";
import ObsidianTabNav from "@/components/ObsidianTabNav";
import ObsidianEditor from "@/components/ObsidianEditor";
import ObsidianRightPanel from "@/components/ObsidianRightPanel";

export default function ObsidianNotesWorkspace() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [folders, setFolders] = useState<string[]>(["learning", "philosophy", "knowledge", "Excalidraw/system-design"]);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(INITIAL_NOTES[0]?.id || null);
  const [openTabIds, setOpenTabIds] = useState<string[]>([INITIAL_NOTES[0]?.id || ""]);
  const [activityTab, setActivityTab] = useState("explorer");
  const [searchQuery, setSearchQuery] = useState("");

  // Load from localStorage on mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("noteweaver_obsidian_notes");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNotes(parsed);
          setCurrentNoteId(parsed[0].id);
          setOpenTabIds([parsed[0].id]);
        }
      }
      const savedFolders = localStorage.getItem("noteweaver_obsidian_folders");
      if (savedFolders) {
        const parsedFolders = JSON.parse(savedFolders);
        if (Array.isArray(parsedFolders)) {
          setFolders(parsedFolders);
        }
      }
    } catch (e) {
      console.error("Failed to load notes from localStorage", e);
    }
  }, []);

  // Save to localStorage whenever notes/folders change
  useEffect(() => {
    try {
      localStorage.setItem("noteweaver_obsidian_notes", JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save notes to localStorage", e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem("noteweaver_obsidian_folders", JSON.stringify(folders));
    } catch (e) {
      console.error("Failed to save folders to localStorage", e);
    }
  }, [folders]);

  const currentNote = notes.find((n) => n.id === currentNoteId) || null;
  const openTabs = openTabIds
    .map((id) => notes.find((n) => n.id === id))
    .filter(Boolean) as Note[];

  // Select Note and ensure it's in tabs
  const handleSelectNote = (id: string) => {
    setCurrentNoteId(id);
    if (!openTabIds.includes(id)) {
      setOpenTabIds([...openTabIds, id]);
    }
  };

  const handleSelectNoteByTitle = (title: string) => {
    const found = notes.find(
      (n) => n.title.toLowerCase() === title.toLowerCase() || slugify(n.title) === slugify(title)
    );
    if (found) {
      handleSelectNote(found.id);
    } else {
      handleCreateAndSelectNote(title);
    }
  };

  const handleCreateNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "Untitled Note",
      content: `# Untitled Note\n\nStart writing your note here...`,
      tags: ["general"],
      folder: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    handleSelectNote(newNote.id);
  };

  const handleCreateNoteInFolder = (folder: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "Untitled Note",
      content: `# Untitled Note\n\nStart writing your note here...`,
      tags: ["general"],
      folder: folder,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    handleSelectNote(newNote.id);
  };

  const handleCreateFolder = () => {
    const defaultName = `New Folder ${folders.length + 1}`;
    if (!folders.includes(defaultName)) {
      setFolders([...folders, defaultName]);
    }
  };

  const handleCreateAndSelectNote = (title: string) => {
    const existing = notes.find(
      (n) => n.title.toLowerCase() === title.toLowerCase() || slugify(n.title) === slugify(title)
    );
    if (existing) {
      handleSelectNote(existing.id);
      return;
    }

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: title,
      content: `# ${title}\n\nCreated from wiki-link reference.`,
      tags: ["linked"],
      folder: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    handleSelectNote(newNote.id);
  };

  const handleUpdateNote = (updated: Note) => {
    setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabIds.filter((tabId) => tabId !== id);
    setOpenTabIds(newTabs);
    if (currentNoteId === id && newTabs.length > 0) {
      setCurrentNoteId(newTabs[newTabs.length - 1]);
    } else if (newTabs.length === 0) {
      setCurrentNoteId(null);
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#1E1E1E]">
      {/* 1. Far-Left Activity Bar */}
      <ObsidianActivityBar activeTab={activityTab} setActiveTab={setActivityTab} />

      {/* 2. Left File Explorer Sidebar */}
      <ObsidianSidebar
        notes={filteredNotes}
        folders={folders}
        currentNoteId={currentNoteId}
        onSelectNote={handleSelectNote}
        onCreateNote={handleCreateNote}
        onCreateFolder={handleCreateFolder}
        onCreateNoteInFolder={handleCreateNoteInFolder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Center Workspace: Tab Nav + Editor */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ObsidianTabNav
          openTabs={openTabs}
          currentNoteId={currentNoteId}
          onSelectTab={handleSelectNote}
          onCloseTab={handleCloseTab}
          onNewTab={handleCreateNote}
        />
        <ObsidianEditor
          note={currentNote}
          allNotes={notes}
          onUpdateNote={handleUpdateNote}
          onSelectNoteByTitle={handleSelectNoteByTitle}
          onCreateAndSelectNote={handleCreateAndSelectNote}
        />
      </div>

      {/* 4. Right Knowledge Graph & Outline Panel */}
      <ObsidianRightPanel
        currentNote={currentNote}
        allNotes={notes}
        onSelectNoteById={handleSelectNote}
        onSelectNoteByTitle={handleSelectNoteByTitle}
      />
    </div>
  );
}
