import { useState } from "react";
import Canvas from "./Canvas";
import Panel from "./Panel";
import Tools from "./Tools";
import ListOfSavedCanvas from "./ListOfSavedCanvas"

import "../App.css";

const Whiteboard = () => {
  const [elements, setElements] = useState([]);
  const [tool, setTool] = useState("line");
  const [selectedElement, setSelectedElement] = useState(null);
  const [toggleListOfSavedCanvas, setToggleListOfSavedCanvas] = useState(false);

  const handleChangeTool = (newTool) => {
    setTool(newTool);
    setSelectedElement(null);
  }

  const saveCanvas = () => {
    window.localStorage.setItem(`elements ${window.localStorage.length}`, JSON.stringify(elements));
  }

  const handleToggleListOfCanvas = () => {
    setToggleListOfSavedCanvas(!toggleListOfSavedCanvas);
  }

  const clearCanvas = () => {
    setElements([]);
    setSelectedElement(null);
  }

  return (
    <div className="container">
      <div className="panel-menu-wrapper">
        <Panel
          selectedElement={selectedElement}
          setElements={setElements}
          elements={elements}
        />
        {
          toggleListOfSavedCanvas &&
          <ListOfSavedCanvas
            setElements={setElements}
            toggleListOfCanvas={setToggleListOfSavedCanvas}
          />
        }
      </div>
      <div className="canvas-wrapper">
        <Canvas
          elements={elements}
          setElements={setElements}
          tool={tool}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
        <Tools
          setTool={handleChangeTool}
          clearCanvas={clearCanvas}
          saveCanvas={saveCanvas}
          toggleListOfCanvas={handleToggleListOfCanvas}
          checked={tool}
        />
      </div>
    </div>
  );
}

export default Whiteboard;
