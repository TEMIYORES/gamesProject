import { useEffect, useRef, useState } from "react";
interface answerTimerType {
  duration: number;
  onTimeUp: () => void;
}
const AnswerTimer = ({ duration, onTimeUp }: answerTimerType) => {
  const [counter, setCounter] = useState(0);
  const [seconds, setSeconds] = useState(duration + 1);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined | string | number>(
    undefined
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 0.1);
      setSeconds((prevSeconds) => prevSeconds - 0.1);
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [counter, seconds]);

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
    <div className="">
      <div className="absolute top-0 left-0 w-full bg-bg">
        <div
          style={{
            width: `${progressLoaded}%`,
            backgroundColor: `${
              progressLoaded < 40
                ? "green"
                : progressLoaded < 70
                ? "orange"
                : "red"
            }`,
          }}
          className="h-[5px] transition-all duration-100 ease-linear bg-primary w-0 max-w-full"
        ></div>
      </div>
      <div className="w-full flex justify-end ">
        <p className="bg-bg p-2 rounded-sm">{`${minutes
          .toString()
          .padStart(2, "0")}:${remainingSeconds
          .toString()
          .padStart(2, "0")}`}</p>
      </div>
    </div>
  );
};

export default AnswerTimer;
