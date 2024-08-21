import React, { useContext } from "react";
import { TargetedContext } from "../App"; // Correct import path

const OffCanvas = ({ formData, setFormData }) => {
  // Access the context
  const { targetedElement } = useContext(TargetedContext);

  console.log("canvas", targetedElement); // Use a comma for better logging
  console.log(formData);
  const updateLabel = () =>{
    console.log("Sdsd");
    
  }


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
        <label>Edit Label</label>
        {/* <input
          type="text"
          value={`${targetedElement?.label}`} // Example of controlled input (assuming formData has a 'label' property)
          onChange={(e) => updateLabel()} // Example of handling changes
        /> */}
      </div>
    </div>
  );

  
};

export default OffCanvas;
