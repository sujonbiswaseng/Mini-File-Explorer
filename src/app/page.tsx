"use client";

import { FileEditor } from "@/components/Explore/FileEditor";
import { MainPanel } from "@/components/Explore/mainpanel";
import { Sidebar } from "@/components/Layout/Sidebar";
import { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white dark:bg-zinc-950">

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <MainPanel/>
      </div>
      <FileEditor/>
    </div>
  );
}
