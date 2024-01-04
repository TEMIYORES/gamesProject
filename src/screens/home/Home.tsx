import Sidebar from "../../components/Sidebar";
import colorWheelimage from "../../assets/color-wheel.png";
import scratchCardimage from "../../assets/card.png";
import quizImage from "../../assets/quiz.png";
import codeImage from "../../assets/code.svg";
import puzzleImage from "../../assets/puzzle.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setGameType } from "../../slices/gameType";
import {
  getSpinTheWheelSetting,
  setSpinTheWheelSetting,
  spinTheWheelType,
} from "../../slices/spinthewheel";
// import { v4 as uuid } from "uuid";
// import wheelImage from "../../assets/wheel.png";
// import QuizImage from "../../assets/quiz.png";
// import moment from "moment";
// import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import { updateQuizRawFormData } from "../../slices/quizRawFormData";
// import { setSpinTheWheelSetting } from "../../slices/spinthewheel";
// interface datatype {
//   id: string;
//   createDate: Date;
//   segments: string[];
//   segColors: string[];
//   backgroundColor: string;
//   spinnerColor: string;
//   primaryColor: string;
//   numberOfSpins: number;
//   probability: {
//     label: string;
//     percentage: number;
//   }[];
//   type: "Spin the wheel";
// }
const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // let publishedGames: any[] = [];

  // if (localStorage.getItem("publishedGames")) {
  //   publishedGames = JSON.parse(localStorage.getItem("publishedGames") || "");
  // }
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const handleSpinGameLoad = (game: datatype) => {
  //   dispatch(setSpinTheWheelSetting(game));
  //   navigate("/campaigns/spin-the-wheel");
  // };
  // const handleQuizGameLoad = (game: datatype) => {
  //   dispatch(updateQuizRawFormData(game));
  //   navigate("/campaigns/quiz");
  // };
  const Menus = [
    {
      title: "Spin the wheel",
      path: "/campaigns/spin-the-wheel/settings",
      icon: colorWheelimage,
    },
    {
      title: "Scratch Card",
      path: "/campaigns/scratch-card/settings",
      icon: scratchCardimage,
    },
    {
      title: "Quiz",
      path: "/campaigns/quiz/settings",
      icon: quizImage,
    },
    {
      title: "Code give away",
      path: "/campaigns/code-give-away/settings",
      icon: codeImage,
    },
    {
      title: "Puzzle",
      path: "/campaigns/puzzle",
      icon: puzzleImage,
    },
    {
      title: "Referral Campaign",
      path: "/campaigns/referral-campaign",
      icon: colorWheelimage,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameSetting: spinTheWheelType = useSelector(getSpinTheWheelSetting);
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
      const updateGameSetting = { ...gameSetting };
      updateGameSetting.id = generateShortCode();
      dispatch(setSpinTheWheelSetting(updateGameSetting));
    }
    navigate("/entry");
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full py-10 px-20">
        <p className="text-2xl font-semibold mb-5">Games</p>
        {/* <div className="grid grid-cols-4 justify-between gap-4">
          {publishedGames ? (
            publishedGames.map((game) => {
              if (game.type === "Spin the wheel") {
                return (
                  <div
                    className="bg-white p-2 rounded-md cursor-pointer hover:shadow-md transition-all flex flex-col place-items-center gap-2"
                    onClick={() => handleSpinGameLoad(game)}
                  >
                    <img src={wheelImage} className="w-32" />
                    <p className="mb-2">
                      <span className="font-bold">GAME TYPE:</span> {game.type}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">CONTENT:</span>{" "}
                      {game.segments.join(", ")}
                    </p>
                    <p>
                      <span className="font-bold">TIME:</span>{" "}
                      {moment(game.createDate).fromNow()}
                    </p>
                  </div>
                );
              } else if (game.type === "Quiz") {
                return (
                  <div
                    className="bg-white p-2 rounded-md cursor-pointer hover:shadow-md transition-all flex flex-col place-items-center gap-2"
                    onClick={() => handleQuizGameLoad(game)}
                  >
                    <img src={QuizImage} className="w-32" />
                    <p className="mb-2">
                      <span className="font-bold">GAME TYPE:</span> {game.type}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Total Questions:</span>{" "}
                      {game.questions.length}
                    </p>
                    <p>
                      <span className="font-bold">TIME:</span>{" "}
                      {moment(game.createDate).fromNow()}
                    </p>
                  </div>
                );
              }
            })
          ) : (
            <div>No games</div>
          )}
        </div> */}
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
