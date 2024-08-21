import React, { useContext } from "react";
import { IdContext } from "../App"; // Correct import path

const OffCanvas = ({ formData, setFormData }) => {
  // Access the context
  const { globalId } = useContext(IdContext);

  console.log("canvas", globalId); // Use a comma for better logging

  console.log(formData);

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
        ></button>
      </div>
      <div className="offcanvas-body">
        <label htmlFor="editInput">Edit Label</label>
        <input
          type="text"
          id="editInput" // Add an id for better accessibility and referencing
          value={formData?.label || ""} // Example of controlled input (assuming formData has a 'label' property)
          onChange={(e) => setFormData({ ...formData, label: e.target.value })} // Example of handling changes
        />
      </div>
    </div>
  );
};

export default OffCanvas;
