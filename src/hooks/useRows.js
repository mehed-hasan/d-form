import { useState } from "react";

const useRows = () => {
  const [rows, setRows] = useState([{ columns: [null] }]);

  const addRow = () => {
    setRows([...rows, { columns: [null] }]);
  };

  const updateColumns = (index, newColumns) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { columns: newColumns } : row
    );
    setRows(updatedRows);
  };

  return {
    rows,
    addRow,
    updateColumns,
  };
};

export default useRows;
