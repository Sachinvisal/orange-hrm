import './App.css';
import React, { useState } from "react";
import Comment from "./component/Comment";
import { useCommentContext } from "./stateManagement/commentContext";

const App: React.FC = () => {


  return (
    <div className="App">
     { /* Comment input for adding new top-level comments */ }
      <CommentInput />
      {/* Root comment component to display the main comment thread */}
      <RootComment />
    </div>
  );
};

const CommentInput: React.FC = () => {
  const [newComment, setNewComment] = useState<string>("");
  const { handleInsertNode } = useCommentContext(); // Access insert new comments

  const addComment = () => {
    if (newComment.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }
    handleInsertNode(1, newComment); //Adds new comment to the root
    setNewComment("");
  };

  return (
    <div className="textareaContainer">
      <textarea
        placeholder="What's your hot take?"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button className="commentButton" onClick={addComment}>
        Add Comment
      </button>
    </div>
  );
};
// Root component for rendering the entire comment thread
const RootComment: React.FC = () => {
  const { commentsData } = useCommentContext();

  return <Comment comment={commentsData} />;
};

export default App;
