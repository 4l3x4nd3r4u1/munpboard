import { useEffect, useState } from "react"
import { createElement, findElement, drawElement } from "../Helpers/drawLogic"

const Canvas = ({
  elements,
  setElements,
  tool,
  selectedElement,
  setSelectedElement
}) => {
  const [action, setAction] = useState("none");

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(element => drawElement(element, context));
  }, [elements]);

  const handleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (tool === "move" || tool === "edit element") {
      const element = findElement(offsetX, offsetY, elements);
      if (element) {
        element.mouseX = offsetX - element.x1;
        element.mouseY = offsetY - element.y1;
      }

      setSelectedElement(element ? element : null);
      setAction(tool === "move" ? "moving" : "edit");
    } else {
      const element = createElement(offsetX, offsetY, offsetX, offsetY, tool, elements.length, "white", "none");

      setElements(prevState => [...prevState, element]);
      setAction("drawing");
    }
  }

  const handleMouseMove = (event) => {
    if (action === "none") return;

    const { offsetX, offsetY } = event.nativeEvent;
    const elementsCopy = elements.slice();

    if (action === "drawing") {
      if (tool === "pencil") {
        const { points, id, type } = elements[elements.length - 1];
        const { x2, y2 } = points[points.length - 1];
        const newPoint = {
          x1: x2,
          y1: y2,
          x2: offsetX,
          y2: offsetY,
        }

        points.push(newPoint);
        elementsCopy[id] = { type: type, points: points, id: id };
      } else {
        const { x1, y1, type, id, stroke, background } = elements[elements.length - 1];

        const element = createElement(x1, y1, offsetX, offsetY, type, id, stroke, background);

        elementsCopy[id] = element;
      }

      setElements(elementsCopy);
      return;
    }

    if (action === "moving" && selectedElement) {
      const { x1, y1, x2, y2, type, id, stroke, background, mouseX, mouseY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;

      const xWithOffset = offsetX - mouseX;
      const yWithOffset = offsetY - mouseY;

      const element = createElement(xWithOffset, yWithOffset, xWithOffset + width, yWithOffset + height, type, id, stroke, background);
      elementsCopy[id] = element;
      setAction("moving");

      setElements(elementsCopy);
    }
  }

  const handleMouseUp = () => {
    if (action === "edit") return;

    setAction("none");
    setSelectedElement(null);
  }

  return (
    <div style={{ flex: 1, overflow: "hidden" }}>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}

export default Canvas;
