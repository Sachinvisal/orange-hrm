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
  
    deleteComment(id: number) {
      this.items = this.items.filter((item) => item.id !== id); // Delete a comment by ID
    }
  }
  
  const useNode = () => {
    const insertNode = (tree: CommentNode, commentId: number, item: string): CommentNode => {
      if (!(tree instanceof CommentNode)) {
        throw new Error("Tree root must be an instance of CommentNode");  // Add new comment node
      }
  
      if (tree.id === commentId) {
        tree.addComment(new CommentNode(Date.now(), item));
        console.log("Comment added:", tree);
        return tree;
      }
  
      tree.items = tree.items.map((child) => {
        if (!(child instanceof CommentNode)) {
          throw new Error("All child nodes must be instances of CommentNode");
        }
        return insertNode(child, commentId, item);
      });
      return tree;
    };
  
    const editNode = (tree: CommentNode, commentId: number, value: string): CommentNode => {
      if (!(tree instanceof CommentNode)) {
        throw new Error("Tree root must be an instance of CommentNode");
      }
  
      if (tree.id === commentId) {
        tree.editComment(value);
        return tree;
      }
  
      tree.items = tree.items.map((child) => editNode(child, commentId, value));
      return tree;
    };
  
    

  
    return { insertNode, editNode };
  };
  
  export default useNode;
  