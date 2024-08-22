import React, { useContext } from "react";
import { TargetedContext } from "../App"; // Correct import path

const OffCanvas = ({ formData, setFormData }) => {
  const { targetedElement, setTargetedElement } = useContext(TargetedContext);

  const actionType = targetedElement?.action;
  const targetedElementInfo = targetedElement?.elementInfo;

  const handleLabelChange = (event) => {
    const newLabel = event.target.value;

    if (actionType === "edit" && targetedElementInfo) {
      const updatedElement = { ...targetedElementInfo, label: newLabel };
      const updatedFormData = formData.map((row) => ({
        ...row,
        cols: row.cols.map((col) =>
          col.elementInfo?.id === targetedElementInfo.id
            ? { ...col, elementInfo: updatedElement }
            : col
        ),
      }));
      setFormData(updatedFormData);
      setTargetedElement({ elementInfo: updatedElement, action: "edit" });
    }
  };

  const handleIsRequiredChange = (event) => {
    const isRequired = event.target.value === "yes";

    if (actionType === "edit" && targetedElementInfo) {
      const updatedElement = { ...targetedElementInfo, isRequired };
      const updatedFormData = formData.map((row) => ({
        ...row,
        cols: row.cols.map((col) =>
          col.elementInfo?.id === targetedElementInfo.id
            ? { ...col, elementInfo: updatedElement }
            : col
        ),
      }));
      setFormData(updatedFormData);
      setTargetedElement({ elementInfo: updatedElement, action: "edit" });
    }
  };

  const handleOptionsChange = (index, event) => {
    const { name, value, type, checked } = event.target;

    if (actionType === "edit" && targetedElementInfo) {
      let updatedElement;

      if (
        targetedElementInfo.type === "SELECT" ||
        targetedElementInfo.type === "RADIO"  ||
        targetedElementInfo.type === "CHECK"
      ) {
        const newOptions = targetedElementInfo.options.map((opt, i) =>
          i === index ? { ...opt, label: value } : opt
        );
        updatedElement = { ...targetedElementInfo, options: newOptions };
      } 

      const updatedFormData = formData.map((row) => ({
        ...row,
        cols: row.cols.map((col) =>
          col.elementInfo?.id === targetedElementInfo.id
            ? { ...col, elementInfo: updatedElement }
            : col
        ),
      }));

      setFormData(updatedFormData);
      setTargetedElement({ elementInfo: updatedElement, action: "edit" });
    }
  };

  const handleDelete = () => {
    if (actionType === "delete" && targetedElementInfo) {
      const updatedFormData = formData.map((row) => ({
        ...row,
        cols: row.cols.map((col) =>
          col.elementInfo?.id === targetedElementInfo.id
            ? {
                ...col,
                elementInfo: {
                  type: "EMPTY",
                  label: "",
                  isRequired: false,
                  id: col.elementInfo.id,
                  options: [],
                  default: [],
                },
              }
            : col
        ),
      }));
      setFormData(updatedFormData);
      setTargetedElement(null); // Clear the targeted element
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      data-bs-backdrop="false"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Edit Form Elements</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={() => setTargetedElement(null)}
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
            {(targetedElementInfo.type === "SELECT" ||
              targetedElementInfo.type === "RADIO" ||
              targetedElementInfo.type === "CHECK"
            ) && (
              <div className="mb-3">
                <label className="mb-2">Options</label>
                {targetedElementInfo.options.map((option, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      name={option.value}
                      value={option.label}
                      onChange={(e) => handleOptionsChange(index, e)}
                      className="form-control"
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() =>
                    setTargetedElement({
                      ...targetedElement,
                      elementInfo: {
                        ...targetedElementInfo,
                        options: [
                          ...targetedElementInfo.options,
                          {
                            value: `${targetedElementInfo.type.toLowerCase()}${
                              targetedElementInfo.options.length + 1
                            }`,
                            label: "",
                          },
                        ],
                      },
                    })
                  }
                >
                  Add Option
                </button>
              </div>
            )}
     
          </>
        )}
        {actionType === "delete" && (
          <div className="alert alert-danger" role="alert">
            Are you sure you want to delete this element?
            <button
              className="btn btn-danger mt-4 form-control"
              onClick={handleDelete}
            >
              Yes, Delete It
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffCanvas;
