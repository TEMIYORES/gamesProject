import { useSelector } from "react-redux";
import GameSidebar from "../../components/GameSidebar";
import { getGameType } from "../../slices/gameType";
import ScratchCard from "../scratchCard/ScratchCardSetting";
import SpinTheWheelSetting from "../spinTheWheel/SpinTheWheelSetting";
import monitorImage from "../../assets/monitor.png";
import phoneImage from "../../assets/mobile-phone.png";
import cancelImage from "../../assets/cancel.png";
import reloadImage from "../../assets/reload.png";
import SpinTheWheel from "../spinTheWheel/SpinTheWheel";
import { useEffect, useState } from "react";
import {
  getSpinTheWheelSetting,
  spinTheWheelType,
} from "../../slices/spinthewheel";
import GameScratchCard from "../scratchCard/GameScratchCard";
import { getScratchCardData, scratchCardType } from "../../slices/scratchCard";
import PuzzleSetting from "../puzzle/PuzzleSetting";
import PreviewPuzzle from "../puzzle/PreviewPuzzle";
import { getPuzzleData, puzzleType } from "../../slices/puzzle";
import { getTictactoeData, tictactoeType } from "../../slices/tictactoe";
import PreviewTictactoe from "../tictactoe/PreviewTictactoe";
import TictactoeSetting from "../tictactoe/TictactoeSetting";
import { getGiveawayData, giveawayType } from "../../slices/giveaway";
import GiveawaySetting from "../Giveaway/GiveawaySetting";
import PreviewGiveaway from "../Giveaway/PreviewGiveaway";
import { getQuizData, quizType } from "../../slices/quiz";
import QuizSetting from "../quiz/QuizSetting";
import PreviewQuiz from "../quiz/PreviewQuiz";
// import SpinTheWheel from "../spinTheWheel/SpinTheWheel";
const Game = () => {
  const gameType = useSelector(getGameType);
  const [refresh, setRefresh] = useState(false);
  const spinSetting = useSelector(getSpinTheWheelSetting);
  const scratchCardSetting = useSelector(getScratchCardData);
  const puzzleSetting = useSelector(getPuzzleData);
  const tictactoeSetting = useSelector(getTictactoeData);
  const giveawaySetting = useSelector(getGiveawayData);
  const quizSetting = useSelector(getQuizData);
  const [selectedGame, setSelectGameSetting] = useState<
    | spinTheWheelType
    | scratchCardType
    | puzzleType
    | tictactoeType
    | giveawayType
    | quizType
  >();

  useEffect(() => {
    if (gameType === "Spin the wheel") {
      setSelectGameSetting(spinSetting);
    }
    if (gameType === "Scratch card") {
      setSelectGameSetting(scratchCardSetting);
    }
    if (gameType === "Puzzle") {
      setSelectGameSetting(puzzleSetting);
    }
    if (gameType === "Tic tac toe") {
      setSelectGameSetting(tictactoeSetting);
    }
    if (gameType === "Giveaway") {
      setSelectGameSetting(giveawaySetting);
    }
    if (gameType === "Quiz") {
      setSelectGameSetting(quizSetting);
    }
  }, [
    gameType,
    giveawaySetting,
    puzzleSetting,
    scratchCardSetting,
    spinSetting,
    tictactoeSetting,
    quizSetting,
  ]);

  return (
    <div className="flex">
      <div className="hidden md:flex w-[25%] lg:w-[30%] xl:w-[45%] bg-white sticky top-0 bottom-0 left-0 h-screen overflow-y-auto flex-col items-start border border-black scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <GameSidebar />
        {gameType === "Spin the wheel" && <SpinTheWheelSetting />}
        {gameType === "Scratch card" && <ScratchCard />}
        {gameType === "Puzzle" && <PuzzleSetting />}
        {gameType === "Tic tac toe" && <TictactoeSetting />}
        {gameType === "Giveaway" && <GiveawaySetting />}
        {gameType === "Quiz" && <QuizSetting />}
      </div>
      <div className="hidden md:flex w-[60%] sticky top-0 bottom-0 left-0 h-screen overflow-y-auto flex-col items-start border pt-10 px-10">
        <div className="w-1/5 mx-auto grid grid-cols-4 place-items-center">
          <img
            src={monitorImage}
            alt="monitor"
            className="bg-white p-3 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
          <img
            src={phoneImage}
            alt="monitor"
            className="bg-white p-3 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
          <img
            src={cancelImage}
            alt="monitor"
            className="bg-white p-3 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
          <img
            src={reloadImage}
            alt="monitor"
            onClick={() => setRefresh(!refresh)}
            className="bg-white p-3 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
        </div>
        <div
          className="w-full h-screen overflow-y-auto items-start border-4 border-slate-300 "
          style={{
            backgroundColor: selectedGame?.background.color,
            backgroundImage: `url(${selectedGame?.background.imgUrl})`,
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex place-items-center w-[95%] mx-auto gap-10 my-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-bgAccent rounded-full"></div>
              <div className="w-3 h-3 bg-bgAccent rounded-full"></div>
              <div className="w-3 h-3 bg-bgAccent rounded-full"></div>
            </div>
            <div className="bg-bgAccent rounded-lg w-full h-7 flex place-items-center px-2 text-sm">
              {location.href + "/" + selectedGame?.id}
            </div>
          </div>
          {gameType === "Spin the wheel" && (
            <SpinTheWheel key={refresh ? "refreshed" : "not-refreshed"} />
          )}
          {gameType === "Scratch card" && (
            <GameScratchCard key={refresh ? "refreshed" : "not-refreshed"} />
          )}
          {gameType === "Puzzle" && (
            <PreviewPuzzle key={refresh ? "refreshed" : "not-refreshed"} />
          )}
          {gameType === "Tic tac toe" && (
            <PreviewTictactoe key={refresh ? "refreshed" : "not-refreshed"} />
          )}
         
          {gameType === "Giveaway" && (
            <PreviewGiveaway key={refresh ? "refreshed" : "not-refreshed"} />
          )}
          {gameType === "Quiz" && (
            <PreviewQuiz key={refresh ? "refreshed" : "not-refreshed"} />
          )}
          <div className="mx-auto w-[40%] my-5 left-1/2 text-white text-center bg-disabled py-2 px-8 rounded-md">
            Powered by Gamelogo
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
