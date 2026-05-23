import { fileSystemContext } from "@/context/FilleSystemContext";
import { useContext } from "react";

export function useFileSystem() {
  const context = useContext(fileSystemContext);
  if (context === undefined) {
    throw new Error("useFileSystem must be used within a FileSystemProvider");
  }
  return context;
}
