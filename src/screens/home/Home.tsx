import Sidebar from "../../components/Sidebar";
import colorWheelimage from "../../assets/color-wheel.png";
import scratchCardimage from "../../assets/card.png";
import quizImage from "../../assets/quiz.png";
import codeImage from "../../assets/code.svg";
import puzzleImage from "../../assets/puzzle.png";
import tictactoeImage from "../../assets/tic-tac-toe.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setGameType } from "../../slices/gameType";
import {
  getSpinTheWheelSetting,
  setSpinTheWheelSetting,
} from "../../slices/spinthewheel";
import { getScratchCardData, setScratchCard } from "../../slices/scratchCard";
import { getPuzzleData, setPuzzle } from "../../slices/puzzle";
import { getTictactoeData, setTictactoe } from "../../slices/tictactoe";
import { getGiveawayData, setGiveaway } from "../../slices/giveaway";
import { getQuizData, setQuiz } from "../../slices/quiz";

const Home = () => {
  const Menus = [
    {
      title: "Spin the wheel",
      path: "/campaigns/spin-the-wheel/settings",
      icon: colorWheelimage,
    },
    {
      title: "Scratch card",
      path: "/campaigns/scratch-card/settings",
      icon: scratchCardimage,
    },
    {
      title: "Quiz",
      path: "/campaigns/quiz/settings",
      icon: quizImage,
    },
    {
      title: "Giveaway",
      path: "/campaigns/giveaway/settings",
      icon: codeImage,
    },
    {
      title: "Puzzle",
      path: "/campaigns/puzzle",
      icon: puzzleImage,
    },
    {
      title: "Tic tac toe",
      path: "/campaigns/tictactoe",
      icon: tictactoeImage,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spinSetting = useSelector(getSpinTheWheelSetting);
  const scratchCardSetting = useSelector(getScratchCardData);
  const puzzleSetting = useSelector(getPuzzleData);
  const tictactoeSetting = useSelector(getTictactoeData);
  const giveawaySetting = useSelector(getGiveawayData);
  const quizSetting = useSelector(getQuizData);

  const generateShortCode = () => {
    const length = 6;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  };
  const handleGameSetting = (name: string) => {
    dispatch(setGameType(name));
    if (name === "Spin the wheel") {
      const updateGameSetting = { ...spinSetting };
      updateGameSetting.id = generateShortCode();
      dispatch(setSpinTheWheelSetting(updateGameSetting));
    }
    if (name === "Scratch card") {
      const updateGameSetting = { ...scratchCardSetting };
      updateGameSetting.id = generateShortCode();
      dispatch(setScratchCard(updateGameSetting));
    }
    if (name === "Puzzle") {
      const updateGameSetting = { ...puzzleSetting };
      updateGameSetting.id = generateShortCode();
      dispatch(setPuzzle(updateGameSetting));
    }
    if (name === "Tic tac toe") {
      const updateGameSetting = { ...tictactoeSetting };
      updateGameSetting.id = generateShortCode();
      dispatch(setTictactoe(updateGameSetting));
    }
    if (name === "Giveaway") {
      const updateGameSetting = { ...giveawaySetting };
      updateGameSetting.id = generateShortCode();
      dispatch(setGiveaway(updateGameSetting));
    }
    if (name === "Quiz") {
      const updateGameSetting = { ...quizSetting };
      updateGameSetting.id = generateShortCode();
      dispatch(setQuiz(updateGameSetting));
    }
    navigate("/entry");
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full py-10 px-20">
        <p className="text-2xl font-semibold mb-5">Games</p>
        <div className="grid grid-cols-3 gap-8">
          {Menus.map((content) => {
            return (
              <div
                className="bg-white hover:shadow-xl transition p-5 rounded-md min-h-[20rem] flex flex-col cursor-pointer"
                onClick={() => handleGameSetting(content.title)}
              >
                <div className="flex-[60%]">
                  {" "}
                  <img src={content.icon} alt="color wheel" className="w-40" />
                </div>
                <div className="font-semibold text-xl mb-1 flex-[20%] flex place-items-center">
                  {content.title}
                </div>
                <div className="text-slate-500 flex-[20%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia at ratione recusandae
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
