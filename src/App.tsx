import "./App.scss";
import { Board } from "components/Board";

import { Header } from "components/Header";

function App() {
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
