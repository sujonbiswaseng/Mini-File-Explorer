'use client'
import { createContext, useCallback, useEffect, useState } from "react";
import {FileSystemContextType, FileSystemItem, ItemType} from "../types/FileSystem.type"
export const fileSystemContext=createContext<FileSystemContextType | undefined>(undefined)

const INITIAL_DATA: FileSystemItem[] = [
    { id: "root-docs", name: "Documents", type: "folder", parentId: null, createdAt: Date.now(), updatedAt: Date.now() },
    { id: "root-pics", name: "Pictures", type: "folder", parentId: null, createdAt: Date.now(), updatedAt: Date.now() },
    { id: "root-down", name: "Downloads", type: "folder", parentId: null, createdAt: Date.now(), updatedAt: Date.now() },
    { id: "file-notes", name: "Notes.txt", type: "file", parentId: "root-docs", content: "These are some initial notes.\n\nWelcome to Mini File Explorer!", createdAt: Date.now(), updatedAt: Date.now() },
];

export const FileSystemProvider = ({children}:{children:React.ReactNode}) => {

    const [items, setItems] = useState<FileSystemItem[]>(INITIAL_DATA);
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
    

    useEffect(() => {
        try {
            const stored = localStorage.getItem("mini-file-explorer-data");
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load data from localStorage", e);
            setItems(INITIAL_DATA);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("mini-file-explorer-data", JSON.stringify(items));
    }, [items]);

    const createItem = useCallback((name: string, type: ItemType, parentId: string | null) => {
        const newItem: FileSystemItem = {
            id: crypto.randomUUID(),
            name,
            type,
            parentId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            ...(type === "file" ? { content: "" } : {}),
        };
        setItems((prev) => [...prev, newItem]);
    }, []);

    const renameItem = useCallback((id: string, newName: string) => {
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, name: newName, updatedAt: Date.now() } : item
          )
        );
      }, []);

      const deleteItem = useCallback((id: string) => {
        setItems((prev) => {
          const idsToDelete = new Set<string>();
    
          const collectIdsToDelete = (itemId: string) => {
            idsToDelete.add(itemId);
            prev.forEach((item) => {
              if (item.parentId === itemId) {
                collectIdsToDelete(item.id);
              }
            });
          };
    
          collectIdsToDelete(id);
          return prev.filter((item) => !idsToDelete.has(item.id));
        });
    
        // Reset selection if deleted
        if (selectedFolderId === id) setSelectedFolderId(null);
        if (selectedFileId === id) setSelectedFileId(null);
      }, [selectedFolderId, selectedFileId]);
    
      const updateFileContent = useCallback((id: string, content: string) => {
        setItems((prev) =>
          prev.map((item) =>
            item.id === id && item.type === "file"
              ? { ...item, content, updatedAt: Date.now() }
              : item
          )
        );
      }, []);

    return (
        <fileSystemContext.Provider
            value={{
                items,
                createItem,
                selectedFolderId,
                setSelectedFolderId,
                setSelectedFileId,
                selectedFileId,
                renameItem,
                deleteItem,
                updateFileContent
            }}
        >
            {children}
        </fileSystemContext.Provider>
    );
}