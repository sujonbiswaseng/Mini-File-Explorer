import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from 'lucide-react';
import { FileSystemItem } from '@/types/FileSystem.type';
import { useFileSystem } from '@/hook/UseFileSystem';
import { cn } from '@/lib/Utils';


interface TreeNodeProps {
  item: FileSystemItem;
  level?: number;
}

export function TreeNode({ item, level = 0 }: TreeNodeProps) {
  const { items, selectedFolderId, setSelectedFolderId, selectedFileId, setSelectedFileId } = useFileSystem();
  const [isExpanded, setIsExpanded] = useState(false);

  const children = items.filter(i => i.parentId === item.id).sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  
  const isSelected = item.type === 'folder' ? selectedFolderId === item.id : selectedFileId === item.id;
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === 'folder') {
      setSelectedFolderId(item.id);
      setIsExpanded(true);
    } else {
      setSelectedFileId(item.id);
    }
  };
  
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(prev => !prev);
  };

  return (
    <div>
      <div 
        onClick={handleClick}
        className={cn(
          "flex items-center py-1.5 px-2 cursor-pointer rounded-md text-sm transition-colors group select-none my-0.5",
          isSelected 
            ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" 
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <div 
          className="w-5 h-5 flex items-center justify-center shrink-0 mr-1 opacity-60 hover:opacity-100"
          onClick={item.type === 'folder' ? toggleExpand : undefined}
        >
          {item.type === 'folder' && children.length > 0 && (
            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          )}
        </div>
        
        <div className="mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
          {item.type === 'folder' ? (
            isExpanded ? <FolderOpen size={16} className="fill-indigo-100 dark:fill-indigo-950 text-indigo-500" /> : <Folder size={16} className="fill-indigo-50 dark:fill-indigo-950/20 text-indigo-400" />
          ) : (
            <FileText size={16} />
          )}
        </div>
        
        <span className="truncate flex-1 font-medium">{item.name}</span>
      </div>
      
      {isExpanded && item.type === 'folder' && (
        <div className="flex flex-col">
          {children.map(child => (
            <TreeNode key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
