import React from "react";
import { useDrop } from "react-dnd";
import Input from "./Input";
import TextArea from "./TextArea";
import FileInput from "./FileInput";
import SelectBox from "./SelectBox";
import RadioButton from "./RadioButton";
import CheckBox from "./CheckBox"; // Import CheckBox

const Column = ({ index, elementInfo, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ["INPUT", "TEXTAREA", "FILE", "SELECT", "RADIO", "CHECK"],
    drop: (item) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const renderDroppedItem = () => {
    switch (elementInfo.type) {
      case "INPUT":
        return <Input elementInfo={elementInfo} />;
      case "TEXTAREA":
        return <TextArea elementInfo={elementInfo} />;
      case "FILE":
        return <FileInput elementInfo={elementInfo} />;
      case "SELECT":
        return <SelectBox elementInfo={elementInfo} />;
      case "RADIO":
        return <RadioButton elementInfo={elementInfo} />;
      case "CHECK":
        return <CheckBox elementInfo={elementInfo} />; // Render CheckBox
      default:
        return <div className="text-center text-muted">Drop here</div>;
    }
  };

  return (
    <div
      ref={drop}
      className="border d-flex flex-column justify-content-center p-2"
      style={{
        minHeight: "110px",
        backgroundColor: isOver ? "lightgreen" : "white",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {renderDroppedItem()}
    </div>
  );
};

export default Column;
