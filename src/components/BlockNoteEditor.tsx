"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { Block, BlockType } from "@/types/blockEditor";

interface BlockNoteEditorProps {
  initialTitle?: string;
  initialBlocks?: Block[];
  onSave?: (title: string, blocks: Block[]) => void;
  className?: string;
}

const DEFAULT_BLOCKS: Block[] = [
  { id: "b1", type: "h1", content: "Welcome to BlockNote Pro" },
  { id: "b2", type: "p", content: "Type markdown shortcuts like '# ', '## ', '- ', '1. ', '[] ', or '>' and watch the tags instantly disappear as they transform into rich styled blocks!" },
  { id: "b3", type: "callout", content: "Tip: Type '/' on any new line to open the command menu instantly.", calloutType: "tip" },
  { id: "b4", type: "h2", content: "Dynamic Markdown Features" },
  { id: "b5", type: "bullet", content: "Type '- ' at the start of a line for bullet lists" },
  { id: "b6", type: "numbered", content: "Type '1. ' for numbered lists" },
  { id: "b7", type: "todo", content: "Type '[] ' or '[ ] ' for interactive to-do checklists", checked: false },
  { id: "b8", type: "quote", content: "Type '> ' for elegant quotes", checked: false },
];

const SLASH_COMMANDS = [
  { type: "p", label: "Paragraph", icon: "📝", desc: "Plain text writing block", shortcut: "Text", keyword: "text p" },
  { type: "h1", label: "Heading 1", icon: "H1", desc: "Large section heading", shortcut: "# ", keyword: "h1 heading heading1" },
  { type: "h2", label: "Heading 2", icon: "H2", desc: "Medium section heading", shortcut: "## ", keyword: "h2 heading heading2" },
  { type: "h3", label: "Heading 3", icon: "H3", desc: "Small section heading", shortcut: "### ", keyword: "h3 heading heading3" },
  { type: "bullet", label: "Bullet List", icon: "•", desc: "Create a simple bulleted list", shortcut: "- ", keyword: "bullet list ul" },
  { type: "numbered", label: "Numbered List", icon: "1.", desc: "Create a numbered list", shortcut: "1. ", keyword: "numbered list ol" },
  { type: "todo", label: "To-do List", icon: "☑", desc: "Track tasks with checklists", shortcut: "[] ", keyword: "todo checklist check" },
  { type: "quote", label: "Quote", icon: "“", desc: "Capture quotations and callouts", shortcut: "> ", keyword: "quote blockquote" },
  { type: "divider", label: "Divider", icon: "―", desc: "Visually separate sections", shortcut: "---", keyword: "divider hr line" },
  { type: "code", label: "Code Block", icon: "</>", desc: "Write formatted code snippets", shortcut: "```", keyword: "code snippet programming" },
  { type: "table", label: "Table", icon: "⊞", desc: "Insert a structured data table", shortcut: "Table", keyword: "table grid data" },
  { type: "image", label: "Image", icon: "🖼", desc: "Embed an image via URL", shortcut: "Image", keyword: "image photo picture" },
  { type: "callout", label: "Callout Box", icon: "💡", desc: "Highlighted note or warning box", shortcut: "Callout", keyword: "callout alert note tip" },
  { type: "link", label: "Web Link Card", icon: "🔗", desc: "Add a formatted web link", shortcut: "Link", keyword: "link url" },
];

