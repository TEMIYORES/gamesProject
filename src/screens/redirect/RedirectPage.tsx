import { EnvelopeOpen, FacebookLogo, TwitterLogo } from "@phosphor-icons/react";
import { spinTheWheelType } from "../../slices/spinthewheel";
import { useParams } from "react-router";

const RedirectPage = () => {
  const params = useParams();
  const { gameId } = params;

  let publishedGames;
  if (localStorage.getItem("publishedGames")) {
    publishedGames = JSON.parse(localStorage.getItem("publishedGames") || "");
  }
  const selectedGame: spinTheWheelType[] = publishedGames.filter(
    (item: any) => item.id === gameId
  );
  return (
    <div className="relative w-[60%] mx-auto justify-center flex flex-col gap-5 mt-20">
      <div className="font-medium text-4xl text-center">
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
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-disabled text-center">
        Powered by Gamelogo
      </div>
    </div>
  );
};

export default RedirectPage;
