import React, { createContext, useContext, useState, ReactNode } from "react";
import useNode, { CommentNode } from "../hooks/useNode";

// Utility function to ensure commentsData is a CommentNode instance
function convertToCommentNode(data: any): CommentNode {
  if (!(data instanceof CommentNode)) {
    const node = new CommentNode(data.id, data.name, []);
    node.items = (data.items || []).map(convertToCommentNode); // Convert nested comments
    return node;
  }
  return data;
}

interface CommentContextProps {
  commentsData: CommentNode;
  handleInsertNode: (folderId: number, item: string) => void;
  handleEditNode: (folderId: number, value: string) => void;
  countComments: () => number;
}

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

interface CommentProviderProps {
  children: ReactNode;
}

export const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
  const [commentsData, setCommentsData] = useState<CommentNode>(new CommentNode(1, " ")); // Initializing as CommentNode
  const { insertNode, editNode } = useNode();

  const handleInsertNode = (folderId: number, item: string) => {
    const updatedComments = insertNode(convertToCommentNode(commentsData), folderId, item);
    setCommentsData(updatedComments); // Update the comments data with new comment
  };

  const handleEditNode = (folderId: number, value: string) => {
    const updatedComments = editNode(convertToCommentNode(commentsData), folderId, value);
    setCommentsData(updatedComments); // Update the comments data with edited comment
  };

  // Function to count all comments and replies recursively
  const countComments = () => {
    const countReplies = (node: CommentNode): number => {
      return 1 + node.items.reduce((acc, child) => acc + countReplies(child), 0);
    };
    return countReplies(commentsData) - 1; // Subtract 1 to exclude root node if it’s a placeholder
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

// Hook to access the comment context
export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within a CommentProvider");
  }
  return context;
};
