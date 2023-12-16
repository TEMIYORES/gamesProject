import { useEffect, useState } from "react";
import {
  getSpinTheWheelSettings,
  initialType,
  updateSpinsLeft,
} from "../slices/spinthewheelSettings";
import { useDispatch, useSelector } from "react-redux";
interface Item {
  label: string;
  percentage: number;
}
const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor = "black",
  contrastColor = "white",
  buttonText = "Spin",
  isOnlyOnce = true,
  size = 290,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = "proxima-nova",
}: any) => {
  const dispatch = useDispatch();
  const spinTheWheelsettings: initialType | null = useSelector(
    getSpinTheWheelSettings
  );
  const [backgroundColor, setBackgroundColor] = useState(
    spinTheWheelsettings?.backgroundColor
  );
  const spinnerColor = useState("#0000FF");
  useEffect(() => {
    setBackgroundColor(spinTheWheelsettings?.backgroundColor);
  }, []);

  const [spinsLeft, setSpinsLeft] = useState(
    spinTheWheelsettings?.numberOfSpins
  );
  let currentSegment = "";
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext: any = null;
  let maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = 300;
  const centerY = 300;
  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);

  const getRandomItem = (items: Item[]): Item | undefined => {
    let total = 0;
    items.forEach((item) => {
      total += item.percentage;
    });
    let random = Math.floor(Math.random() * total);
    for (const item of items) {
      if (random < item.percentage) {
        return item;
      }
      random -= item.percentage;
    }
  };
  const generateBiasedOutput: () => string | null | undefined = () => {
    if (spinTheWheelsettings?.probability) {
      const selected = getRandomItem(spinTheWheelsettings.probability);
      if (selected) {
        return selected?.label;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const textOverlay = document.getElementById("textOverlay") as HTMLElement;

    // console.log(navigator);
    if (navigator.userAgent.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", "1000");
      canvas.setAttribute("height", "600");
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel")?.appendChild(canvas);
    }
    textOverlay?.addEventListener("click", spin, false);
    canvasContext = canvas?.getContext("2d");
  };
  const spin = () => {
    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      // maxSpeed = Math.PI / ((segments.length*2) + Math.random())
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay) as unknown as number;
    }
  };
  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      winningSegment = generateBiasedOutput();
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      if ((spinsLeft as number) >= 1) {
        setSpinsLeft((prevSpins) => (prevSpins as number) - 1);
      }
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key: any, lastAngle: any, angle: any) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor;
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    if (ctx) {
      ctx.fillStyle = spinnerColor;
    }
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor;
    ctx.fill();
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = "center";
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor;
    ctx.fileStyle = contrastColor;
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor;
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i];
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };
  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };
  useEffect(() => {
    if (isFinished && (spinsLeft as number) <= 0) {
      setTimeout(() => {
        setSpinsLeft(0);
        dispatch(updateSpinsLeft(0));
      }, 3000);
    }
  }, [spinsLeft]);

  return (
    <div
      id="wheel"
      className="flex flex-col justify-center items-center pt-20"
      style={{ backgroundColor: `${backgroundColor}` }}
    >
      <span className="text-base font-bold">Number of spins: {spinsLeft}</span>
      <div className="relative">
        <canvas
          className={`mx-auto flex justify-center items-center`}
          id="canvas"
          width="600"
          height="600"
          style={{
            pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
          }}
        />
        <span
          id="textOverlay"
          className={`${
            spinsLeft ? "block" : "hidden"
          } absolute border-2 p-10 rounded-full cursor-pointer opacity-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
        >
          spin
        </span>
      </div>
    </div>
  );
};
export default WheelComponent;
