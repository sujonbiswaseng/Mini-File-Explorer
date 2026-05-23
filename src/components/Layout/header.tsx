import React from 'react';
import { Menu, Search, FolderClosed } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-14 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 rounded-md transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold cursor-default">
          <FolderClosed size={24} className="fill-indigo-100 dark:fill-indigo-900" />
          <span className="hidden sm:inline-block">Mini Explorer</span>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold text-sm shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
        SU
      </div>
    </header>
  );
}
