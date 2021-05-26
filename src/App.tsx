import "./App.scss";
import { Board } from "components/Board";
import { Header } from "components/Header";
import { useState } from "react";
import { GameBoard } from "lib/minesweeper.types";

function App(props:{board?:GameBoard}) {
  const [width, setWidth] = useState(props.board?.width || 30);
  const [height, setHeight] = useState(props.board?.height || 20);
  const [mines, setMines] = useState(10);
  const [counter, setCounter] = useState(0);
  const [active, setActive] = useState(false) 
  const reset = () => setCounter(counter+1);

  return (
    <div className="App">
      <Header {...{width, height, mines, setWidth, setHeight, setMines}} onReset={reset} timerId={counter} timerActive={active}/>
      <main>
        <Board width={width} height={height} minesProbability={mines / 100} key={counter} onActiveChanged={setActive} board={props.board} />
      </main>
    </div>
  );
}

export default App;
