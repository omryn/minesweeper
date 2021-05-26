import { useEffect, useState } from "react";
import "./Timer.scss";

const pad = (n: Number) => (n < 10 ? `0${n}` : `${n}`);
const parseTime = (time: number) => {
  time = time | 0;
  return `${pad((time / 60) | 0)}:${pad(time % 60)}`;
};

export const Timer = (props: { active: boolean }) => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (props.active) {
      const timerId = setTimeout(() => {
        setTimer(timer+1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [props.active, timer]);
  return (
    <div className="timer">
      {parseTime(timer)}
    </div>
  );
};
