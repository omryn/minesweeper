import "./Header.scss";
import { Timer } from "components/Timer";
import { ChangeEvent } from "react";

type ChangeHandler = (value: number) => void;
export interface HeaderProps {
  height: number;
  width: number;
  mines: number;
  setMines: ChangeHandler;
  setHeight:ChangeHandler;
  setWidth: ChangeHandler;
  onReset: () => void;
  timerId:number
}
const handleWith = (fn:ChangeHandler) => (e:ChangeEvent<HTMLInputElement>) => fn(Number(e.target.value))

export const Header = ({
  width,
  height,
  mines,
  setMines,
  setHeight,
  setWidth,
  onReset,
  timerId
}: HeaderProps) => (
  <header className="header">
    <h1>Best mine sweeper ever</h1>
    <div className="header__inputs">
      <label htmlFor="width">Width</label>
      <input id="width" type="number" value={width} min="3" max="300" step="1" onChange={handleWith(setWidth)}/>
      <label htmlFor="height">Height</label>
      <input id="height" type="number" value={height} min="3" max="300" step="1" onChange={handleWith(setHeight)}/>
      <label htmlFor="mines">Mines %</label>
      <input id="mines" type="number" value={mines} min="1" max="100" step="1" onChange={handleWith(setMines)}/>
      <label htmlFor="reset">New game</label>
      <button id="reset" className="header__reset-button" onClick={onReset}/>
      <Timer key={timerId}/>
    </div>
  </header>
);
