// commentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import useNode, { CommentNode } from "../hooks/useNode";

interface CommentContextProps {
    commentsData: CommentNode;
    handleInsertNode: (folderId: number, item: string) => void;
    handleEditNode: (folderId: number, value: string) => void;
   
    countComments: () => number;
}

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

export const CommentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [commentsData, setCommentsData] = useState<CommentNode>(new CommentNode(1, "Root"));
    const { insertNode, editNode } = useNode();

    const handleInsertNode = (folderId: number, item: string) => {
        const updatedComments = insertNode(commentsData, folderId, item);
        setCommentsData(updatedComments);
    };

    const handleEditNode = (folderId: number, value: string) => {
        const updatedComments = editNode(commentsData, folderId, value);
        setCommentsData(updatedComments);
    };

 

    const countComments = () => {
        const countReplies = (node: CommentNode): number => {
            return 1 + node.items.reduce((acc, child) => acc + countReplies(child), 0);
        };
        return countReplies(commentsData) - 1;
    };

    return (
        <CommentContext.Provider 
            value={{
                commentsData,
                handleInsertNode,
                handleEditNode,
                countComments,
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};

export const useCommentContext = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error("useCommentContext must be used within a CommentProvider");
    }
    return context;
};
