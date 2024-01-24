import { EnvelopeOpen, FacebookLogo, TwitterLogo } from "@phosphor-icons/react";
import { spinTheWheelType } from "../../slices/spinthewheel";
import { useParams } from "react-router";
import { scratchCardType } from "../../slices/scratchCard";
import { puzzleType } from "../../slices/puzzle";
import * as LZString from "lz-string";
import { tictactoeType } from "../../slices/tictactoe";

const RedirectPage = () => {
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
    <div className="relative w-[60%] h-screen mx-auto flex flex-col gap-5">
      <div className="font-medium text-4xl text-center mt-20">
        {selectedGame[0].redirectHeading || "[You've won a Price!]"}
      </div>
      <div className="mt-2 text-center">
        {selectedGame[0].redirectDescription ||
          "[Check your email to get your coupon code!]"}
      </div>
      <div className="w-full gap-3 bg-inputBg py-3 font-light text-xl text-center">
        {!selectedGame[0].prizeWon ? "PRIZE WON" : selectedGame[0].prizeWon}
      </div>
      <div className="flex gap-5 justify-center text-white rounded-md">
        <FacebookLogo
          size="42"
          color="#150080"
          weight="fill"
          className="cursor-pointer"
        />
        <TwitterLogo
          size="42"
          color="#150080"
          weight="fill"
          className="cursor-pointer"
        />
        <EnvelopeOpen
          size="42"
          color="#150080"
          weight="fill"
          className="cursor-pointer"
        />
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-disabled py-2 px-8 rounded-md">
        Powered by Gamelogo
      </div>
    </div>
  );
};

export default RedirectPage;
