import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [listColor, setListColor] = useState([1, 2, 3, 4, 5]);
  const ref = useRef(null);

  const handleToggleClasslistRef = (ref) => {
    if (!ref.current) {
      return;
    }
    if (!ref.current.classList.contains("big-border")) {
      ref.current.classList.add("big-border");
    } else {
      ref.current.classList.remove("big-border");
      ref.current = null;
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      handleToggleClasslistRef(ref);
    };
    const element = document.getElementById("wrapper");
    element.addEventListener("click", handleOutsideClick);
    return () => {
      element.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div id="wrapper">
        {listColor.map((item) => {
          return (
            <div className="item-color-wrapper">
              <div
                className="item-color"
                onClick={(event) => {
                  handleToggleClasslistRef(ref);
                  event.stopPropagation();
                  ref.current = event.target;
                  handleToggleClasslistRef(ref);
                }}
              ></div>
            </div>
          );
        })}
        <div className="item-color-wrapper">
          <div
            className="item-color"
            onClick={() => {
              setListColor((oldValue) => [...oldValue, oldValue.length]);
            }}
          >
            +
          </div>
        </div>
      </div>
      <div className="color-picker-wrapper">
        <input
          type="color"
          id="head"
          name="head"
          onChange={(event) => {
            event.stopPropagation();
            if (ref.current) {
              ref.current.style.backgroundColor = event.target.value;
            }
          }}
        />
      </div>
    </>
  );
}
