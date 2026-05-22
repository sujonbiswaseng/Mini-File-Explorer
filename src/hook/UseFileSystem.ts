import { fileSystemContext } from "@/context/FilleSystemContext"
import { useContext } from "react"

export const useFilteSystem=()=>{
    const context=useContext(fileSystemContext)
    if(context===undefined){
        return "useFileSystem must be used within a FileSystemProvider"
    }
    return context
}