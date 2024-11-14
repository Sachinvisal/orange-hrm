export class CommentNode {
    id: number;
    name: string;
    items: CommentNode[];
  
    constructor(id: number, name: string, items: CommentNode[] = []) {
      this.id = id;
      this.name = name;
      this.items = items;
    }
  
    addComment(item: CommentNode) {
      this.items.push(item); // Add new comment to current node's items
    }
  
    editComment(value: string) {
      this.name = value; // Edit the current comment's text
    }


  
 
  }
  
// useNode.ts
const useNode = () => {
  const insertNode = (tree: CommentNode, commentId: number, item: string): CommentNode => {
      if (tree.id === commentId) {
          tree.addComment(new CommentNode(Date.now(), item));
          return tree;
      }
      tree.items = tree.items.map(child => insertNode(child, commentId, item));
      return tree;
  };

  const editNode = (tree: CommentNode, commentId: number, value: string): CommentNode => {
      if (tree.id === commentId) {
          tree.editComment(value);
          return tree;
      }
      tree.items = tree.items.map(child => editNode(child, commentId, value));
      return tree;
  };

  // New function: deletes a node by ID


  return { insertNode, editNode };
};



  
  export default useNode;
  