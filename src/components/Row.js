import React, { useState, useRef, useEffect, useCallback } from "react";
import Column from "./Column";
import { useDrop } from "react-dnd";

const Row = ({
  rowIndex,
  columns,
  onUpdateColumns,
  formData,
  onUpdateFormData,
  onRemoveRow,
}) => {
  const [columnWidths, setColumnWidths] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    const numColumns = columns.length;
    const initialWidth = numColumns > 0 ? 100 / numColumns : 100;
    setColumnWidths(
      columns.map(
        (col) => parseFloat(col.colWidth.replace("%", "")) || initialWidth
      )
    );
  }, [columns]);

  const [{ isOver }, drop] = useDrop({
    accept: ["INPUT", "TEXTAREA", "FILE", "SELECT"],
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset && rowRef.current) {
        const rect = rowRef.current.getBoundingClientRect();
        const columnWidth = rect.width / columns.length;
        const columnIndex = Math.floor(
          (clientOffset.x - rect.left) / columnWidth
        );

        handleDrop(item, columnIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleDrop = (item, index) => {
    const newColumns = [...columns];
    newColumns[index] = {
      ...newColumns[index],
      elementInfo: {
        id: `r${rowIndex}c${index}`,
        type: item.type,
        label: item.label || "My Label",
        isRequired: item.isRequired || false,
      },
    };

    onUpdateColumns(rowIndex, newColumns);

    const updatedFormData = formData.map((data) =>
      data.rowName === rowIndex
        ? {
            ...data,
            cols: newColumns,
          }
        : data
    );

    onUpdateFormData(updatedFormData);
    console.log("Updated formData in Row:", updatedFormData);
  };

  const updateColumnWidths = (newColumns) => {
    const numColumns = newColumns.length;
    const width = numColumns > 0 ? 100 / numColumns : 100;
    const updatedWidths = Array(numColumns).fill(width);

    setColumnWidths(updatedWidths);

    const updatedColumns = newColumns.map((col, i) => ({
      ...col,
      colWidth: `${updatedWidths[i]}%`,
    }));

    return updatedColumns;
  };

  const handleResize = (index, newWidth) => {
    const updatedWidths = [...columnWidths];
    updatedWidths[index] = newWidth;

    const totalWidth = updatedWidths.reduce((sum, width) => sum + width, 0);
    const widthChange = newWidth - columnWidths[index];
    for (let i = index + 1; i < updatedWidths.length; i++) {
      updatedWidths[i] = Math.max(0, updatedWidths[i] - widthChange);
    }

    const newTotalWidth = updatedWidths.reduce((sum, width) => sum + width, 0);
    if (newTotalWidth !== 100) {
      const adjustmentFactor = 100 / newTotalWidth;
      for (let i = 0; i < updatedWidths.length; i++) {
        updatedWidths[i] = Math.max(0, updatedWidths[i] * adjustmentFactor);
      }
    }

    setColumnWidths(updatedWidths);

    const newColumns = columns.map((col, i) => ({
      ...col,
      colWidth: `${updatedWidths[i]}%`,
    }));
    onUpdateColumns(rowIndex, newColumns);

    const updatedFormData = formData.map((data) =>
      data.rowName === rowIndex
        ? {
            ...data,
            cols: newColumns,
          }
        : data
    );

    onUpdateFormData(updatedFormData);
  };

  const handleMouseDown = (index, e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[index];

    const handleMouseMove = (e) => {
      const newWidth = Math.max(
        0,
        Math.min(
          100,
          startWidth + ((e.clientX - startX) / rowRef.current.clientWidth) * 100
        )
      );
      handleResize(index, newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleAddColumn = () => {
    const newColumns = [
      ...columns,
      {
        colName: columns.length,
        elementInfo: { type: "Empty", label: "", isRequired: false },
        colWidth: "0%",
      },
    ];
    const updatedColumns = updateColumnWidths(newColumns);
    onUpdateColumns(rowIndex, updatedColumns);
  };

  const handleRemoveColumn = () => {
    if (columns.length <= 1) return;

    const newColumns = columns.slice(0, -1);
    const updatedColumns = updateColumnWidths(newColumns);
    onUpdateColumns(rowIndex, updatedColumns);
  };

  const handleRemoveRow = () => {
    onRemoveRow(rowIndex);
  };

  return (
    <div
      className={`row mb-3 position-relative`}
      ref={(node) => {
        rowRef.current = node;
        drop(node);
      }}
      style={{
        // border: isOver ? "1px solid green" : "none",
        position: "relative",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {columns.map((col, index) => (
        <div
          key={index}
          className={`position-relative col-${index}`}
          style={{
            width: col.colWidth || `${columnWidths[index]}%`,
            position: "relative",
          }}
        >
          <Column
            index={index}
            elementInfo={col.elementInfo}
            onDrop={(item) => handleDrop(item, index)}
          />
          {index < columns.length - 1 && (
            <div
              className="resize-handle"
              onMouseDown={(e) => handleMouseDown(index, e)}
            />
          )}
        </div>
      ))}
      <div className="add-column-button border p-2">
        <div className="d-flex justify-content-center align-items-center mb-2">
          <button
            className="btn btn-secondary mx-2"
            onClick={handleAddColumn}
            disabled={columns.length >= 12}
          >
            +
          </button>
          <span className="mx-2">Col - {columns.length}</span>
          <button
            className="btn btn-secondary mx-2"
            onClick={handleRemoveColumn}
            disabled={columns.length <= 1}
          >
            -
          </button>
        </div>
        <button className="btn btn-secondary w-100" onClick={handleRemoveRow}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Row;
