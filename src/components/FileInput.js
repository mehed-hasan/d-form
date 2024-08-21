import React from "react";
import useDraggable from "../hooks/useDraggable";

const FileInput = ({ id, label }) => {
  const { ref, isDragging } = useDraggable("FILE");

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
      <input type="file" className="form-control" />
    </div>
  );
};

export default FileInput;
