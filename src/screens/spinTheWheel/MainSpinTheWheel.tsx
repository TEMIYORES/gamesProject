import WheelComponent from "../../components/WheelComponent";
import { spinTheWheelType } from "../../slices/spinthewheel";

const MainSpinTheWheel = ({ data }: { data: spinTheWheelType }) => {
  const spinData = data;
  const onFinished = (message: string) => {
    console.log(message);
  };
  return (
    <div className="w-full h-full relative mt-20">
      <div className="font-medium text-4xl text-center">
        {spinData.gameHeading || "[header]"}
      </div>
      <div className="mt-2 text-center">
        {spinData.gameDescription || "[description]"}
      </div>

      <WheelComponent
        segments={spinData.segments}
        segColors={spinData.segColors}
        onFinished={(winner: string) => {
          onFinished(winner);
        }}
        spinFormData={spinData}
        primaryColor={spinData.border}
        numberofSpins={spinData.numberOfSpins}
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={230}
        upDuration={500}
        downDuration={600}
        fontFamily="Arial"
        id={""}
      />
    </div>
  );
};

export default MainSpinTheWheel;
