import { useParams } from "react-router";
import WheelComponent from "../../components/WheelComponent";
import { spinTheWheelType } from "../../slices/spinthewheel";
import { useSelector } from "react-redux";
import { getGameType } from "../../slices/gameType";
import MainScratchCard from "../scratchCard/MainScratchCard";

const GamePage = () => {
  const params = useParams();
  const { gameId } = params;
  const gameType = useSelector(getGameType);
  let publishedGames;
  if (localStorage.getItem("publishedGames")) {
    publishedGames = JSON.parse(localStorage.getItem("publishedGames") || "");
  }
  const selectedGame: spinTheWheelType[] = publishedGames.filter(
    (item: any) => item.id === gameId
  );
  console.log(selectedGame);
  const onFinished = (winner: string) => {
    console.log(winner);
  };
  const RenderSpinTheWheel = () => {
    return (
      <WheelComponent
        segments={selectedGame[0].segments}
        segColors={selectedGame[0].segColors}
        onFinished={(winner: string) => {
          onFinished(winner);
        }}
        spinFormData={selectedGame[0]}
        primaryColor={selectedGame[0].border}
        numberofSpins={selectedGame[0].numberOfSpins}
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={200}
        upDuration={500}
        downDuration={600}
        fontFamily="Arial"
        id={""}
      />
    );
  };
  return (
    <div className="w-full h-full relative">
      {gameType === "Spin the wheel" ? (
        <RenderSpinTheWheel />
      ) : (
        gameType === "Scratch card" && <MainScratchCard />
      )}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-disabled text-center">
        Powered by Gamelogo
      </div>
    </div>
  );
};

export default GamePage;
