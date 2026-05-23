import { useFileSystem } from '@/hook/UseFileSystem';
import { Toolbar } from './Toolbar';

export function MainPanel() {
  const { items, selectedFolderId } = useFileSystem();

  const children = items.filter(i => i.parentId === selectedFolderId).sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const folders = children.filter(i => i.type === 'folder');
  const files = children.filter(i => i.type === 'file');

  const currentFolder = selectedFolderId ? items.find(i => i.id === selectedFolderId) : null;
  const breadcrumbs = currentFolder ? [currentFolder.name] : ['My Workspace'];

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 relative h-[calc(100vh-3.5rem)]">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-900 flex-shrink-0 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          <span className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
            {breadcrumbs[0]}
          </span>
        </div>
        <Toolbar />
      </div>
    </main>
  );
}
