// src/components/FormBuilder.js

import React, { useState, useEffect } from "react";
import Row from "./Row";
import DraggableButton from "./DraggableButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import Bootstrap's JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min';
import OffCanvas from "./OffCanvas";

const FormBuilder = () => {
  // Initialize toast notifications


  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : [
          {
            rowName: 0,
            cols: [
              {
                colName: 0,
                elementInfo: { type: "Empty", label: "", isRequired: false },
                colWidth: "100%",
              },
            ],
          },
        ];
  });

  const addRow = () => {
    const newIndex = formData.length;
    setFormData([
      ...formData,
      {
        rowName: newIndex,
        cols: [
          {
            colName: 0,
            elementInfo: { type: "Empty", label: "", isRequired: false },
            colWidth: "100%",
          },
        ],
      },
    ]);
  };

  const updateColumns = (rowIndex, newColumns) => {
    if (!Array.isArray(newColumns)) {
      console.error("newColumns is not an array", newColumns);
      return;
    }

    const updatedFormData = formData.map((row) =>
      row.rowName === rowIndex
        ? {
            ...row,
            cols: newColumns.map((col, index) => ({
              ...col,
              elementInfo: {
                type: col.elementInfo?.type || "Empty",
                label: col.elementInfo?.label || "",
                isRequired: col.elementInfo?.isRequired || false,
                id: `r${rowIndex}c${index}`, // Set id dynamically based on column index
              },
              colWidth: col.colWidth || `${100 / newColumns.length}%`,
            })),
          }
        : row
    );
    setFormData(updatedFormData);
    console.log("Updated formData in FormBuilder:", updatedFormData);
  };

  const updateFormData = (newFormData) => {
    setFormData(newFormData);
    console.log("Updated formData via updateFormData:", newFormData);
  };

  const removeRow = (rowIndex) => {
    setFormData((prevFormData) =>
      prevFormData.filter((row) => row.rowName !== rowIndex)
    );
  };

  const saveData = () => {
    try {
      localStorage.setItem("formData", JSON.stringify(formData));
      toast.success("Data saved successfully!");
      console.log("Data saved to localStorage:", formData);
    } catch (error) {
      toast.error("Error saving data!");
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className=" mt-3 shadow p-3">
      <OffCanvas setFormData={setFormData} formData={formData} />
      <div className="row">
        <div className="col-md-2 ">
          <div className="d-flex flex-column align-items-start">
            <button
              className="btn btn-outline-secondary mb-3 d-flex gap-2 align-items-center w-100 justify-content-center"
              onClick={addRow}
            >
              <svg
                className=""
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle-fill "
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
              <span>Add Row</span>
            </button>
            <div className="draggable-wrapper d-flex flex-wrap gap-2 ">
              <DraggableButton
                svg={`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-input-cursor-text" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.17 4.17 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.17 4.17 0 0 1-2.06-.566A5 5 0 0 1 8 13.65a5 5 0 0 1-.44.285 4.17 4.17 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.5 3.5 0 0 0-.436-.294A3.17 3.17 0 0 0 5.5 2.5.5.5 0 0 1 5 2"/>
                <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>
                </svg>`}
                type="INPUT"
                label="Input"
              />
              <DraggableButton
                svg={`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-textarea-resize" viewBox="0 0 16 16">
                  <path d="M0 4.5A2.5 2.5 0 0 1 2.5 2h11A2.5 2.5 0 0 1 16 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 11.5zM2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3zm10.854 4.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0m0 2.5a.5.5 0 0 1 0 .708l-.5.5a.5.5 0 0 1-.708-.708l.5-.5a.5.5 0 0 1 .708 0"/>
                  </svg>`}
                type="TEXTAREA"
                label="TextArea"
              />
              <DraggableButton
                svg={`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-richtext-fill" viewBox="0 0 16 16">
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M7 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V9.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V9s1.54-1.274 1.639-1.208M5 11h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1"/>
                </svg>`}
                type="FILE"
                label="File"
              />
              <DraggableButton
                svg={`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-menu-button-wide" viewBox="0 0 16 16">
                  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"/>
                  <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
                </svg>`}
                type="SELECT"
                label="Select Box"
              />
              <DraggableButton
                svg={`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-menu-button-wide" viewBox="0 0 16 16">
                  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"/>
                  <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
                </svg>`}
                type="RADIO"
                label="Radio Button"
              />
            </div>
          </div>
        </div>
        <div className="col-md-8 ">
          {formData.map((row) => (
            <Row
              key={row.rowName}
              rowIndex={row.rowName}
              columns={row.cols}
              onUpdateColumns={updateColumns}
              formData={formData}
              onUpdateFormData={updateFormData}
              onRemoveRow={removeRow}
            />
          ))}

          <button
            className="rounded-0 mt-4 btn btn-secondary w-100 mb-3"
            onClick={saveData}
          >
            Save Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
