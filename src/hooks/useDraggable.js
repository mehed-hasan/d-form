import { useDrag } from "react-dnd";

const useDraggable = (type) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return {
    ref: drag,
    isDragging,
  };
};

export default useDraggable;
