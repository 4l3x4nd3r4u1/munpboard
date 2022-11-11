const Tool = ({ name, setTool, checked }) => {
  return (
    <div style={{ display: "flex", gap: ".2rem", alignItems: "center" }}>
      <input
        type="radio"
        id={name}
        checked={name === checked}
        onChange={() => setTool(name)}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  )
}

export default Tool;
