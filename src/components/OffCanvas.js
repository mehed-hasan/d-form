import React, { useContext } from "react";
import { TargetedContext } from "../App"; // Correct import path
import { Offcanvas } from "bootstrap"; // Import Offcanvas from Bootstrap

const OffCanvas = ({ formData, setFormData }) => {
  const { targetedElement, setTargetedElement } = useContext(TargetedContext);

  const actionType = targetedElement?.action;
  const targetedElementInfo = targetedElement?.elementInfo;

  // Handle label change
  const handleLabelChange = (event) => {
    const newLabel = event.target.value;

    if (actionType === "edit" && targetedElementInfo) {
      const updatedElement = { ...targetedElementInfo, label: newLabel };

      const updatedFormData = formData.map((row) => {
        return {
          ...row,
          cols: row.cols.map((col) =>
            col.elementInfo?.id === targetedElementInfo.id
              ? { ...col, elementInfo: updatedElement }
              : col
          ),
        };
      });

      setFormData(updatedFormData);
      setTargetedElement({ elementInfo: updatedElement, action: "edit" });
    }
  };

  // Handle "isRequired" radio button change
  const handleIsRequiredChange = (event) => {
    const isRequired = event.target.value === "yes";

    if (actionType === "edit" && targetedElementInfo) {
      const updatedElement = { ...targetedElementInfo, isRequired };

      const updatedFormData = formData.map((row) => {
        return {
          ...row,
          cols: row.cols.map((col) =>
            col.elementInfo?.id === targetedElementInfo.id
              ? { ...col, elementInfo: updatedElement }
              : col
          ),
        };
      });

      setFormData(updatedFormData);
      setTargetedElement({ elementInfo: updatedElement, action: "edit" });
    }
  };

  // Handle deletion of a single element
  const handleDelete = () => {
    if (actionType === "delete" && targetedElementInfo) {
      const updatedFormData = formData.map((row) => {
        return {
          ...row,
          cols: row.cols.map((col) =>
            col.elementInfo?.id === targetedElementInfo.id
              ? {
                  ...col,
                  elementInfo: {
                    type: "EMPTY",
                    label: "",
                    isRequired: false,
                    id: col.elementInfo.id, // Preserve the ID
                  },
                }
              : col
          ),
        };
      });

      setFormData(updatedFormData);
      setTargetedElement(null); // Clear the targeted element

      // Close the offcanvas
      const btnClose = document.querySelector(".btn-close");
      btnClose.click();
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Edit Form Elements</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={() => setTargetedElement(null)} // Clear targeted element on close
        ></button>
      </div>
      <div className="offcanvas-body">
        {actionType === "edit" && targetedElementInfo && (
          <>
            <div className="mb-3">
              <label className="mb-2">Edit Label</label>
              <input
                value={targetedElementInfo.label || ""}
                onChange={handleLabelChange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label>Is required</label>
              <br />
              <input
                type="radio"
                name="isRequired"
                value="yes"
                checked={targetedElementInfo.isRequired === true}
                onChange={handleIsRequiredChange}
              />{" "}
              Yes
              <input
                type="radio"
                name="isRequired"
                value="no"
                className="ms-2"
                checked={targetedElementInfo.isRequired === false}
                onChange={handleIsRequiredChange}
              />{" "}
              No
            </div>
          </>
        )}
        {actionType === "delete" && (
          <div className="alert alert-danger" role="alert">
            Are you sure you want to delete this element?
            <button className="btn btn-danger mt-4 form-control" onClick={handleDelete}>
              Yes, Delete It
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffCanvas;
