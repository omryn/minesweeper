import "./App.scss";
import { Board } from "components/Board";
import { Header } from "components/Header";
import { GameBoard } from "lib/minesweeper.types";

function App(_props:{board?:GameBoard}) {
  const width = 30;
  const height = 20;
  const mines = 10;
  
  return (
    <div className="App">
      <Header width={width} height={height} mines={mines} />
      <main className="content">
        <Board height={2} width={2} />
      </main>
    </div>
  );
}

export default App;
