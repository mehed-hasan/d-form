import React from "react";
import useDraggable from "../hooks/useDraggable";

const Input = ({id,label}) => {
  const { ref, isDragging } = useDraggable("INPUT");

  return (
    <div
      id={id}
      className="w-100 element"
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "8px",
        backgroundColor: "lightgrey",
        borderRadius: "4px",
      }}
    >
        <label className="form-label">{label}</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type here..."
        />
    </div>
  );
};

export default Input;
