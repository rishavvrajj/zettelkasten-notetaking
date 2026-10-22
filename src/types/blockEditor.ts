export type BlockType =
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bullet'
  | 'numbered'
  | 'todo'
  | 'quote'
  | 'divider'
  | 'code'
  | 'table'
  | 'image'
  | 'callout'
  | 'link';

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  checked?: boolean; // For todo items
  language?: string; // For code blocks
  tableData?: TableData; // For table blocks
  imageUrl?: string; // For image blocks
  imageCaption?: string; // For image caption
  calloutType?: 'info' | 'warning' | 'success' | 'tip'; // For callout blocks
  linkUrl?: string; // For link block
  linkText?: string; // For link block
}

export interface DocumentData {
  title: string;
  blocks: Block[];
  updatedAt: string;
}
