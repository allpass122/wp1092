import React, { useState, useEffect, useRef } from "react";

function GridC(props) {
  const [localCount, setLocalCount] = useState(props.count);
  const Ref = useRef(null);
  const [content, setContent] = useState(props.content.val);
  const [inputStatus, setInputStatus] = useState("hidden");

  const keyDown = (e) => {
    if (e.key === "Enter" && props.content.r + 1 < props.rowNumber) {
      console.log("get enter");
      let id = props.colNumber * (props.content.r + 1) + props.content.c;
      var dom = document.getElementById(-id);
      Ref.current.blur();
      //dom.style.backgroundColor = "yellow";
      dom.focus();
      return;
    }
    if (e.key === "Delet" || e.key === "Backspace") {
      setFirstIn(2);
    }
    Ref.current.focus();
    console.log("key", e.key);
  };
  const [content1, setContent1] = useState(props.content.val);
  const handlerOnBlur = () => {
    props.handlerOnBlur(props.content.c, props.content.r, content);
    setContent1(content);
    setInputStatus("hidden");
    console.log("handlerOnBlurs", content, "1", content1);
  };

  const hOnFocus = () => {
    console.log(`${content},${content1}`);
    props.handlerOnClick(props.content.c, props.content.r);
    setInputStatus("");
    if (content1 != "") setContent(content1);
    setContent1("");
    console.log("hOnFocus", content, "1", content1);
  };
  const tdDouble = () => {
    console.log("tdDOUBLE");
    Ref.current.focus();
  };

  const [firstIn, setFirstIn] = useState(0);
  const update = (e) => {
    console.log("hi", e.target.value, e.key);
    console.log("update", content, ",", content1);
    //console.log(typeof e.target.value);

    if (firstIn == 0) {
      setContent(e.target.value.slice(-1));
      setFirstIn(1);
    } else if (firstIn == 2) {
      setContent("");
      setFirstIn(1);
    } else {
      setContent((value) => e.target.value);
    }
  };
  const inputKeyDown = (e) => {};
  const oB = () => {
    props.handlerOnBlur(props.content.c, props.content.r);
    setInputStatus("hidden");
    setFirstIn(0);
    console.log("oB", content, "1", content1);
  };
  const inputFocus = () => {
    console.log("input focus");
  };
  function isRowCol() {
    return props.content.c === 0 || props.content.r === 0;
  }
  function reload() {
    if (props.count !== localCount) {
      setLocalCount(props.count);
      console.log(`rerender:, ${props.content.val},${content1}`);
      setContent1(props.content.val);
      setContent(props.content.val);
      return;
    }
  }
  reload();
  return (
    <>
      <td
        tabindex="0"
        id={-(props.colNumber * props.content.r + props.content.c)}
        className={
          props.content.r === 0 || props.content.c === 0
            ? "td_gray"
            : (props.C !== -1 && props.content.c === props.C) ||
              (props.R !== -1 && props.content.r === props.R)
            ? "td_cfocus"
            : "td"
        }
        onFocus={isRowCol() ? () => {} : hOnFocus}
        onKeyDown={isRowCol() ? () => {} : keyDown}
        onBlur={isRowCol() ? () => {} : handlerOnBlur}
        onDoubleClick={isRowCol() ? () => {} : tdDouble}
      >
        <input
          ref={Ref}
          id={props.colNumber * props.content.r + props.content.c}
          className={
            props.content.r === 0 || props.content.c === 0
              ? "in_gray"
              : (props.C !== -1 && props.content.c === props.C) ||
                (props.R !== -1 && props.content.r === props.R)
              ? "in_cfocus"
              : "in"
          }
          type={inputStatus}
          value={content}
          onChange={isRowCol() ? () => {} : update}
          onBlur={isRowCol() ? () => {} : oB}
          onFocus={isRowCol() ? () => {} : inputFocus}
          onKeyDown={isRowCol() ? () => {} : inputKeyDown}
          //onDoubleClick={() => console.log("DOUBLE")}
        />
        {content1}
      </td>
    </>
  );
}

export default GridC;
