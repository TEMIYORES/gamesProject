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
import { getSpinTheWheelSetting, spinTheWheelType } from "../../slices/spinthewheel";
// import SpinTheWheel from "../spinTheWheel/SpinTheWheel";
const Game = () => {
  const gameType = useSelector(getGameType);
  const [refresh, setRefresh] = useState(false);
  const spinSetting = useSelector(getSpinTheWheelSetting);
  // const dispatch = useDispatch();
  const [selectedGame, setSelectGameSetting] =
    useState<spinTheWheelType | null>(null);

  useEffect(() => {
    if (gameType === "Spin the wheel") {
      setSelectGameSetting(spinSetting);
    }
  }, [gameType, spinSetting]);

  return (
    <div className="flex">
      <div className="hidden md:flex w-[25%] lg:w-[30%] xl:w-[40%] bg-white sticky top-0 bottom-0 left-0 h-screen overflow-y-auto flex-col items-start border border-black scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <GameSidebar />
        {gameType === "Scratch Card" && <ScratchCard />}
        {gameType === "Spin the wheel" && <SpinTheWheelSetting />}
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
        <div className="w-full h-screen items-start border-4 border-slate-300 bg-white">
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
        </div>
      </div>
    </div>
  );
};

export default Game;
