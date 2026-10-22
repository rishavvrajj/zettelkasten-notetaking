"use client";

import React from "react";
import { GraphNode, GraphLink } from "@/types/note";

interface KnowledgeGraphSvgProps {
  nodes: GraphNode[];
  links: GraphLink[];
  onSelectNode: (noteId: string) => void;
  currentNoteId: string | null;
  width?: number;
  height?: number;
}

export default function KnowledgeGraphSvg({
  nodes,
  links,
  onSelectNode,
  currentNoteId,
  width = 600,
  height = 450,
}: KnowledgeGraphSvgProps) {
  if (nodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-sm p-6 text-center">
        <svg className="w-12 h-12 mb-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p>No graph connections available.</p>
        <p className="text-xs text-zinc-600 mt-1">Add [[Wiki-links]] in notes to connect ideas.</p>
      </div>
    );
  }

  const nodeMap = new Map<string, GraphNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#0e1117] rounded-xl border border-[#222736]">
      <svg
        className="w-full h-full select-none"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Links */}
        <g className="links">
          {links.map((link, idx) => {
            const sourceNode = nodeMap.get(link.source);
            const targetNode = nodeMap.get(link.target);
            if (!sourceNode || !targetNode) return null;

            const isCurrentLink =
              currentNoteId === sourceNode.id || currentNoteId === targetNode.id;

            return (
              <line
                key={`link-${idx}`}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={isCurrentLink ? "#818cf8" : "#2a3142"}
                strokeWidth={isCurrentLink ? 2 : 1}
                strokeOpacity={isCurrentLink ? 0.8 : 0.4}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {nodes.map((node) => {
            const isCurrent = node.id === currentNoteId;

            return (
              <g
                key={`node-${node.id}`}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer group"
                onClick={() => onSelectNode(node.id)}
              >
                {/* Stable invisible hit target */}
                <circle
                  r={node.radius + 14}
                  fill="transparent"
                  style={{ pointerEvents: "all" }}
                />

                {/* Glow effect on hover using pure CSS group-hover */}
                <circle
                  r={node.radius + 8}
                  fill="#6366f1"
                  opacity={isCurrent ? 0.35 : 0}
                  className={`pointer-events-none transition-opacity duration-150 ${
                    !isCurrent ? "group-hover:opacity-20" : ""
                  }`}
                />

                {/* Node Circle */}
                <circle
                  r={node.radius}
                  fill={isCurrent ? "#4f46e5" : "#141821"}
                  stroke={isCurrent ? "#a5b4fc" : "#2f374a"}
                  strokeWidth={isCurrent ? 2.5 : 1.5}
                  className="pointer-events-none transition-colors duration-150 group-hover:fill-[#1e2433] group-hover:stroke-[#818cf8] shadow-lg"
                />

                {/* Inner dot */}
                <circle
                  r={4}
                  fill={isCurrent ? "#ffffff" : "#818cf8"}
                  opacity={isCurrent ? 1 : 0.7}
                  className="pointer-events-none"
                />

                {/* Node Label */}
                <text
                  dy={node.radius + 16}
                  textAnchor="middle"
                  fill={isCurrent ? "#f3f4f6" : "#9ca3af"}
                  fontSize="11"
                  fontWeight={isCurrent ? "600" : "500"}
                  className="pointer-events-none drop-shadow-md select-none transition-colors duration-150 group-hover:fill-[#e5e7eb]"
                >
                  {node.title.length > 22 ? node.title.substring(0, 20) + "..." : node.title}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}