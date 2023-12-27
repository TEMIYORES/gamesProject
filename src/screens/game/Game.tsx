import { useSelector } from "react-redux";
import GameSidebar from "../../components/GameSidebar";
import { getGameType } from "../../slices/gameType";
import ScratchCard from "../scratchCard/ScratchCardSetting";
import SpinTheWheelSetting from "../spinTheWheel/SpinTheWheelSetting";

const Game = () => {
  const gameType = useSelector(getGameType);
  return (
    <div className="hidden md:flex w-[25%] lg:w-[30%] xl:w-[45%] bg-white sticky top-0 bottom-0 left-0 h-[100vh] flex-col items-start border border-black">
      <GameSidebar />
      {gameType === "Scratch Card" && <ScratchCard />}
      {gameType === "Spin the wheel" && <SpinTheWheelSetting />}
    </div>
  );
};

export default Game;
