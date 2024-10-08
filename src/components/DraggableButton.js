import React from "react";
import useDraggable from "../hooks/useDraggable";

const DraggableButton = ({ svg, type, label }) => {
  const { ref, isDragging } = useDraggable(type);

  return (
    <button
      ref={ref}
      className="btn btn-outline-secondary mb-2 w-100 justify-content-center  d-flex draggable-button"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <div className="d-flex gap-2 w-100 justify-content-center">
        <div dangerouslySetInnerHTML={{ __html: svg }} />
        <span>{label}</span>
      </div>
    </button>
  );
};

export default DraggableButton;
