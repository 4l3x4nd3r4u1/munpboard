import Tool from "./Tool"

const tools = ['line', 'rectangle', 'pencil', 'edit element', 'move'];

const Tools = ({ setTool, clearCanvas, saveCanvas, toggleListOfCanvas, checked }) => {
  return (
    <div className="tools">
      {
        tools.map((tool, index) => <Tool key={index} name={tool} setTool={setTool} checked={checked} />)
      }
      <button onClick={clearCanvas}>clear canvas</button>
      <button onClick={saveCanvas}>save canvas</button>
      <button className="edit-canvas" onClick={toggleListOfCanvas}>edit canvas</button>
    </div>
  )
}

export default Tools;
