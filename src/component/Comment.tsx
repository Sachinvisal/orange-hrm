// Comment.tsx

import React, { useState, useRef, useEffect } from "react";
import { useCommentContext } from "../stateManagement/commentContext";
import Action from "./Action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface CommentProps {
  comment: CommentType;
  depth?: number;
}

interface CommentType {
  id: number;
  name?: string;
  timestamp?: string;
  items?: CommentType[];
}

const Comment: React.FC<CommentProps> = ({ comment, depth = 0 }) => { 
  const [input, setInput] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(true);
  const [votes, setVotes] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>(comment.timestamp || new Date().toLocaleString());

  const inputRef = useRef<HTMLSpanElement>(null);
  const { handleInsertNode, handleEditNode } = useCommentContext(); // Access insert and edit functions

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode]);

  if (!comment) return null;

  const getReplyCount = (comment: CommentType): number => {
    if (!comment.items || comment.items.length === 0) return 0;
    return comment.items.length + comment.items.reduce((count, child) => count + getReplyCount(child), 0);
  };

  const handleVote = (delta: number) => {  
    setVotes((prev) => delta);
  };

  const onAddComment = () => {
    // Validation: Check if input is fewer than 10 characters
    if (input.trim().length > 9) {
      alert("Comment cannot exceed 9 characters!");
      return;
    }

    const currentTimestamp = new Date().toLocaleString();

    if (editMode && inputRef.current) {
      handleEditNode(comment.id, inputRef.current.innerText);
      setTimestamp(currentTimestamp);
    } else {
      handleInsertNode(comment.id, input);
      setShowReplyInput(false);
      setInput("");
      setTimestamp(currentTimestamp);
    }
    setEditMode(false);
  };

  const toggleReplyInput = () => {
    setShowReplyInput((prev) => !prev);
  };

  return (
    <div className={depth > 0 ? "nestedComment" : "commentContainer"}>
      <div className="commentRow">
        <img src="https://i.pravatar.cc/30" alt="User avatar" className="avatar" />
        <span style={{ fontWeight: "bold", marginLeft: "10px" }}>user 001</span>

        <div className="commentActions" style={{ display: "flex", alignItems: "center", marginLeft: "auto", marginBottom: "5px" }}>
          <Action className="vote" type="Upvote" handleClick={() => handleVote(1)} />
          <span className="votePoints">{votes} points</span>
          <Action className="vote" type="Downvote" handleClick={() => handleVote(0)} />
          <span className="timestamp">{timestamp}</span>
        </div>
      </div>

      <span
        contentEditable={editMode}
        suppressContentEditableWarning={editMode}
        ref={inputRef}
        className="commentText"
      >
        {comment.name || "Unnamed Comment"}
      </span>

      <div style={{ marginTop: "5px", color: "#555" }}>
        {getReplyCount(comment)} replies
      </div>

      <div className="inlineActions" style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "5px" }}>
        <Action className="replyButton" type={<FontAwesomeIcon icon={faEnvelope} className="icon" />} handleClick={toggleReplyInput} />
        <Action className="editButton" type={<FontAwesomeIcon icon={faPenToSquare} className="icon" />} handleClick={() => setEditMode(true)} />
      </div>

      {showReplyInput && (
        <div className="inputContainer">
          <input
            type="text"
            className="inputContainer__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a reply..."
          />
          <Action className="commentButton" type="COMMENT" handleClick={onAddComment} />
          <Action className="commentButton" type="CANCEL" handleClick={() => setShowReplyInput(false)} />
        </div>
      )}

      <div>
        {expand && comment.items?.map((child) => (
          <Comment key={child.id} comment={child} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
