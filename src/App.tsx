import "./App.scss";
import { Board } from "components/Board";
import { Header } from "components/Header";
import { GameBoard } from "lib/minesweeper.types";
import { RootState, usePlayerActions } from "store";
import { useSelector } from "react-redux";

function App(props: { board?: GameBoard }) {
  const state = useSelector<RootState, RootState>((i) => i);
  const { reset, setHeight, setMines, setWidth } = usePlayerActions();
  const { width, height, minesProbability: mines } = state.board;
  const { active, timerKey } = state.timer;

  return (
    <div className="App">
      <Header />
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;
