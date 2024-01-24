import TictactoeGame from "../../components/tictactoe/TictactoeGame";
import { tictactoeType } from "../../slices/tictactoe";

const MainTictactoe = ({ data }: { data: tictactoeType }) => {
  const tictactoeData = data;
  return (
    <>
      <div
        style={{
          backgroundColor: tictactoeData.background.color,
          backgroundImage: `url(${tictactoeData.background.imgUrl})`,
          objectFit: "cover",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative py-10 flex flex-col items-center"
      >
        <div className="font-medium text-4xl text-center">
          {tictactoeData.gameHeading || "[header]"}
        </div>
        <div className="mt-2 text-center mb-5">
          {tictactoeData.gameDescription || "[description]"}
        </div>
        <TictactoeGame />
      </div>
    </>
  );
};

export default MainTictactoe;
