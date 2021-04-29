import axios from "axios";
import { useState } from "react";
import "./App.css";
import Record from "./record";
import { guess, startGame, restart } from "./axios";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const [fp, setFp] = useState("");
  const [his, setHis] = useState(true);
  //const [record, setRecord] = useState([]);
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  let hStyle = { color: getRandomColor(), fontSize: 50 };
  const startMenu = (
    <div>
      <button
        onClick={async () => {
          const resp = await startGame();
          if ((await resp) !== undefined) setHasStarted(true);
        }}
      >
        start game
      </button>
    </div>
  );

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          await restart();
          setHasWon(false);
          setStatus("");
          setNumber("");
        }}
      >
        restart
      </button>
    </>
  );

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    const resp = await guess(number);
    //await console.log(`NICE :${tmp}`);
    if ((await resp) !== undefined) {
      //record.push(`You guess ${number}`);
      //console.log(record);
      setStatus(resp.data.msg);
      (await resp.data.msg) === "Equal" ? setHasWon(true) : setHasWon(false);
      if (resp.data.msg2 !== undefined) {
        setFp(resp.data.msg2);
        console.log(`${typeof fp}`);
      }
    }
  };
  const hKeydown = (e) => {
    if (e.keyCode === 13) {
      handleGuess();
    }
  };
  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        onKeyDown={hKeydown}
      ></input>
      <button onClick={handleGuess} disabled={!number}>
        guess!
      </button>
      <p style={hStyle}>{status}</p>
      <div>
        <button className="history" onClick={() => setHis((pre) => !pre)}>
          History
        </button>
        <div className="log" hidden={his}>
          <span style={{ whiteSpace: "pre-line" }}>{fp}</span>
        </div>
      </div>
    </>
  );

  const game = <div>{hasWon ? winningMode : gameMode}</div>;

  return <div className="App">{hasStarted ? game : startMenu}</div>;
}

export default App;
