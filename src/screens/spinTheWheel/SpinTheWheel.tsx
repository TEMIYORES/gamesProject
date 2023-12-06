import WheelComponent from "../../components/WheelComponent";

const SpinTheWheel = () => {
  const segments = ["Manoj", "Pip", "Ravi", "Abdul", "Siddhesh", "Komal"];
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const onFinished = (winner: string) => {
    console.log(winner);
  };
  return (
    <div>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment={"Pip"}
        onFinished={(winner: string) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={150}
        upDuration={500}
        downDuration={600}
        fontFamily="Arial"
      />
    </div>
  );
};

export default SpinTheWheel;
