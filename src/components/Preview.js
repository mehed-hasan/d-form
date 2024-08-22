import React from "react";

const Preview = () => {
  const formData = JSON.parse(localStorage.getItem("formData") || "[]");

  return (
    <form className="w-75 p-5 shadow rounded mx-auto">
      {formData.map((row, rowIndex) => (
        <div key={rowIndex} className="row mb-3">
          {row.cols.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`col-${colIndex} mb-3`}
              style={{ width: col.colWidth }}
            >
              {/* Render INPUT type */}
              {col.elementInfo.type === "INPUT" && (
                <>
                  <label className="form-label">{col.elementInfo.label}</label>
                  <input
                    type="text"
                    placeholder={col.elementInfo.label}
                    required={col.elementInfo.isRequired}
                    className="w-100 form-control"
                    defaultValue={col.elementInfo.default || ""}
                  />
                </>
              )}

              {/* Render TEXTAREA type */}
              {col.elementInfo.type === "TEXTAREA" && (
                <>
                  <label className="form-label">{col.elementInfo.label}</label>
                  <textarea
                    placeholder={col.elementInfo.label}
                    required={col.elementInfo.isRequired}
                    className="w-100 form-control"
                    defaultValue={col.elementInfo.default || ""}
                  />
                </>
              )}

              {/* Render FILE type */}
              {col.elementInfo.type === "FILE" && (
                <>
                  <label className="form-label">{col.elementInfo.label}</label>
                  <input
                    className="w-100 form-control"
                    type="file"
                    required={col.elementInfo.isRequired}
                  />
                </>
              )}

              {/* Render SELECT type */}
              {col.elementInfo.type === "SELECT" && (
                <>
                  <label className="form-label">{col.elementInfo.label}</label>
                  <select
                    required={col.elementInfo.isRequired}
                    className="w-100 form-control"
                    defaultValue={col.elementInfo.default || ""}
                  >
                    {col.elementInfo.options &&
                    Array.isArray(col.elementInfo.options) ? (
                      col.elementInfo.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.value}>
                          {option.label}
                        </option>
                      ))
                    ) : (
                      <option disabled>No options available</option>
                    )}
                  </select>
                </>
              )}

              {/* Render RADIO type */}
              {col.elementInfo.type === "RADIO" && (
                <>
                  <label className="form-label">{col.elementInfo.label}</label>
                  <div className="d-flex flex-wrap">
                    {col.elementInfo.options &&
                    Array.isArray(col.elementInfo.options) ? (
                      col.elementInfo.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="form-check d-flex gap-2 flex-wrap"
                        >
                          <input
                            type="radio"
                            id={`${col.elementInfo.id}-option-${optionIndex}`}
                            name={col.elementInfo.id} // Unique radio group name
                            value={option.value}
                            defaultChecked={
                              option.value === col.elementInfo.default
                            } // Default selected value
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`${col.elementInfo.id}-option-${optionIndex}`}
                            className="form-check-label me-2"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))
                    ) : (
                      <div>No options available</div>
                    )}
                  </div>
                </>
              )}

              {/* Render CHECKBOX type */}
              {col.elementInfo.type === "CHECK" && (
                <>
                  <label className="form-label">{col.elementInfo.label}</label>
                  <div className="d-flex flex-wrap">
                    {col.elementInfo.options &&
                    Array.isArray(col.elementInfo.options) ? (
                      col.elementInfo.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="form-check d-flex gap-2 flex-wrap"
                        >
                          <input
                            type="checkbox"
                            id={`${col.elementInfo.id}-option-${optionIndex}`}
                            name={col.elementInfo.id} // Unique checkbox group name
                            value={option.value}
                            defaultChecked={option.default === option.value} // Default checked value
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`${col.elementInfo.id}-option-${optionIndex}`}
                            className="form-check-label me-2"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))
                    ) : (
                      <div>No options available</div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        type="submit"
        className="btn btn-dark w-100 mx-auto d-flex justify-content-center"
      >
        Submit
      </button>
    </form>
  );
};

export default Preview;
