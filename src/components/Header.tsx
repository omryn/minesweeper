import "./Header.scss";
import { Timer } from "components/Timer";
import { ChangeEvent } from "react";
import { useAppSelector, usePlayerActions } from "store";

type ChangeHandler = (value: number) => void;
const handleWith = (fn:ChangeHandler) => (e:ChangeEvent<HTMLInputElement>) => fn(Number(e.target.value))

export const Header = () => {
  const {setHeight, setMines, setWidth, reset} = usePlayerActions()
  const {width, height, minesProbability} = useAppSelector(state => state.board)
  const {active, timerKey} = useAppSelector(state => state.timer)

  return   (<header className="header">
    <h1>Best mine sweeper ever</h1>
    <div className="header__inputs">
      <label htmlFor="width">Width</label>
      <input id="width" type="number" value={width} min="3" max="300" step="1" onChange={handleWith(setWidth)}/>
      <label htmlFor="height">Height</label>
      <input id="height" type="number" value={height} min="3" max="300" step="1" onChange={handleWith(setHeight)}/>
      <label htmlFor="mines">Mines %</label>
      <input id="mines" type="number" value={minesProbability} min="1" max="100" step="1" onChange={handleWith(setMines)}/>
      <label htmlFor="reset">New game</label>
      <button id="reset" className="header__reset-button" onClick={reset}/>
      <Timer key={timerKey} active={active}/>
    </div>
  </header>
);
}