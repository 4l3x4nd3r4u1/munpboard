const ListOfSavedCanvas = ({ setElements, toggleListOfCanvas }) => {
  const editCanvas = (key) => {
    setElements(JSON.parse(localStorage.getItem(key)))
    toggleListOfCanvas(false);
  }

  const handleClick = () => {
    window.localStorage.clear();
    toggleListOfCanvas(false);
  }

  return (
    <div
      style={{ borderTop: "1px solid white", height: "50%" }}
    >
      {
        window.localStorage.length > 0 ? (
          <div>
            <ul>
              {
                Object.keys(localStorage).map(key =>
                  <li
                    key={key}
                    style={{ cursor: "pointer" }}
                    onClick={() => editCanvas(key)}
                  >
                    {key}
                  </li>
                )
              }
            </ul>
            <button onClick={handleClick} style={{ marginTop: "1rem" }}>delete canvas list</button>
          </div>
        ) : <p>no canvas saved</p>
      }
    </div>
  )
}

export default ListOfSavedCanvas;
