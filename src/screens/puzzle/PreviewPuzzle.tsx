import Puzzle from "react-image-puzzle";
import { useSelector } from "react-redux";
import { getPuzzleData } from "../../slices/puzzle";
import PuzzleTimer from "../../components/puzzle/PuzzleTimer";
import { useEffect, useState } from "react";
import sound1 from "../../assets/sounds/sound1.mp3";
import sound2 from "../../assets/sounds/sound2.mp3";

const PreviewPuzzle = () => {
  const puzzleData = useSelector(getPuzzleData);
  const [isTimeup, setIsTimeUp] = useState<null | boolean>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const min = parseInt(puzzleData.setTimer.min1 + puzzleData.setTimer.min2);
  const sec = parseInt(puzzleData.setTimer.sec1 + puzzleData.setTimer.sec2);
  const [timeUpaudio, setTimeUpAudio] = useState<HTMLAudioElement>(new Audio());
  const [winAudio, setWinAudio] = useState<HTMLAudioElement>(new Audio());
  const result: number = min * 60 + sec;

  useEffect(() => {
    if (puzzleData.timeUpSound.name === "Sound 1") {
      setTimeUpAudio(new Audio(sound1));
    } else if (puzzleData.timeUpSound.name === "Sound 2") {
      setTimeUpAudio(new Audio(sound2));
    }
    if (puzzleData.winSound.name === "Sound 1") {
      setWinAudio(new Audio(sound1));
    } else if (puzzleData.winSound.name === "Sound 2") {
      setWinAudio(new Audio(sound2));
    }
  }, [puzzleData.timeUpSound.name, puzzleData.winSound.name]);

  useEffect(() => {
    if (isTimeup === null) {
      setRefresh(true);
    }
  }, [isTimeup]);

  const onTimeUp = () => {
    if (timeUpaudio.paused) {
      timeUpaudio.play();
    }
  };
  const onPuzzleCompleted = () => {
    if (winAudio.paused) {
      winAudio.play();
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor: puzzleData.background.color,
          backgroundImage: `url(${puzzleData.background.imgUrl})`,
          objectFit: "cover",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="py-10 flex flex-col items-center"
      >
        <div className="font-medium text-4xl text-center">
          {puzzleData.gameHeading || "[header]"}
        </div>
        <div className="mt-2 text-center mb-5">
          {puzzleData.gameDescription || "[description]"}
        </div>
        {puzzleData.timer && (
          <PuzzleTimer
            key={refresh ? "true" : "false"}
            isPaused={isPaused}
            duration={result}
            onTimeUp={() => {
              setIsTimeUp(true);
              onTimeUp();
            }}
          />
        )}
        {isTimeup === null ? (
          <Puzzle
            level={4 || puzzleData.selectGrid}
            size={400}
            onDone={() => {
              console.log("puzzle completed!");
              setIsTimeUp(false);
              onPuzzleCompleted();
              setIsPaused(true);
            }}
            image={puzzleData.selectedImage.imgUrl}
          />
        ) : isTimeup === true ? (
          <div className="w-2/5 h-2/5 bg-red-700 flex items-center justify-center rounded-md flex-col gap-y-2">
            <p className="font-semibold text-2xl text-white ">Time's Up!</p>
            <button
              className="bg-white px-4 py-2 rounded-md"
              onClick={() => setIsTimeUp(null)}
            >
              Retry
            </button>
          </div>
        ) : (
          isTimeup === false && (
            <div className="w-2/5 h-2/5 bg-green-700 flex items-center justify-center rounded-md">
              <p className="font-semibold text-2xl text-white ">You Win!</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default PreviewPuzzle;
