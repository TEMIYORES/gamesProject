import { useEffect } from "react";
import TictactoeGame from "./tictactoe/TictactoeGame";

const TestScratchCard = () => {
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.getElementById(
      "yourCanvasId"
    ) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      // Set the fill style (color)
      ctx!.fillStyle = "red"; // Replace 'red' with your desired color

      // Draw a filled rectangle covering the entire canvas
      ctx?.fillRect(0, 0, canvas.width, canvas.height);
    }
  });
  return (
    <div>
      <TictactoeGame />
    </div>
  );
};

export default TestScratchCard;
