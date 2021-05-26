import "./App.scss";
import { Board } from "components/Board";
import { Header } from "components/Header";
import { useState } from "react";
function App() {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(20);
  const [mines, setMines] = useState(10);
  const [counter, setCounter] = useState(0);
  const reset = () => setCounter(counter+1);

  return (
    <div className="App">
      <Header {...{width, height, mines, setWidth, setHeight, setMines}} onReset={reset} timerId={counter}/>
      <main>
        <Board width={width} height={height} minesProbability={mines / 100} key={counter} />
      </main>
    </div>
  );
}

export default App;
