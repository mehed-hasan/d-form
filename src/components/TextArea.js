import React from "react";
import useDraggable from "../hooks/useDraggable";

const TextArea = ({ id, label }) => {
  const { ref, isDragging } = useDraggable("TEXTAREA");

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
      <textarea
        className="form-control"
        rows="1"
        placeholder="Type here..."
      ></textarea>
    </div>
  );
};

export default TextArea;
