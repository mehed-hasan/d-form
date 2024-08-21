import React from "react";
import { useDrop } from "react-dnd";
import Input from "./Input";
import TextArea from "./TextArea";
import FileInput from "./FileInput";
import SelectBox from "./SelectBox";
import RadioButton from "./RadioButton";

const Column = ({index, elementInfo, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ["INPUT", "TEXTAREA", "FILE","SELECT","RADIO","CHECK"],
    drop: (item) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const renderDroppedItem = () => {
    switch (elementInfo.type) {
      case "INPUT":
        return (
          <Input
            label={elementInfo.label}
            type={elementInfo.type}
            isRequired={elementInfo.isRequired}
            id={elementInfo.id}
          />
        );
      case "TEXTAREA":
        return (
          <TextArea
            label={elementInfo.label}
            type={elementInfo.type}
            isRequired={elementInfo.isRequired}
            id={elementInfo.id}
          />
        );
      case "FILE":
        return (
          <FileInput
            label={elementInfo.label}
            type={elementInfo.type}
            isRequired={elementInfo.isRequired}
            id={elementInfo.id}
          />
        );
      case "SELECT":
        return (
          <SelectBox
            label={elementInfo.label}
            type={elementInfo.type}
            isRequired={elementInfo.isRequired}
            id={elementInfo.id}
          />
        );
      case "RADIO":
        return (
          <RadioButton
            label={elementInfo.label}
            type={elementInfo.type}
            isRequired={elementInfo.isRequired}
            id={elementInfo.id}
          />
        );
      default:
        return <div className="text-center text-muted">Drop here</div>;
    }
  };

  return (
    <div
      ref={drop}
      className="border  d-flex flex-column justify-content-center p-2"
      style={{
        minHeight: "100px",
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
