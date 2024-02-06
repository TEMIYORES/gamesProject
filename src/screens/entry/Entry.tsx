import GameSidebar from "../../components/GameSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getGameType } from "../../slices/gameType";
import { ChangeEvent, useEffect, useState } from "react";
import monitorImage from "../../assets/monitor.png";
import phoneImage from "../../assets/mobile-phone.png";
import cancelImage from "../../assets/cancel.png";
import reloadImage from "../../assets/reload.png";
import {
  getSpinTheWheelSetting,
  setSpinTheWheelSetting,
  spinTheWheelType,
} from "../../slices/spinthewheel";
import PreviewSpinTheWheel from "../spinTheWheel/EntrySpinTheWheel";
import { ProfileCircle, Send } from "iconsax-react";
import {
  getScratchCardData,
  scratchCardType,
  setScratchCard,
} from "../../slices/scratchCard";
import EntryScratchCard from "../scratchCard/EntryScratchCard";
import EntryPuzzle from "../puzzle/EntryPuzzle";
import { getPuzzleData, puzzleType, setPuzzle } from "../../slices/puzzle";
import {
  getTictactoeData,
  setTictactoe,
  tictactoeType,
} from "../../slices/tictactoe";
import EntryTictactoe from "../tictactoe/EntryTictactoe";
import {
  getGiveawayData,
  giveawayType,
  setGiveaway,
} from "../../slices/giveaway";
import EntryGiveaway from "../Giveaway/EntryGiveaway";
import { getQuizData, quizType, setQuiz } from "../../slices/quiz";
import EntryQuiz from "../quiz/EntryQuiz";
const Entry = () => {
  const gameType = useSelector(getGameType);
  const spinSetting = useSelector(getSpinTheWheelSetting);
  const scratchCardSetting = useSelector(getScratchCardData);
  const puzzleSetting = useSelector(getPuzzleData);
  const tictactoeSetting = useSelector(getTictactoeData);
  const giveawaySetting = useSelector(getGiveawayData);
  const quizSetting = useSelector(getQuizData);
  const dispatch = useDispatch();
  const [selectedGame, setSelectGameSetting] = useState<
    | spinTheWheelType
    | scratchCardType
    | puzzleType
    | tictactoeType
    | giveawayType
    | quizType
    | null
  >(null);

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

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string
  ) => {
    const updateData: spinTheWheelType | scratchCardType | null = {
      ...selectedGame,
    } as spinTheWheelType | scratchCardType;
    if (content === "description") {
      updateData.description = e.target.value;
    }
    if (content === "heading") {
      updateData.heading = e.target.value;
    }
    if (gameType === "Spin the wheel") {
      dispatch(setSpinTheWheelSetting(updateData));
    }
    if (gameType === "Scratch card") {
      dispatch(setScratchCard(updateData));
    }
    if (gameType === "Puzzle") {
      dispatch(setPuzzle(updateData));
    }
    if (gameType === "Tic tac toe") {
      dispatch(setTictactoe(updateData));
    }
    if (gameType === "Giveaway") {
      dispatch(setGiveaway(updateData));
    }
    if (gameType === "Quiz") {
      dispatch(setQuiz(updateData));
    }
  };
  return (
    <div className="flex">
      <div className="hidden md:flex w-[25%] lg:w-[30%] xl:w-[30%] bg-white sticky top-0 bottom-0 left-0 h-screen overflow-y-auto flex-col items-start border border-black scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <GameSidebar />
        <div className="w-full mt-5 p-2">
          <h3 className="mb-5 text-slate-500 font-semibold">Page Setting</h3>
          <div className="w-full pl-3 flex flex-col gap-5">
            <div className="w-full flex place-items-center gap-5">
              <label htmlFor="heading" className="font-semibold">
                Heading
              </label>
              <input
                id="heading"
                className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
                onChange={(e) => handleTextChange(e, "heading")}
                value={selectedGame?.heading}
              />
            </div>
            <div className="w-full flex gap-5">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                onChange={(e) => handleTextChange(e, "description")}
                value={selectedGame?.description}
                id="description"
                rows={5}
                cols={30}
                className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
              />
            </div>
            <div>
              <label htmlFor="fields" className="font-semibold">
                Fields
              </label>
              <div className="w-[95%] flex flex-col gap-3 mt-3">
                <div className="flex gap-4 place-items-center">
                  <div className="p-3 rounded-md bg-inputBg flex gap-3 w-[90%]">
                    <ProfileCircle size="20" color="#150080" variant="Bold" />
                    <span>Firstname</span>
                  </div>
                  {/* <Trash size="28" color="#9c9c9c" variant="Bold" /> */}
                </div>
                <div className="flex gap-4 place-items-center">
                  <div className="p-3 rounded-md bg-inputBg flex gap-3 w-[90%]">
                    <ProfileCircle size="20" color="#150080" variant="Bold" />
                    <span>Lastname</span>
                  </div>
                  {/* <Trash size="28" color="#9c9c9c" variant="Bold" /> */}
                </div>
                <div className="flex gap-4 place-items-center">
                  <div className="p-3 rounded-md bg-inputBg flex gap-3 w-[90%]">
                    <Send size="20" color="#150080" variant="Bold" />
                    <span>Email Address</span>
                  </div>
                  {/* <Trash size="28" color="#9c9c9c" variant="Bold" /> */}
                </div>
                {/* <div className="p-3 flex gap-1 place-items-center cursor-pointer">
                  <Add size="20" color="#150080" />
                  Add Form Field
                </div> */}
              </div>
            </div>
          </div>
        </div>
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
            className="bg-white p-3 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
        </div>
        <div className="w-full h-full items-start border-4 border-slate-300 bg-white rounded-md">
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
          <div className="w-full mt-20 flex flex-col place-items-center justify-center">
            {gameType === "Spin the wheel" && <PreviewSpinTheWheel />}
            {gameType === "Scratch card" && <EntryScratchCard />}
            {gameType === "Puzzle" && <EntryPuzzle />}
            {gameType === "Tic tac toe" && <EntryTictactoe />}
            {gameType === "Giveaway" && <EntryGiveaway />}
            {gameType === "Quiz" && <EntryQuiz />}
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-disabled py-2 px-8 rounded-md">
            Powered by Gamelogo
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
