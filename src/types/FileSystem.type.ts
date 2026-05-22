export type ItemType = "file" | "folder";

export interface FileSystemItem {
  id: string;
  name: string;
  type: ItemType;
  parentId: string | null;
  content?: string;
  createdAt: number;
  updatedAt: number;
}

export interface FileSystemContextType {
    items: FileSystemItem[];
    createItem: (name: string, type: ItemType, parentId: string | null) => void;

  }
  