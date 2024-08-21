import React from "react";

const Preview = () => {
  const formData = JSON.parse(localStorage.getItem("formData") || "[]");

  return (
    <form className="w-100 p-5 shadow rounded">
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
