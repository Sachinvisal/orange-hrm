import React from "react";

interface ActionProps {
  handleClick: () => void;
  type: React.ReactNode;
  className?: string;
}

const Action: React.FC<ActionProps> = ({ handleClick, type, className }) => {
  return (
    <button className={className} onClick={handleClick} style={{ margin: "0 5px" }}>
      {type}
    </button>
  );
};

export default Action;
