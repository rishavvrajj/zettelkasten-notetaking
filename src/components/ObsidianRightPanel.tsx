"use client";

import React from "react";
import { Note } from "@/types/note";
import { generateGraphData, extractHeadings } from "@/lib/noteUtils";

interface ObsidianRightPanelProps {
  currentNote: Note | null;
  allNotes: Note[];
  onSelectNoteById: (id: string) => void;
  onSelectNoteByTitle: (title: string) => void;
}

export default function ObsidianRightPanel({
  currentNote,
  allNotes,
  onSelectNoteById,
}: ObsidianRightPanelProps) {
  const graphData = generateGraphData(allNotes, currentNote?.id || null);
  const headings = currentNote ? extractHeadings(currentNote.content) : [];

  return (
    <aside className="w-[300px] bg-[#1E1E1E] border-l border-neutral-800 flex flex-col h-full select-none flex-shrink-0 text-neutral-200">
      {/* 1. Knowledge Graph Section */}
      <div className="flex-1 flex flex-col p-3 border-b border-neutral-800 min-h-[180px]">
        <div className="text-[11px] text-neutral-400 mb-2 flex items-center justify-between font-semibold tracking-wide uppercase">
          <span>Knowledge Graph</span>
          <span>{allNotes.length} nodes</span>
        </div>

        <div className="flex-1 bg-[#1E1E1E] border border-neutral-800 rounded-lg relative overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full cursor-grab active:cursor-grabbing" viewBox="0 0 300 220">
            {/* Links */}
            {graphData.links.map((link, idx) => {
              const sourceNode = graphData.nodes.find((n) => n.id === link.source);
              const targetNode = graphData.nodes.find((n) => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              return (
                <line
                  key={`link-${idx}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="currentColor"
                  className="text-neutral-700"
                  strokeWidth="1.25"
                  strokeOpacity="0.8"
                />
              );
            })}

            {/* Nodes */}
            {graphData.nodes.map((node) => {
              const isSelected = node.id === currentNote?.id;
              return (
                <g
                  key={`node-${node.id}`}
                  onClick={() => onSelectNoteById(node.id)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? "currentColor" : "#737373"}
                    className={`transition-all ${
                      isSelected ? "text-white group-hover:scale-125" : "text-neutral-400 group-hover:text-white group-hover:scale-125"
                    }`}
                  />
                  <text
                    x={node.x}
                    y={node.y - 8}
                    textAnchor="middle"
                    className={`text-[9px] font-medium pointer-events-none transition-colors ${
                      isSelected ? "fill-white font-bold" : "fill-neutral-400 group-hover:fill-neutral-200"
                    }`}
                  >
                    {node.title.length > 18 ? node.title.substring(0, 16) + "..." : node.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 2. Outline Section */}
      <div className="flex-1 flex flex-col p-3 min-h-[180px]">
        <div className="text-[11px] text-neutral-400 mb-2 flex items-center justify-between font-semibold tracking-wide uppercase">
          <span>Outline</span>
          <span>{headings.length} headings</span>
        </div>

        <div className="flex-1 bg-[#1E1E1E] border border-neutral-800 rounded-lg p-2.5 overflow-y-auto space-y-1">
          {headings.length === 0 ? (
            <div className="text-xs text-neutral-500 text-center py-6">
              No headings in current note.
            </div>
          ) : (
            headings.map((h, idx) => {
              const indent = (h.level - 1) * 10;
              return (
                <div
                  key={`outline-${idx}`}
                  style={{ paddingLeft: `${indent}px` }}
                  className="text-xs text-neutral-400 hover:text-white py-1 px-1.5 rounded hover:bg-neutral-800 cursor-pointer truncate transition-colors"
                >
                  {h.text}
                </div>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
