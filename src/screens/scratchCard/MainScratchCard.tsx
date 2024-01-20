import ScratchCard from "react-scratchcard-v2-temiyores-fork";
import IMG from "../../assets/scratch_cover.jpeg";
import sound1 from "../../assets/sounds/sound1.mp3";
import sound2 from "../../assets/sounds/sound2.mp3";
import {
  scratchCardType,
  scratchGameSettingType,
} from "../../slices/scratchCard";
import { useEffect, useState } from "react";
const MainScratchCard = ({ data }: { data: scratchCardType }) => {
  const scratchCard = data;
  const getRandomItem = (
    items: scratchGameSettingType[]
  ): scratchGameSettingType | undefined => {
    let total = 0;
    items.forEach((item) => {
      total += item.probability;
    });
    let random = Math.floor(Math.random() * total);
    for (const item of items) {
      if (random < item.probability) {
        return item;
      }
      random -= item.probability;
    }
  };
  const [scratchCards, setScratchCards] = useState<string[]>([]);
  useEffect(() => {
    const cardUrls: string[] = [];
    const generateBiasedOutput: () => string = () => {
      const selected = getRandomItem(scratchCard.gameSetting);
      if (selected) {
        return selected?.imgUrl;
      }
      return "null";
    };
    scratchCard.gameSetting.map(() => {
      cardUrls.push(generateBiasedOutput());
    });
    setScratchCards(cardUrls);
  }, [scratchCard.gameSetting, scratchCard.gameSetting.length]);

  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio());
  useEffect(() => {
    if (scratchCard.scratchSound.name === "Sound 1") {
      setAudio(new Audio(sound1));
    }
    if (scratchCard.scratchSound.name === "Sound 2") {
      setAudio(new Audio(sound2));
    }
  }, [scratchCard.scratchSound.name]);
  const onScratch = () => {
    // Play custom scratch sound when the card is scratched
    if (audio.paused) {
      audio.play();
    }
  };
  const onStopScratch = () => {
    // Play custom scratch sound when the card is scratched
    if (!audio.paused) {
      audio.pause();
    }
  };

  return (
    <div
      style={{
        backgroundColor: scratchCard.background.color,
        backgroundImage: `url(${scratchCard.background.imgUrl})`,
        objectFit: "cover",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-10"
    >
      <div className="font-medium text-4xl text-center">
        {scratchCard.gameHeading || "[header]"}
      </div>
      <div className="mt-2 text-center">
        {scratchCard.gameDescription || "[description]"}
      </div>
      <div className="mt-10 grid grid-cols-2 w-[650px] gap-y-7 mx-auto justify-center">
        {scratchCards.length
          ? scratchCards.map((imgUrl) => {
              if (imgUrl === "") {
                return (
                  <div className="col-span-1">
                    <ScratchCard
                      width={300}
                      height={350}
                      color="#000"
                      onScratch={onScratch}
                      onStopScratch={onStopScratch}
                      image={IMG}
                      brushSize={10}
                      finishPercent={scratchCard.scratchPercentage}
                      onComplete={() => console.log("complete")}
                    >
                      <div className="flex h-full place-items-center justify-center bg-white">
                        <div>No Image!</div>
                      </div>
                    </ScratchCard>
                  </div>
                );
              }
              return (
                <div className="col-span-1">
                  <ScratchCard
                    width={300}
                    height={350}
                    color="red"
                    image={IMG}
                    finishPercent={scratchCard.scratchPercentage}
                    onComplete={() => console.log("complete")}
                    brushSize={10}
                  >
                    <img
                      src={imgUrl}
                      className="w-[300px] h-[350px] object-cover"
                    />
                  </ScratchCard>
                </div>
              );
            })
          : Array.from([1, 2, 3, 4]).map(() => (
              <div className="col-span-1">
                <ScratchCard
                  width={300}
                  height={350}
                  color="red"
                  image={IMG}
                  finishPercent={scratchCard.scratchPercentage}
                  onComplete={() => console.log("complete")}
                >
                  <div className="">No price!</div>
                </ScratchCard>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MainScratchCard;
