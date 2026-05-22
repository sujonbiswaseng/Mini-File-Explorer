import React from 'react';

import { X, Server } from 'lucide-react';
import { useFilteSystem } from '@/hook/UseFileSystem';
import { cn } from '@/lib/Utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {


  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-50/50 dark:bg-zinc-950/50 border-r border-gray-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out flex flex-col h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.5rem)] mt-14 md:mt-0",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-3 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 md:hidden bg-white dark:bg-zinc-900">
          <span className="font-medium text-gray-700 dark:text-gray-300">Explorer</span>
          <button onClick={onClose} className="p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-md">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
          <div
            className={cn(
              "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 px-2 py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors",
            )}
           
          >
            <Server size={14} />
            <span>My Workspace</span>
          </div>
        </div>
      </aside>
    </>
  );
}
