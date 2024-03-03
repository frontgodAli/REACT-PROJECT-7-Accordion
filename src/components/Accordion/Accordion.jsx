import { useState } from "react";
import { TbCaretUpDownFilled } from "react-icons/tb";
import data from "./dummyData";
import "./styles.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multiSelection, setMultiSelection] = useState(false);
  const [multipleArray, setMultipleArray] = useState([]);

  function handleSelection(currentId) {
    multiSelection
      ? setMultipleArray((prev) => {
          const copy = [...prev];
          const indexOfCurrentId = copy.indexOf(currentId);
          if (indexOfCurrentId === -1) {
            copy.push(currentId);
          } else {
            copy.splice(indexOfCurrentId, 1);
          }
          return copy;
        })
      : setSelected(selected === currentId ? null : currentId);
  }

  function handleClick() {
    setMultiSelection(!multiSelection);
  }

  return (
    <div className="container">
      <button onClick={handleClick}>
        {multiSelection ? "Disable multi selection" : "Enable multi selection"}
      </button>
      <div className="accordion">
        {data.map((dataItem) => (
          <div onClick={() => handleSelection(dataItem.id)} className="accordion-item">
            <div className="title">
              <h3>{dataItem.question}</h3>
              <TbCaretUpDownFilled />
            </div>
            <div className="response">
            {multiSelection ? (
              multipleArray.indexOf(dataItem.id) !== -1 && (
                <p>{dataItem.response}</p>
              )
            ) : selected === dataItem.id ? (
              <p>{dataItem.response}</p>
            ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
