import "./Header.scss";
import { Timer } from "components/Timer";
export interface HeaderProps {
  height: number;
  width: number;
  mines: number;
}
export const Header = ({ width, height, mines }: HeaderProps) => (
  <header className="header">
    <h1>Best mine sweeper ever</h1>
    <div className="header__inputs">
      <label htmlFor="width">Width</label>
      <input id="width" type="number" readOnly value={width} min="3" max="300" step="1" />
      <label htmlFor="height">Height</label>
      <input id="height" type="number" readOnly value={height} min="3" max="300" step="1" />
      <label htmlFor="mines">Mines %</label>
      <input id="mines" type="number" readOnly value={mines} min="1" max="100" step="1" />
      <label htmlFor="reset">New game</label>
      <button id="reset" className="header__reset-button" />
      <Timer />
    </div>
  </header>
);
