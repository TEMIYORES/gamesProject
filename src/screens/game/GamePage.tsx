import { useParams } from "react-router";
import { spinTheWheelType } from "../../slices/spinthewheel";
import MainScratchCard from "../scratchCard/MainScratchCard";
import MainPuzzle from "../puzzle/MainPuzzle";
import { scratchCardType } from "../../slices/scratchCard";
import { puzzleType } from "../../slices/puzzle";
import MainSpinTheWheel from "../spinTheWheel/MainSpinTheWheel";
import * as LZString from "lz-string";
import { tictactoeType } from "../../slices/tictactoe";
import MainTictactoe from "../tictactoe/MainTictactoe";

const GamePage = () => {
  const params = useParams();
  const { gameId } = params;

  let publishedGames;
  if (localStorage.getItem("publishedGames")) {
    const getGames = localStorage.getItem("publishedGames");
    const decompressedGames = LZString.decompress(getGames!);
    publishedGames = JSON.parse(decompressedGames);
  }
  const selectedGame:
    | spinTheWheelType[]
    | scratchCardType[]
    | puzzleType[]
    | tictactoeType[] = publishedGames.filter(
    (item: spinTheWheelType | scratchCardType | puzzleType | tictactoeType) =>
      item.id === gameId
  );

  return (
    <div className="w-full h-full relative">
      {selectedGame[0].gameType === "Spin the wheel" ? (
        <MainSpinTheWheel data={selectedGame[0] as spinTheWheelType} />
      ) : selectedGame[0].gameType === "Scratch card" ? (
        <MainScratchCard data={selectedGame[0] as scratchCardType} />
      ) : selectedGame[0].gameType === "Puzzle" ? (
        <MainPuzzle data={selectedGame[0] as puzzleType} />
      ) : (
        selectedGame[0].gameType === "Tic tac toe" && (
          <MainTictactoe data={selectedGame[0] as tictactoeType} />
        )
      )}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-disabled py-2 px-8 rounded-md">
        Powered by Gamelogo
      </div>
    </div>
  );
};

export default GamePage;
