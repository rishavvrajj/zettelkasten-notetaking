export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folder?: string; // e.g. "learning", "Excalidraw/system-design"
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface GraphNode {
  id: string;
  title: string;
  x: number;
  y: number;
  radius: number;
  isCurrent: boolean;
  degree: number;
  tags: string[];
}

export interface GraphLink {
  source: string;
  target: string;
  sourceTitle: string;
  targetTitle: string;
}
