import { createElement } from "../Helpers/drawLogic"

const Panel = ({ selectedElement, setElements, elements }) => {

  const changeBackground = (color) => {
    const { x1, y1, x2, y2, id, type, stroke } = selectedElement;
    const element = createElement(x1, y1, x2, y2, type, id, stroke, color);

    const elementsCopy = elements.slice();
    elementsCopy[id] = element;
    setElements(elementsCopy);
  }

  const changeStroke = (color) => {
    const { x1, y1, x2, y2, id, type, background } = selectedElement;
    const element = createElement(x1, y1, x2, y2, type, id, color, background);

    const elementsCopy = elements.slice();
    elementsCopy[id] = element;
    setElements(elementsCopy);
  }

  return (
    <div style={{ height: "50%" }}>
      {selectedElement ?
        (
          <div>
            <p> Element type: {selectedElement.type}</p>
            <p> Element id: {selectedElement.id}</p>
            <div>
              <p> Element stroke: </p>
              <button onClick={() => changeStroke("orange")}>orange</button>
              <button onClick={() => changeStroke("hotpink")}>pink</button>
              <button onClick={() => changeStroke("white")}>white</button>
            </div>
            {
              selectedElement.type === "rectangle" && <div>
                <p> Element background: </p>
                <button onClick={() => changeBackground("orange")}>orange</button>
                <button onClick={() => changeBackground("hotpink")}>pink</button>
                <button onClick={() => changeBackground("white")}>white</button>
                <button onClick={() => changeBackground("none")}>none</button>
              </div>
            }
          </div>
        ) :
        <p>no item selected</p>
      }
    </div>
  )
}

export default Panel;
