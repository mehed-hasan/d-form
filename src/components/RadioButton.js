import React from 'react';
import useDraggable from '../hooks/useDraggable';

const RadioButton = ({ id, label }) => {
  const { ref, isDragging } = useDraggable("RADIO");

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
      <div className="d-flex gap-3">
        <span>
          <input type="radio" id="javascript" name="fav_language" value="Eng" />
          <span className="ms-2">Ban</span>
        </span>
        <span>
          <input type="radio" id="javascript" name="fav_language" value="Eng" />
          <span className="ms-2">Ban</span>
        </span>
        <span>
          <input type="radio" id="javascript" name="fav_language" value="Eng" />
          <span className="ms-2">Ban</span>
        </span>
      </div>
    </div>
  );
};

export default RadioButton;