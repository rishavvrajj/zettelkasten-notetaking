"use client";

import React from "react";
import { Note } from "@/types/note";
import { getOutgoingLinks, getBacklinks, generateGraphData } from "@/lib/noteUtils";
import KnowledgeGraphSvg from "./KnowledgeGraphSvg";

interface KnowledgePanelProps {
  currentNote: Note | null;
  allNotes: Note[];
  onSelectNoteById: (id: string) => void;
  onSelectNoteByTitle: (title: string) => void;
  onCreateAndSelectNote: (title: string) => void;
}

export default function KnowledgePanel({
  currentNote,
  allNotes,
  onSelectNoteById,
  onSelectNoteByTitle,
  onCreateAndSelectNote,
}: KnowledgePanelProps) {
  if (!currentNote) {
    return (
      <aside className="w-full lg:w-[340px] flex-shrink-0 bg-[#0e1117] border-l border-[#222736] flex flex-col h-full p-6 text-zinc-500 justify-center items-center text-center">
        <p className="text-xs">Select a note to view knowledge context, graph connections, and backlinks.</p>
      </aside>
    );
  }

  const outgoing = getOutgoingLinks(currentNote, allNotes);
  const backlinks = getBacklinks(currentNote, allNotes);
  const { nodes, links } = generateGraphData(allNotes, currentNote.id);

  return (
    <aside className="w-full lg:w-[340px] flex-shrink-0 bg-[#0e1117] border-l border-[#222736] flex flex-col h-full overflow-y-auto select-none">
      <div className="p-4 border-b border-[#222736]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Knowledge Context</h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Compact Knowledge Graph */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">Knowledge Graph</span>
            <span className="text-[10px] text-zinc-500">{nodes.length} nodes</span>
          </div>
          <div className="w-full h-52 bg-[#0b0d12] rounded-xl border border-[#222736] overflow-hidden shadow-inner">
            <KnowledgeGraphSvg
              nodes={nodes}
              links={links}
              onSelectNode={onSelectNoteById}
              currentNoteId={currentNote.id}
              width={320}
              height={208}
            />
          </div>
        </div>

        {/* Outgoing Links */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300">Outgoing Links</span>
            <span className="text-[10px] text-zinc-500">{outgoing.length}</span>
          </div>
          {outgoing.length === 0 ? (
            <p className="text-xs text-zinc-600 italic">No outgoing links. Use [[Note Title]] in content.</p>
          ) : (
            <div className="space-y-1.5">
              {outgoing.map((link, idx) => (
                <div
                  key={`out-${idx}`}
                  onClick={() => {
                    if (link.note) {
                      onSelectNoteById(link.note.id);
                    } else {
                      onCreateAndSelectNote(link.title);
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    link.note
                      ? "bg-[#121620] border-[#222736] hover:border-indigo-500/50 hover:bg-[#181f30] text-zinc-200"
                      : "bg-[#161216] border-rose-500/30 hover:border-rose-500/60 text-rose-300"
                  }`}
                >
                  <span className="font-medium truncate">{link.title}</span>
                  <span className="text-[10px] opacity-70">
                    {link.note ? "Open →" : "Create +"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Backlinks */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300">Backlinks</span>
            <span className="text-[10px] text-zinc-500">{backlinks.length}</span>
          </div>
          {backlinks.length === 0 ? (
            <p className="text-xs text-zinc-600 italic">No other notes link here yet.</p>
          ) : (
            <div className="space-y-1.5">
              {backlinks.map((bNote) => (
                <div
                  key={`back-${bNote.id}`}
                  onClick={() => onSelectNoteById(bNote.id)}
                  className="p-2.5 rounded-lg bg-[#121620] border border-[#222736] hover:border-indigo-500/50 hover:bg-[#181f30] text-xs cursor-pointer transition-all flex items-center justify-between text-zinc-200"
                >
                  <span className="font-medium truncate">{bNote.title}</span>
                  <span className="text-[10px] text-zinc-500">Backlink →</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Associated Tags */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-300">Note Tags</span>
          {currentNote.tags.length === 0 ? (
            <p className="text-xs text-zinc-600 italic">No tags assigned.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {currentNote.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md bg-[#141821] border border-[#222736] text-indigo-400 font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
