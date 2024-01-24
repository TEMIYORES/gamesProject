import { useSelector } from "react-redux";
import { EnvelopeOpen, FacebookLogo, TwitterLogo } from "@phosphor-icons/react";
import { getTictactoeData } from "../../slices/tictactoe";

const RedirectTictactoe = () => {
  const tictactoeData = useSelector(getTictactoeData);

  return (
    <div
      style={{
        backgroundImage: `url(${tictactoeData.redirectBackground.imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
      }}
      className="w-full h-[100vh]"
    >
      <div className="w-[60%] mt-20 mx-auto justify-center flex flex-col gap-5">
        <div className="font-medium text-4xl text-center">
          {tictactoeData.redirectHeading || "[You've won a Price!]"}
        </div>
        <div className="mt-2 text-center">
          {tictactoeData.redirectDescription ||
            "[Check your email to get your coupon code!]"}
        </div>
        <div className="w-full gap-3 bg-inputBg py-3 font-light text-xl text-center">
          {!tictactoeData.priceWon ? "PRIZE WON" : tictactoeData.priceWon}
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
      </div>
    </div>
  );
};

export default RedirectTictactoe;
