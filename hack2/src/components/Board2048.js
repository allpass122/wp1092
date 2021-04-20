import Row from "./Row";
import React from "react";
function Board2048(props) {
  let boardClassName = "board";
  let infoClassName = "info";
  let outSentence = "No funding this year QAO";
  let phdSentence = "You should study a PhD!";
  //console.log(`${props.board} ${typeof props.board}`);
  return (
    <>
      <table className={boardClassName} id="board-full">
        <tbody>
          {props.board.map((row_vector, row_idx) => (
            <Row rows={row_vector} r_idx={row_idx} />
          ))}
        </tbody>
      </table>
      <div className={infoClassName} id="game-over-info">
        <span id="game-over-text">{outSentence}</span>
        <div className="button" id="game-over-button">
          Try again
        </div>
      </div>
    </>
  );
}
export default Board2048;
