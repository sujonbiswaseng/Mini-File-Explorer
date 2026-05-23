import React, { useState, useEffect } from 'react';
import { X, Save, Truck } from 'lucide-react';
import { useFileSystem } from '@/hook/UseFileSystem';
import { toast } from 'react-toastify';

export function FileEditor() {
  const { selectedFileId,deleteItem, setSelectedFileId, items, updateFileContent } = useFileSystem();
  const [content, setContent] = useState("");
  const activeId = selectedFileId;
  const activeItem = items.find(i => i.id === activeId);
  const activeFile = selectedFileId ? items.find(i => i.id === selectedFileId) : null;


  useEffect(() => {
    if (activeFile) {
      setContent(activeFile.content || "");
    }
  }, [activeFile?.id]);

  if (!activeFile) return null;

  const handleSave = () => {
    updateFileContent(activeFile.id, content);
    toast.success("saved successfully", { autoClose: 1000 });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  const handleDelete = () => {
    if (activeId) {
      if (confirm(`Are you sure you want to delete "${activeItem?.name}"?`)) {
        deleteItem(activeId);
        toast.success("file deleted successfully")
        return
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 md:p-12 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 w-full h-full max-w-5xl rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900/80 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {activeFile.name}
            </h2>
            {content !== activeFile.content && (
              <span className="w-2 h-2 rounded-full bg-amber-500" title="Unsaved changes" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
            >
              <Save size={14} />
              <span>Save</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
            >
              <Truck size={14} />
              <span>delete</span>
            </button>
            <div className="w-px h-5 bg-gray-300 dark:bg-zinc-700 mx-1" />
            <button
              onClick={() => setSelectedFileId(null)}
              className="p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-md transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 sm:p-10 lg:px-20 lg:py-12 overflow-y-auto bg-white dark:bg-zinc-950">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start typing your notes here..."
            className="w-full h-full resize-none bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-zinc-700 font-sans text-base leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
