import "./App.scss";
import { Board } from "components/Board";
import { useState } from "react";
function App() {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(20);
  const [mines, setMines] = useState(10);
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Best mine sweeper ever</h1>
        <div className="header__inputs">
          <label htmlFor="width">Width</label>
          <input
            id="width"
            type="number"
            value={width}
            min="3"
            max="300"
            step="1"
            onChange={({ target }) => setWidth(parseInt(target.value))}
          />
          <label htmlFor="height">Height</label>
          <input
            id="height"
            type="number"
            value={height}
            min="3"
            max="300"
            step="1"
            onChange={({ target }) => setHeight(parseInt(target.value))}
          />
          <label htmlFor="mines">Mines %</label>
          <input
            id="mines"
            type="number"
            value={mines}
            min="1"
            max="100"
            step="1"
            onChange={({ target }) => setMines(parseInt(target.value))}
          />
          <button className="header__reset-button" onClick={() => setCounter(counter ? 0 : 1)} />
        </div>
      </header>
      <main>
        <Board
          width={width}
          height={height}
          minesProbability={mines / 100}
          key={counter}
        />
      </main>
    </div>
  );
}

export default App;
