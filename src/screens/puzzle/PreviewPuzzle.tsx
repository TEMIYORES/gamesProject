import Puzzle from "react-image-puzzle";
import { useSelector } from "react-redux";
import { getPuzzleData } from "../../slices/puzzle";

const PreviewPuzzle = () => {
  const puzzleData = useSelector(getPuzzleData);
  return (
    <>
      <div
        style={{
          backgroundColor: puzzleData.background.color,
          backgroundImage: `url(${puzzleData.background.imgUrl})`,
          objectFit: "cover",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="py-10 flex flex-col items-center"
      >
        <div className="font-medium text-4xl text-center">
          {puzzleData.gameHeading || "[header]"}
        </div>
        <div className="mt-2 text-center mb-10">
          {puzzleData.gameDescription || "[description]"}
        </div>
        <Puzzle level={4} size={500} image={puzzleData.selectedImage.imgUrl} />
      </div>
    </>
  );
};

export default PreviewPuzzle;
