import { useEffect, useState } from "react";

const AnswerTimer = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setInterval(() => {
        setCounter((cur) => cur + 1);
      }, 1000);
    }, 1000);
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full border border-disabled">
      <div className="h-[5px] transition duration-1000 ease-linear w-0">
        {counter}
      </div>
    </div>
  );
};

export default AnswerTimer;
