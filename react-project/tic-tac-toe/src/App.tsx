import React, { useState } from "react";
import "./App.css";
import Block from "./components/Block";

const App: React.FC = () => {
  const initialBoard = Array(9).fill(null);
  const [state, setState] = useState(initialBoard);
  const [currentTurn, setCurrentTurn] = useState("X");

  const checkWinner = (state: any[]) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]){
        handleReset();
        return true;
      }
    }
    return false;
  };

  const isBoardFull = (state: any[]) => {
    return state.every((cell) => cell !== null);
  };

  const handleBlockClick = (index: number) => {
    const stateCopy = Array.from(state);
    if (stateCopy[index] !== null) return;

    stateCopy[index] = currentTurn;

    // Check if someone won
    const win = checkWinner(stateCopy);
    if (win) {
      alert(`${currentTurn} won the game.`);
    }

    if (isBoardFull(stateCopy) && !win) {
      alert("The match is a draw!");

    }

    setCurrentTurn(currentTurn === "X" ? "0" : "X");
    setState(stateCopy);
  };

  const handleReset = () => {
    setState(initialBoard);
    setCurrentTurn("X");
  };

  return (
    <div className="container">
      <div className="board">
        <h1 className="heading">TIC TAC TOE</h1>
        <div className="row">
          <Block value={state[0]} onClick={() => handleBlockClick(0)} />
          <Block value={state[1]} onClick={() => handleBlockClick(1)} />
          <Block value={state[2]} onClick={() => handleBlockClick(2)} />
        </div>

        <div className="row">
          <Block value={state[3]} onClick={() => handleBlockClick(3)} />
          <Block value={state[4]} onClick={() => handleBlockClick(4)} />
          <Block value={state[5]} onClick={() => handleBlockClick(5)} />
        </div>

        <div className="row">
          <Block value={state[6]} onClick={() => handleBlockClick(6)} />
          <Block value={state[7]} onClick={() => handleBlockClick(7)} />
          <Block value={state[8]} onClick={() => handleBlockClick(8)} />
        </div>
      </div>
    </div>
  );
};

export default App;
