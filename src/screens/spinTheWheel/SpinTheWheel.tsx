import { useSelector } from "react-redux";
import WheelComponent from "../../components/WheelComponent";

import {
  getSpinTheWheelSetting,
  spinTheWheelType,
} from "../../slices/spinthewheel";

const SpinTheWheel = () => {
  const onFinished = (winner: string) => {
    console.log(winner);
  };
  const spinFormData: spinTheWheelType = useSelector(getSpinTheWheelSetting);

  return (
    <div className={`overflow-y-hidden mt-20`}>
      <div className="font-medium text-4xl text-center">
        {spinFormData.gameHeading || "[Header]"} 
      </div>
      <div className="mt-2 text-center">{spinFormData.gameDescription || "[Description]"}</div>
      <WheelComponent
        segments={spinFormData.segments}
        segColors={spinFormData.segColors}
        onFinished={(winner: string) => {
          onFinished(winner);
        }}
        spinFormData={spinFormData}
        numberofSpins={spinFormData.numberOfSpins}
        primaryColor={spinFormData.border}
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={200}
        upDuration={500}
        downDuration={600}
        fontFamily="Arial"
        id={""}
      />
    </div>
  );
};

export default SpinTheWheel;
