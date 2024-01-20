import { useEffect, useRef, useState } from "react";
interface answerTimerType {
  duration: number;
  isPaused: boolean;
  onTimeUp: () => void;
}
const PuzzleTimer = ({ duration, onTimeUp, isPaused }: answerTimerType) => {
  const [counter, setCounter] = useState(0);
  const [seconds, setSeconds] = useState(duration + 1);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined | string | number>(
    undefined
  );

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCounter((cur) => cur + 0.1);
        setSeconds((prevSeconds) => prevSeconds - 0.1);
      }, 100);
      return () => clearInterval(intervalRef.current);
    }
  }, [counter, isPaused, seconds]);

  useEffect(() => {
    setProgressLoaded(100 * (counter / duration));
    if (parseInt(counter.toString()) >= duration) {
      clearInterval(intervalRef.current);
      setTimeout(() => {
        onTimeUp();
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, duration]);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = parseInt(seconds.toString()) % 60;
  return (
    <div className="flex w-2/5 mb-3">
      <p
        style={{
          color: `${
            progressLoaded < 40
              ? "green"
              : progressLoaded < 70
              ? "orange"
              : "red"
          }`,
          fontFamily: "monospace",
        }}
        className="bg-bg p-2 rounded-md"
      >{`${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`}</p>
    </div>
  );
};

export default PuzzleTimer;
