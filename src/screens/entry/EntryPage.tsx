import { useNavigate, useParams } from "react-router";
import { spinTheWheelType } from "../../slices/spinthewheel";
import { scratchCardType } from "../../slices/scratchCard";
import { puzzleType } from "../../slices/puzzle";
import * as LZString from "lz-string";
import { tictactoeType } from "../../slices/tictactoe";
const EntryPage = () => {
  const params = useParams();
  const { gameId } = params;
  const navigate = useNavigate();
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
    <div className="relative w-[40%] h-screen mx-auto flex flex-col gap-5">
      <div className="font-medium text-4xl text-center mt-20">
        {selectedGame[0].heading || "[header]"}
      </div>
      <div className="mt-2 text-center">
        {selectedGame[0].description || "[description]"}
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="w-full flex gap-4">
          <input
            className="bg-inputBg p-3 rounded-md tex-xl outline-none border-none flex-1"
            placeholder="Firstname"
          />
          <input
            className="bg-inputBg p-3 rounded-md tex-xl outline-none border-none flex-1"
            placeholder="Lastname"
          />
        </div>
        <input
          type="email"
          className="bg-inputBg p-3 rounded-md tex-xl outline-none border-none flex-1"
          placeholder="email"
        />
      </div>
      <button
        className="p-3 bg-primary text-white rounded-md"
        onClick={() => navigate(`/game/${selectedGame[0].id}`)}
      >
        {selectedGame[0].gameType === "Spin the wheel"
          ? "Start Spinning"
          : selectedGame[0].gameType === "Scratch card"
          ? "Start Scratching"
          : selectedGame[0].gameType === "Puzzle"
          ? "Start Puzzling"
          : selectedGame[0].gameType === "Tic tac toe" && "Play Tic tac toe"}
      </button>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-disabled py-2 px-8 rounded-md">
        Powered by Gamelogo
      </div>
    </div>
  );
};

export default EntryPage;
