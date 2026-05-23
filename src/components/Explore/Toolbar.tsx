import React, { useCallback, useState } from 'react';
import { FolderPlus, FilePlus, Edit2, Trash2, MoreVertical } from 'lucide-react';
import {  toast } from 'react-toastify';
import { useFileSystem } from '@/hook/UseFileSystem';
import { Modal } from '../ui/Model';

export function Toolbar() {
  const { 
    selectedFolderId, 
    selectedFileId, 
    createItem, 
    items ,
    deleteItem,
    renameItem
  } = useFileSystem();

  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const activeId = selectedFileId || selectedFolderId;
  const activeItem = items.find(i => i.id === activeId);

  const handleCreateFolder = () => {
    const getitems = localStorage.getItem("mini-file-explorer-data");
    let existName = false;
    if (getitems) {
      try {
        const itemsArray = JSON.parse(getitems);
        if (Array.isArray(itemsArray)) {
          existName = itemsArray.some(item => 
            typeof item.name === 'string' && 
            item.name.trim() === inputValue.trim()
          );
        }
      } catch (e) {
        existName = false;
      }
    }
    if (existName) {
      toast.error("Name already exists");
      return;
    }
    if (inputValue.trim()) {
      createItem(inputValue.trim(), "folder", selectedFolderId);
      setIsNewFolderModalOpen(false);
      setInputValue("");
      toast.success("Folder created successfully",{autoClose:2000})
      return
    }
  };

  const handleCreateFile = () => {
    const getitems = localStorage.getItem("mini-file-explorer-data");
    let existName = false;
    if (getitems) {
      try {
        const itemsArray = JSON.parse(getitems);
        if (Array.isArray(itemsArray)) {
          existName = itemsArray.some(item => 
            typeof item.name === 'string' &&
            (
              item.name.trim() === inputValue.trim() ||
              item.name.trim() === `${inputValue.trim()}.txt`
            )
          );
        }
      } catch (e) {
        existName = false;
      }
    }
    if (existName) {
      toast.error("Name already exists");
      return;
    }
    if (inputValue.trim()) {

      const name = inputValue.trim().includes('.') ? inputValue.trim() : `${inputValue.trim()}.txt`;
      createItem(name, "file", selectedFolderId);
      setIsNewFileModalOpen(false);
      setInputValue("");
      toast.success("file created successfully",{autoClose:2000})
      return
    }
  };

  const handleRename = () => {
    if (inputValue.trim() && activeId) {
      const getitems = localStorage.getItem("mini-file-explorer-data");
      if (getitems) {
        try {
          const itemsArray = JSON.parse(getitems);
          if (Array.isArray(itemsArray)) {
            const currentItem = itemsArray.find(item => item.id === activeId);
            if (currentItem) {
              const newName = inputValue.trim();
              const duplicate = itemsArray.some(item =>
                item.id !== activeId &&
                item.parentId === currentItem.parentId &&
                item.type === currentItem.type &&
                (item.name === newName || (currentItem.type === "file" && item.name === (newName.includes('.') ? newName : `${newName}.txt`)))
              );
              if (duplicate) {
                toast.error("Name already exists");
                return;
              }
            }
          }
        } catch (e) {
          toast.error("something went wrong please try again")
        return        }
      }
    }
    if (inputValue.trim() && activeId) {
     renameItem(activeId, inputValue.trim());
      setIsRenameModalOpen(false);
      setInputValue("");
      toast.success("name update successfully",{autoClose:2000})
      return
    }
  };


  const handleDelete = () => {
    if (activeId) {
      if (confirm(`Are you sure you want to delete "${activeItem?.name}"?`)) {
        deleteItem(activeId);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button 
          onClick={() => { setInputValue(""); setIsNewFolderModalOpen(true); }}
          className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          <FolderPlus size={16} />
          <span className="hidden sm:inline">New Folder</span>
        </button>
        
        <button 
          onClick={() => { setInputValue(""); setIsNewFileModalOpen(true); }}
          className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          <FilePlus size={16} />
          <span className="hidden sm:inline">New File</span>
        </button>

        <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-2" />

        <button 
          onClick={() => { 
            if (activeItem) {
              setInputValue(activeItem.name); 
              setIsRenameModalOpen(true); 
            }
          }}
          disabled={!activeId}
          className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 disabled:opacity-30 rounded-md transition-colors"
          title="Rename"
        >
          <Edit2 size={16} />
        </button>

        <button
          onClick={handleDelete}
          disabled={!activeId}
          className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 disabled:opacity-30 rounded-md transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <Modal isOpen={isNewFolderModalOpen} onClose={() => setIsNewFolderModalOpen(false)} title="New Folder">
        <div className="space-y-4">
          <input
            autoFocus
            type="text"
            placeholder="Folder name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
            className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsNewFolderModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 rounded-md">Cancel</button>
            <button onClick={handleCreateFolder} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Create</button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isNewFileModalOpen} onClose={() => setIsNewFileModalOpen(false)} title="New Text File">
        <div className="space-y-4">
          <input
            autoFocus
            type="text"
            placeholder="File name (e.g. notes.txt)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
            className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsNewFileModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 rounded-md">Cancel</button>
            <button onClick={handleCreateFile} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Create</button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isRenameModalOpen} onClose={() => setIsRenameModalOpen(false)} title="Rename Item">
        <div className="space-y-4">
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsRenameModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 rounded-md">Cancel</button>
            <button onClick={handleRename} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Save</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
