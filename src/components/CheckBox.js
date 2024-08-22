import React, { useContext } from "react";
import useDraggable from "../hooks/useDraggable";
import { TargetedContext } from "../App"; // Correct import path

const CheckBox = ({ elementInfo }) => {
  const { targetedElement, setTargetedElement } = useContext(TargetedContext);
  const { ref, isDragging } = useDraggable("CHECK");

  // Default message if no options are provided
  const noOptionsMessage = "Please add options";

  return (
    <div
      id={elementInfo.id}
      className="w-100 element"
    //   ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        // cursor: "move",
        padding: "8px",
        backgroundColor: "lightgrey",
        borderRadius: "4px",
      }}
    >
      <label className="form-label d-flex justify-content-between">
        <span>{elementInfo.label}</span>
        <div className="d-flex gap-2">
          <button
            onClick={() =>
              setTargetedElement({ elementInfo: elementInfo, action: "edit" })
            }
            className="btn btn-secondary btn-sm"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-label="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
            </svg>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            onClick={() =>
              setTargetedElement({ elementInfo: elementInfo, action: "delete" })
            }
            aria-label="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </div>
      </label>
      <div className="d-flex  gap-2">
        {elementInfo.options && elementInfo.options.length > 0 ? (
          elementInfo.options.map((option, idx) => (
            <label key={idx} className="d-flex align-items-center">
              <input
                type="checkbox"
                id={`${elementInfo.id}-option-${idx}`}
                name={elementInfo.id}
                value={option.value}
                className="form-check-input me-2"
              />
              <span>{option.label}</span>
            </label>
          ))
        ) : (
          <p className="text-muted">{noOptionsMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CheckBox;
