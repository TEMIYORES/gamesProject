import Sidebar from "../../components/Sidebar";
import { spinTheWheelType } from "../../slices/spinthewheel";
import { Profile2User } from "iconsax-react";
import { CheckSquare, ClipboardText } from "@phosphor-icons/react";
import image from "../../assets/image.webp";
import { useEffect, useState } from "react";
import { scratchCardType } from "../../slices/scratchCard";
import { puzzleType } from "../../slices/puzzle";
import * as LZString from "lz-string";
const Games = () => {
  const getGames = localStorage.getItem("publishedGames");
  const [publishedGames, setPublishedGames] = useState<
    spinTheWheelType[] | scratchCardType[] | puzzleType[] | []
  >([]);
  useEffect(() => {
    if (getGames) {
      const decompressedGames = LZString.decompress(getGames);
      console.log(JSON.parse(decompressedGames));
      setPublishedGames(JSON.parse(decompressedGames));
    }
  }, [getGames]);

  const RenderGames = () => {
    return (
      <div className="grid grid-cols-3 gap-8">
        {publishedGames.map((content) => {
          return (
            <div className="relative bg-white hover:shadow-xl transition p-5 rounded-md min-h-[20rem] flex flex-col cursor-pointer gap-4">
              <div className="">
                {" "}
                <img src={image} alt="color wheel" className="rounded-md" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex place-items-center font-semibold text-lg">
                  Untitled Game
                </div>
                <div className="flex place-items-center text-blue-600">
                  {location.origin + "/entry/" + content.id}
                </div>
                <div className="flex place-items-center font-semibold text-[#7C88A4]">
                  {content.gameType}
                </div>
              </div>
              <div className="sticky bottom-5 flex gap-5 place-items-center justify-between">
                <div className="flex gap-5 place-items-center">
                  <div className=" flex gap-2 place-items-center font-semibold text-[#7C88A4]">
                    <Profile2User size="24" color="#7C88A4" variant="Bold" />
                    <span>1</span>
                  </div>
                  <div className=" flex gap-2 place-items-center font-semibold text-[#7C88A4]">
                    <CheckSquare size={24} color="#7C88A4" weight="bold" />
                    <span>1</span>
                  </div>
                </div>
                <div className="p-1 rounded-full flex place-items-center justify-center bg-[#0000ff]">
                  <ClipboardText size={20} color="#fff" weight="fill" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full py-10 px-20">
        <p className="text-2xl font-semibold mb-5">All Games</p>
        {publishedGames?.length ? <RenderGames /> : <div>No game</div>}
      </div>
    </div>
  );
};

export default Games;
