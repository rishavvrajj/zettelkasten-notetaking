import { Note, GraphNode, GraphLink } from "@/types/note";

/**
 * Extracts all wiki-link targets from markdown content.
 * Matches [[Note Title]] syntax.
 */
export function extractWikiLinks(content: string): string[] {
  if (!content) return [];
  const regex = /\[{2,3}([^\]|]+?)(?:\|([^\]]+?))?\]{2,3}/g;
  const links: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const target = match[1].trim();
    if (target && !links.includes(target)) {
      links.push(target);
    }
  }
  return links;
}

/**
 * Extracts headings from markdown content for the Outline panel.
 */
export function extractHeadings(content: string): { level: number; text: string }[] {
  if (!content) return [];
  const lines = content.split("\n");
  const headings: { level: number; text: string }[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
      });
    }
  }
  return headings;
}

/**
 * Normalizes a title to a URL-friendly or comparison slug.
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Finds outgoing links for a note, resolving them to existing note objects or unresolved titles.
 */
export function getOutgoingLinks(note: Note, allNotes: Note[]): { title: string; note?: Note }[] {
  const linkTitles = extractWikiLinks(note.content);
  return linkTitles.map((title) => {
    const found = allNotes.find(
      (n) => n.title.toLowerCase() === title.toLowerCase() || slugify(n.title) === slugify(title)
    );
    return {
      title,
      note: found,
    };
  });
}

/**
 * Finds backlinks pointing to a given note from all notes.
 */
export function getBacklinks(targetNote: Note, allNotes: Note[]): Note[] {
  return allNotes.filter((note) => {
    if (note.id === targetNote.id) return false;
    const outgoing = extractWikiLinks(note.content);
    return outgoing.some(
      (linkTitle) =>
        linkTitle.toLowerCase() === targetNote.title.toLowerCase() ||
        slugify(linkTitle) === slugify(targetNote.title)
    );
  });
}

/**
 * Generates graph nodes and links from all notes for the SVG Knowledge Graph.
 */
export function generateGraphData(notes: Note[], currentNoteId: string | null): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodesMap = new Map<string, GraphNode>();
  const links: GraphLink[] = [];

  const degrees = new Map<string, number>();
  notes.forEach((n) => degrees.set(n.id, 0));

  notes.forEach((note) => {
    const outgoing = extractWikiLinks(note.content);
    outgoing.forEach((targetTitle) => {
      const targetNote = notes.find(
        (n) => n.title.toLowerCase() === targetTitle.toLowerCase() || slugify(n.title) === slugify(targetTitle)
      );
      if (targetNote && targetNote.id !== note.id) {
        degrees.set(note.id, (degrees.get(note.id) || 0) + 1);
        degrees.set(targetNote.id, (degrees.get(targetNote.id) || 0) + 1);

        const exists = links.some(
          (l) =>
            (l.source === note.id && l.target === targetNote.id) ||
            (l.source === targetNote.id && l.target === note.id)
        );
        if (!exists) {
          links.push({
            source: note.id,
            target: targetNote.id,
            sourceTitle: note.title,
            targetTitle: targetNote.title,
          });
        }
      }
    });
  });

  const width = 300;
  const height = 220;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.38;

  const total = notes.length;
  notes.forEach((note, index) => {
    const angle = (index / Math.max(total, 1)) * 2 * Math.PI;
    const wobble = index % 3 === 0 ? 0.8 : 1.2;
    const x = centerX + Math.cos(angle) * radius * (index === 0 ? 0.15 : wobble);
    const y = centerY + Math.sin(angle) * radius * (index === 0 ? 0.15 : wobble);

    const deg = degrees.get(note.id) || 1;
    const nodeRadius = Math.max(14, Math.min(26, 10 + deg * 3));

    nodesMap.set(note.id, {
      id: note.id,
      title: note.title,
      x: Math.max(25, Math.min(width - 25, x)),
      y: Math.max(25, Math.min(height - 25, y)),
      radius: nodeRadius,
      isCurrent: note.id === currentNoteId,
      degree: deg,
      tags: note.tags,
    });
  });

  return {
    nodes: Array.from(nodesMap.values()),
    links,
  };
}
