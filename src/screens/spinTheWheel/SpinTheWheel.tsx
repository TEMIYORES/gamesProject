import { useSelector } from "react-redux";
import WheelComponent from "../../components/WheelComponent";
import {
  getSpinTheWheelSettings,
  initialType,
} from "../../slices/spinthewheelSettings";
import { Link } from "react-router-dom";
import { useState } from "react";

const SpinTheWheel = () => {
  const onFinished = (winner: string) => {
    console.log(winner);
  };
  const spinTheWheelsettings: initialType | null = useSelector(
    getSpinTheWheelSettings
  );
  const [backgroundColor, _setBackgroundColor] = useState(
    spinTheWheelsettings?.backgroundColor
  );

  const RenderComponent = () => {
    return (
      <WheelComponent
        segments={spinTheWheelsettings?.segments}
        segColors={spinTheWheelsettings?.segColors}
        onFinished={(winner: string) => {
          onFinished(winner);
        }}
        primaryColor={spinTheWheelsettings?.primaryColor}
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={200}
        upDuration={500}
        downDuration={600}
        fontFamily="Arial"
      />
    );
  };
  return (
    <div className={`bg-[${backgroundColor}] min-h-screen`}>
      {spinTheWheelsettings ? (
        <RenderComponent />
      ) : (
        <div className="w-full flex justify-center items-center">
          <span>
            No game settings{" "}
            <Link
              className="text-blue-300"
              to={"/campaigns/spin-the-wheel/settings"}
            >
              go to settings
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default SpinTheWheel;
