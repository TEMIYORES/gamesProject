import { useSelector } from "react-redux";
import { getSpinTheWheelSetting } from "../../slices/spinthewheel";
import { EnvelopeOpen, FacebookLogo, TwitterLogo } from "@phosphor-icons/react";

const RedirectSpinTheWheel = () => {
  const spinSetting = useSelector(getSpinTheWheelSetting);

  return (
    <div className="w-[60%] mx-auto justify-center flex flex-col gap-5">
      <div className="font-medium text-4xl text-center">
        {spinSetting.redirectHeading || "[You've won a Price!]"}
      </div>
      <div className="mt-2 text-center">
        {spinSetting.redirectDescription ||
          "[Check your email to get your coupon code!]"}
      </div>
      <div className="w-full gap-3 bg-inputBg py-3 font-light text-xl text-center">
        {!spinSetting.prizeWon ? "PRIZE WON" : spinSetting.prizeWon}
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
  );
};

export default RedirectSpinTheWheel;