export default function BlockNoteEditor({
  initialTitle = "Untitled Document",
  initialBlocks = DEFAULT_BLOCKS,
  onSave,
  className = "",
}: BlockNoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [focusedId, setFocusedId] = useState<string | null>(initialBlocks[0]?.id || null);
  const [slashQuery, setSlashQuery] = useState<string | null>(null);
  const [slashIndex, setSlashIndex] = useState(0);
  const [activeTheme, setActiveTheme] = useState<"dark" | "light">("dark");
  const slashMenuId = useId();

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | HTMLTextAreaElement | null }>({});

  // Auto-save callback
  useEffect(() => {
    if (onSave) {
      onSave(title, blocks);
    }
  }, [title, blocks, onSave]);

  // Focus management
  useEffect(() => {
    if (focusedId && inputRefs.current[focusedId]) {
      inputRefs.current[focusedId]?.focus();
    }
  }, [focusedId]);

  const createNewBlock = (type: BlockType = "p", content = ""): Block => ({
    id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type,
    content,
    checked: false,
    language: type === "code" ? "javascript" : undefined,
    tableData:
      type === "table"
        ? {
            headers: ["Column 1", "Column 2", "Column 3"],
            rows: [
              ["Data 1", "Data 2", "Data 3"],
              ["Data 4", "Data 5", "Data 6"],
            ],
          }
        : undefined,
    imageUrl: type === "image" ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" : undefined,
    imageCaption: type === "image" ? "Workspace preview image" : undefined,
    calloutType: type === "callout" ? "tip" : undefined,
    linkUrl: type === "link" ? "https://anthropic.com" : undefined,
    linkText: type === "link" ? "Anthropic" : undefined,
  });

  // Dynamic Markdown parsing: tags disappear instantly as user types prefix
  const handleContentChange = (id: string, newContent: string) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== id) return block;

        let updatedType = block.type;
        let updatedContent = newContent;
        let updatedChecked = block.checked;

        // Live markdown prefix transformation (tag disappears, content is preserved)
        if (newContent.startsWith("# ")) {
          updatedType = "h1";
          updatedContent = newContent.slice(2);
        } else if (newContent.startsWith("## ")) {
          updatedType = "h2";
          updatedContent = newContent.slice(3);
        } else if (newContent.startsWith("### ")) {
          updatedType = "h3";
          updatedContent = newContent.slice(4);
        } else if (newContent.startsWith("- ") || newContent.startsWith("* ")) {
          updatedType = "bullet";
          updatedContent = newContent.slice(2);
        } else if (newContent.startsWith("1. ")) {
          updatedType = "numbered";
          updatedContent = newContent.slice(3);
        } else if (newContent.startsWith("[] ") || newContent.startsWith("[ ] ")) {
          updatedType = "todo";
          updatedContent = newContent.startsWith("[] ") ? newContent.slice(3) : newContent.slice(4);
          updatedChecked = false;
        } else if (newContent.startsWith("> ")) {
          updatedType = "quote";
          updatedContent = newContent.slice(2);
        } else if (newContent === "---") {
          updatedType = "divider";
          updatedContent = "";
        }

        // Slash command trigger
        if (newContent.startsWith("/")) {
          setSlashQuery(newContent.slice(1));
          setSlashIndex(0);
        } else if (slashQuery !== null) {
          setSlashQuery(null);
        }

        return {
          ...block,
          type: updatedType,
          content: updatedContent,
          checked: updatedChecked,
        };
      })
    );
  };

  const selectSlashCommand = (selectedType: BlockType) => {
    if (!focusedId) return;
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== focusedId) return block;
        const newBase = createNewBlock(selectedType, "");
        return {
          ...newBase,
          id: block.id,
        };
      })
    );
    setSlashQuery(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string, index: number) => {
    if (slashQuery !== null) {
      const filtered = SLASH_COMMANDS.filter(
        (c) =>
          c.label.toLowerCase().includes(slashQuery.toLowerCase()) ||
          c.keyword.toLowerCase().includes(slashQuery.toLowerCase()) ||
          c.type.toLowerCase().includes(slashQuery.toLowerCase())
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSlashIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSlashIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[slashIndex]) {
          selectSlashCommand(filtered[slashIndex].type as BlockType);
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setSlashQuery(null);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newBlock = createNewBlock("p", "");
      setBlocks((prev) => {
        const next = [...prev];
        next.splice(index + 1, 0, newBlock);
        return next;
      });
      setFocusedId(newBlock.id);
      setSlashQuery(null);
    } else if (e.key === "Backspace") {
      const block = blocks[index];
      if (block.content === "" && blocks.length > 1) {
        e.preventDefault();
        const prevBlock = blocks[index - 1];
        setBlocks((prev) => prev.filter((b) => b.id !== block.id));
        if (prevBlock) {
          setFocusedId(prevBlock.id);
        }
      }
    } else if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      setFocusedId(blocks[index - 1].id);
    } else if (e.key === "ArrowDown" && index < blocks.length - 1) {
      e.preventDefault();
      setFocusedId(blocks[index + 1].id);
    }
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(index, 1);
    newBlocks.splice(targetIdx, 0, moved);
    setBlocks(newBlocks);
  };

  const duplicateBlock = (index: number) => {
    const block = blocks[index];
    const dup: Block = {
      ...block,
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, dup);
    setBlocks(newBlocks);
    setFocusedId(dup.id);
  };

  const deleteBlock = (id: string) => {
    if (blocks.length <= 1) {
      setBlocks([{ ...blocks[0], content: "", type: "p" }]);
      return;
    }
    const idx = blocks.findIndex((b) => b.id === id);
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (idx > 0) {
      setFocusedId(blocks[idx - 1].id);
    } else if (blocks.length > 1) {
      setFocusedId(blocks[1].id);
    }
  };

  const changeBlockType = (id: string, newType: BlockType) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        return {
          ...createNewBlock(newType, b.content),
          id: b.id,
        };
      })
    );
  };

  // Inline formatting renderer
  const renderInlineMarkdown = (text: string) => {
    if (!text) return null;
    const inlineRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|~~.*?~~|\[.*?\]\(.*?\))/g;
    const splitParts = text.split(inlineRegex);

    return splitParts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={`inline-${i}`} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={`inline-${i}`} className="italic text-zinc-200">
            {part.slice(1, -1)}
          </em>
        );
      } else if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={`inline-${i}`} className="px-1.5 py-0.5 rounded bg-zinc-800 text-indigo-300 font-mono text-xs border border-zinc-700">
            {part.slice(1, -1)}
          </code>
        );
      } else if (part.startsWith("~~") && part.endsWith("~~")) {
        return (
          <span key={`inline-${i}`} className="line-through text-zinc-500">
            {part.slice(2, -2)}
          </span>
        );
      } else {
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          return (
            <a
              key={`inline-${i}`}
              href={linkMatch[2]}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 font-medium"
            >
              {linkMatch[1]}
            </a>
          );
        }
        return <span key={`inline-${i}`}>{part}</span>;
      }
    });
  };

  const filteredCommands = SLASH_COMMANDS.filter(
    (c) =>
      slashQuery === null ||
      c.label.toLowerCase().includes(slashQuery.toLowerCase()) ||
      c.keyword.toLowerCase().includes(slashQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(slashQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        activeTheme === "dark" ? "bg-[#0e1117] text-zinc-100" : "bg-slate-50 text-slate-900"
      } ${className}`}
    >
      {/* Top Header */}
      <header
        className={`sticky top-0 z-30 px-6 py-3.5 border-b flex items-center justify-between backdrop-blur-md ${
          activeTheme === "dark" ? "bg-[#0e1117]/80 border-zinc-800" : "bg-white/80 border-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/25">
            BN
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent font-semibold text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-indigo-500/50 rounded px-1 -ml-1"
              placeholder="Untitled Document"
            />
            <span className="text-[11px] text-zinc-500 font-mono">Dynamic WYSIWYG Block Editor</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 font-mono bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-700/50">
            <span>Type <kbd className="px-1.5 py-0.5 rounded bg-zinc-700 text-indigo-300 font-bold">/</kbd> for commands</span>
          </div>
          <button
            onClick={() => setActiveTheme(activeTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors text-xs font-medium"
            title="Toggle Theme"
          >
            {activeTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            onClick={() => {
              if (onSave) onSave(title, blocks);
              alert("Document saved successfully!");
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
          >
            Save Document
          </button>
        </div>
      </header>

      {/* Main Writing Surface */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 sm:px-12 py-12 space-y-2 relative">
        {blocks.map((block, index) => {
          const isFocused = focusedId === block.id;

          return (
            <div
              key={block.id}
              className={`group relative flex items-start gap-2 py-1 px-2 rounded-xl transition-all duration-150 ${
                isFocused ? (activeTheme === "dark" ? "bg-zinc-900/60 shadow-sm" : "bg-white shadow-sm ring-1 ring-slate-200") : "hover:bg-zinc-900/30"
              }`}
            >
              {/* Controls Bar */}
              <div
                className={`opacity-0 group-hover:opacity-100 flex items-center gap-0.5 pt-1.5 text-zinc-500 transition-opacity select-none ${
                  isFocused ? "opacity-100" : ""
                }`}
              >
                <button
                  onClick={() => duplicateBlock(index)}
                  className="p-1 hover:bg-zinc-800 hover:text-zinc-200 rounded text-xs transition-colors"
                  title="Duplicate block"
                >
                  📋
                </button>
                <button
                  onClick={() => deleteBlock(block.id)}
                  className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded text-xs transition-colors"
                  title="Delete block"
                >
                  🗑️
                </button>
                <div className="flex flex-col">
                  <button
                    onClick={() => moveBlock(index, "up")}
                    disabled={index === 0}
                    className="p-0.5 hover:bg-zinc-800 hover:text-zinc-200 rounded text-[10px] disabled:opacity-30"
                    title="Move up"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveBlock(index, "down")}
                    disabled={index === blocks.length - 1}
                    className="p-0.5 hover:bg-zinc-800 hover:text-zinc-200 rounded text-[10px] disabled:opacity-30"
                    title="Move down"
                  >
                    ▼
                  </button>
                </div>
              </div>

              {/* Block Content */}
              <div className="flex-1 relative">
                {isFocused && (
                  <div className="absolute -top-6 left-0 flex items-center gap-1 z-10">
                    <select
                      value={block.type}
                      onChange={(e) => changeBlockType(block.id, e.target.value as BlockType)}
                      aria-label="Block type"
                      className="text-[10px] font-mono bg-zinc-800 text-indigo-300 border border-zinc-700 rounded px-1.5 py-0.5 shadow focus:outline-none"
                    >
                      <option value="p">Paragraph</option>
                      <option value="h1">Heading 1</option>
                      <option value="h2">Heading 2</option>
                      <option value="h3">Heading 3</option>
                      <option value="bullet">Bullet List</option>
                      <option value="numbered">Numbered List</option>
                      <option value="todo">To-do</option>
                      <option value="quote">Quote</option>
                      <option value="divider">Divider</option>
                      <option value="code">Code</option>
                      <option value="table">Table</option>
                      <option value="image">Image</option>
                      <option value="callout">Callout</option>
                      <option value="link">Link Card</option>
                    </select>
                  </div>
                )}

                {block.type === "h1" && (
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current[block.id] = el;
                    }}
                    type="text"
                    value={block.content}
                    onChange={(e) => handleContentChange(block.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                    onFocus={() => setFocusedId(block.id)}
                    placeholder="Heading 1..."
                    className="w-full bg-transparent text-3xl font-bold text-white tracking-tight focus:outline-none placeholder-zinc-600 pb-1 pt-2"
                  />
                )}

                {block.type === "h2" && (
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current[block.id] = el;
                    }}
                    type="text"
                    value={block.content}
                    onChange={(e) => handleContentChange(block.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                    onFocus={() => setFocusedId(block.id)}
                    placeholder="Heading 2..."
                    className="w-full bg-transparent text-2xl font-semibold text-zinc-100 tracking-tight focus:outline-none placeholder-zinc-600 pb-1 pt-2"
                  />
                )}

                {block.type === "h3" && (
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current[block.id] = el;
                    }}
                    type="text"
                    value={block.content}
                    onChange={(e) => handleContentChange(block.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                    onFocus={() => setFocusedId(block.id)}
                    placeholder="Heading 3..."
                    className="w-full bg-transparent text-lg font-semibold text-zinc-200 tracking-tight focus:outline-none placeholder-zinc-600 pb-1 pt-1"
                  />
                )}

                {block.type === "p" && (
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current[block.id] = el;
                    }}
                    type="text"
                    value={block.content}
                    onChange={(e) => handleContentChange(block.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                    onFocus={() => setFocusedId(block.id)}
                    placeholder="Type '/' for commands, or write text..."
                    className="w-full bg-transparent text-base text-zinc-200 leading-relaxed focus:outline-none placeholder-zinc-600"
                  />
                )}

                {block.type === "bullet" && (
                  <div className="flex items-start gap-2.5">
                    <span className="text-indigo-400 font-bold select-none mt-0.5">•</span>
                    <input
                      ref={(el) => {
                        if (el) inputRefs.current[block.id] = el;
                      }}
                      type="text"
                      value={block.content}
                      onChange={(e) => handleContentChange(block.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      onFocus={() => setFocusedId(block.id)}
                      placeholder="List item..."
                      className="w-full bg-transparent text-base text-zinc-200 leading-relaxed focus:outline-none placeholder-zinc-600"
                    />
                  </div>
                )}

                {block.type === "numbered" && (
                  <div className="flex items-start gap-2.5">
                    <span className="text-indigo-400 font-mono text-sm font-semibold select-none mt-0.5">{index + 1}.</span>
                    <input
                      ref={(el) => {
                        if (el) inputRefs.current[block.id] = el;
                      }}
                      type="text"
                      value={block.content}
                      onChange={(e) => handleContentChange(block.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      onFocus={() => setFocusedId(block.id)}
                      placeholder="Numbered item..."
                      className="w-full bg-transparent text-base text-zinc-200 leading-relaxed focus:outline-none placeholder-zinc-600"
                    />
                  </div>
                )}

                {block.type === "todo" && (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={block.checked || false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setBlocks((prev) => prev.map((b) => (b.id === block.id ? { ...b, checked } : b)));
                      }}
                      className="w-4 h-4 rounded border-zinc-700 text-indigo-600 focus:ring-indigo-500 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      ref={(el) => {
                        if (el) inputRefs.current[block.id] = el;
                      }}
                      type="text"
                      value={block.content}
                      onChange={(e) => handleContentChange(block.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      onFocus={() => setFocusedId(block.id)}
                      placeholder="To-do task..."
                      className={`w-full bg-transparent text-base leading-relaxed focus:outline-none placeholder-zinc-600 ${
                        block.checked ? "line-through text-zinc-500" : "text-zinc-200"
                      }`}
                    />
                  </div>
                )}

                {block.type === "quote" && (
                  <div className="border-l-4 border-indigo-500 pl-4 py-1 italic bg-indigo-500/5 rounded-r-xl">
                    <input
                      ref={(el) => {
                        if (el) inputRefs.current[block.id] = el;
                      }}
                      type="text"
                      value={block.content}
                      onChange={(e) => handleContentChange(block.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      onFocus={() => setFocusedId(block.id)}
                      placeholder="Enter quote..."
                      className="w-full bg-transparent text-base text-zinc-200 italic focus:outline-none placeholder-zinc-600"
                    />
                  </div>
                )}

                {block.type === "divider" && (
                  <div className="py-4 flex items-center justify-center">
                    <hr className="w-full border-zinc-800" />
                  </div>
                )}

                {block.type === "code" && (
                  <div className="rounded-xl bg-[#141821] border border-zinc-800 overflow-hidden my-2 shadow-lg">
                    <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
                      <span>{block.language || "code"}</span>
                      <select
                        value={block.language || "javascript"}
                        onChange={(e) => {
                          const lang = e.target.value;
                          setBlocks((prev) => prev.map((b) => (b.id === block.id ? { ...b, language: lang } : b)));
                        }}
                        aria-label="Code language"
                        className="bg-zinc-800 text-zinc-300 border border-zinc-700 rounded px-2 py-0.5 text-xs focus:outline-none"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML/CSS</option>
                        <option value="json">JSON</option>
                        <option value="bash">Bash</option>
                      </select>
                    </div>
                    <textarea
                      ref={(el) => {
                        if (el) inputRefs.current[block.id] = el;
                      }}
                      value={block.content}
                      onChange={(e) => handleContentChange(block.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      onFocus={() => setFocusedId(block.id)}
                      rows={4}
                      placeholder="Write code snippet here..."
                      className="w-full p-4 bg-transparent font-mono text-xs sm:text-sm text-indigo-200 focus:outline-none resize-y leading-relaxed"
                    />
                  </div>
                )}

                {block.type === "table" && (
                  <div className="my-3 overflow-x-auto rounded-xl border border-zinc-800 bg-[#121620]">
                    <table className="w-full border-collapse text-xs sm:text-sm text-zinc-200">
                      <thead>
                        <tr className="bg-zinc-900 border-b border-zinc-800">
                          {block.tableData?.headers.map((th, thIdx) => (
                            <th key={thIdx} className="p-3 text-left font-semibold text-zinc-300 border-r border-zinc-800 last:border-r-0">
                              <input
                                type="text"
                                value={th}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setBlocks((prev) =>
                                    prev.map((b) => {
                                      if (b.id !== block.id || !b.tableData) return b;
                                      const newHeaders = [...b.tableData.headers];
                                      newHeaders[thIdx] = val;
                                      return { ...b, tableData: { ...b.tableData, headers: newHeaders } };
                                    })
                                  );
                                }}
                                className="bg-transparent font-semibold w-full focus:outline-none text-zinc-200"
                              />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.tableData?.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-zinc-800 hover:bg-zinc-900/40 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 border-r border-zinc-800 last:border-r-0">
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setBlocks((prev) =>
                                      prev.map((b) => {
                                        if (b.id !== block.id || !b.tableData) return b;
                                        const newRows = b.tableData.rows.map((rowArr, ri) =>
                                          ri === rIdx ? rowArr.map((c, ci) => (ci === cIdx ? val : c)) : rowArr
                                        );
                                        return { ...b, tableData: { ...b.tableData, rows: newRows } };
                                      })
                                    );
                                  }}
                                  className="bg-transparent w-full focus:outline-none text-zinc-300"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {block.type === "image" && (
                  <div className="my-3 space-y-2 rounded-2xl border border-zinc-800 bg-[#121620] p-4">
                    <input
                      type="text"
                      value={block.imageUrl || ""}
                      onChange={(e) => {
                        const url = e.target.value;
                        setBlocks((prev) => prev.map((b) => (b.id === block.id ? { ...b, imageUrl: url } : b)));
                      }}
                      placeholder="Paste image URL here..."
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 focus:outline-none"
                    />
                    {block.imageUrl && (
                      <div className="rounded-xl overflow-hidden max-h-[300px] bg-zinc-900 border border-zinc-800">
                        <img src={block.imageUrl} alt={block.imageCaption || "Embedded"} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input
                      type="text"
                      value={block.imageCaption || ""}
                      onChange={(e) => {
                        const caption = e.target.value;
                        setBlocks((prev) => prev.map((b) => (b.id === block.id ? { ...b, imageCaption: caption } : b)));
                      }}
                      placeholder="Image caption (optional)..."
                      className="w-full bg-transparent text-xs text-zinc-400 italic text-center focus:outline-none"
                    />
                  </div>
                )}

                {block.type === "callout" && (
                  <div className="my-2 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <input
                      ref={(el) => {
                        if (el) inputRefs.current[block.id] = el;
                      }}
                      type="text"
                      value={block.content}
                      onChange={(e) => handleContentChange(block.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      onFocus={() => setFocusedId(block.id)}
                      placeholder="Write callout message..."
                      className="w-full bg-transparent text-base text-indigo-200 font-medium focus:outline-none placeholder-indigo-400/50"
                    />
                  </div>
                )}

                {block.type === "link" && (
                  <div className="my-2 p-4 rounded-2xl bg-[#141821] border border-zinc-800 hover:border-indigo-500/50 transition-all flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">🔗</span>
                      <input
                        type="text"
                        value={block.linkText || ""}
                        onChange={(e) => {
                          const linkText = e.target.value;
                          setBlocks((prev) => prev.map((b) => (b.id === block.id ? { ...b, linkText } : b)));
                        }}
                        placeholder="Link title..."
                        className="flex-1 bg-transparent font-semibold text-sm text-white focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      value={block.linkUrl || ""}
                      onChange={(e) => {
                        const linkUrl = e.target.value;
                        setBlocks((prev) => prev.map((b) => (b.id === block.id ? { ...b, linkUrl } : b)));
                      }}
                      placeholder="https://url.com..."
                      className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono text-indigo-300 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Floating Slash Menu */}
        {slashQuery !== null && (
          <div
            id={slashMenuId}
            role="listbox"
            aria-label="Slash commands"
            className="absolute z-50 mt-2 w-72 max-h-80 overflow-y-auto rounded-2xl bg-[#141821] border border-zinc-700 shadow-2xl p-2 space-y-1 left-12 animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 mb-1">
              Add Block ({filteredCommands.length})
            </div>
            {filteredCommands.length === 0 ? (
              <div className="px-3 py-4 text-xs text-zinc-500 text-center">No matching blocks found</div>
            ) : (
              filteredCommands.map((cmd, idx) => (
                <div
                  key={cmd.type}
                  id={`${slashMenuId}-option-${idx}`}
                  role="option"
                  aria-selected={slashIndex === idx}
                  onClick={() => selectSlashCommand(cmd.type as BlockType)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    slashIndex === idx ? "bg-indigo-600 text-white shadow" : "hover:bg-zinc-800 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-zinc-800/80 flex items-center justify-center text-xs font-bold">
                      {cmd.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">{cmd.label}</span>
                      <span className={`text-[10px] ${slashIndex === idx ? "text-indigo-200" : "text-zinc-500"}`}>{cmd.desc}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${slashIndex === idx ? "bg-indigo-700 text-indigo-100" : "bg-zinc-800 text-zinc-400"}`}>
                    {cmd.shortcut}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Bottom add block trigger */}
        <div
          onClick={() => {
            const newBlock = createNewBlock("p", "");
            setBlocks([...blocks, newBlock]);
            setFocusedId(newBlock.id);
          }}
          className="h-24 cursor-pointer flex items-center justify-center text-zinc-600 hover:text-zinc-400 text-xs font-medium border border-dashed border-zinc-800 rounded-2xl transition-colors"
        >
          + Click to add paragraph at bottom
        </div>
      </main>
    </div>
  );
}
