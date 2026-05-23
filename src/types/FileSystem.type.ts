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
    selectedFolderId: string | null;
    setSelectedFolderId: (id: string | null) => void;
    selectedFileId: string | null;
  setSelectedFileId: (id: string | null) => void;
  renameItem: (id: string, newName: string) => void;
   
  }
  