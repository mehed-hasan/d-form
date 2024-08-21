import React from "react";
import useDraggable from "../hooks/useDraggable";

const SelectBox = ({ elementInfo }) => {
  const { ref, isDragging } = useDraggable("SELECT");

  return (
    <div
      id={elementInfo.id}
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
      <label className="form-label">{elementInfo.label}</label>
      <select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  );
};

export default SelectBox;
