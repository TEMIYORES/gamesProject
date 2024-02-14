import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import {
  CameraPlus,
  PlusCircle,
  TextT,
  ToggleLeft,
  ToggleRight,
  VideoCamera,
} from "@phosphor-icons/react";
import {
  contentSettingType,
  getQuizData,
  quizType,
  setQuiz,
} from "../../slices/quiz";
import QuizImageUploader from "../../components/quiz/QuizImageUploader";
import QuizColorPicker from "../../components/quiz/QuizColorPicker";
import { Add, Trash } from "iconsax-react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionTab from "../../components/quiz/QuestionTab";

const QuizSetting = () => {
  const quizData: quizType = useSelector(getQuizData);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const handleImageClear = (name?: string) => {
    const updateQuizData = { ...quizData };
    if (name === "background") {
      updateQuizData.background = {
        ...updateQuizData.background,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "mobile_background") {
      updateQuizData.mobileBackground = {
        ...updateQuizData.mobileBackground,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "gameBackground") {
      updateQuizData.gameBackground = {
        ...updateQuizData.gameBackground,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "gameMobileBackground") {
      updateQuizData.gameMobileBackground = {
        ...updateQuizData.gameMobileBackground,
        imgName: "",
        imgUrl: "",
      };
    }
    dispatch(setQuiz(updateQuizData));
  };

  const handleTextChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
    content: string
  ) => {
    const updateQuizData = { ...quizData };
    if (content === "description") {
      updateQuizData.gameDescription = e.target.value;
    }
    if (content === "heading") {
      updateQuizData.gameHeading = e.target.value;
    }
    if (content === "resultType") {
      updateQuizData.resultType = e.target.value;
    }

    if (content === "min1") {
      updateQuizData.setTimer = {
        ...updateQuizData.setTimer,
        min1: e.target.value,
      };
    }
    if (content === "min2") {
      updateQuizData.setTimer = {
        ...updateQuizData.setTimer,
        min2: e.target.value,
      };
    }
    if (content === "sec1") {
      updateQuizData.setTimer = {
        ...updateQuizData.setTimer,
        sec1: e.target.value,
      };
    }
    if (content === "sec2") {
      updateQuizData.setTimer = {
        ...updateQuizData.setTimer,
        sec2: e.target.value,
      };
    }

    dispatch(setQuiz(updateQuizData));
  };

  // const handleNumberChange = (
  //   e: ChangeEvent<HTMLSelectElement>,
  //   content: string
  // ) => {
  //   const updateQuizData = { ...quizData };
  //   if (content === "selectGrid") updateQuizData.selectGrid = e.target.value;
  //   dispatch(setQuiz(updateQuizData));
  // };

  const handleToggle = (name: string) => {
    const updateQuizData = { ...quizData };
    if (name === "timer")
      updateQuizData.enableTimer = !updateQuizData.enableTimer;
    if (name === "result")
      updateQuizData.showResult = !updateQuizData.showResult;
    if (name === "progressbar")
      updateQuizData.progressbar = {
        ...updateQuizData.progressbar,
        isEnable: !updateQuizData.progressbar.isEnable,
      };
    dispatch(setQuiz(updateQuizData));
  };
  const handleContentSettingChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string,
    index: number
  ) => {
    const updateQuizData = { ...quizData };

    if (index !== undefined) {
      if (content === "pointValue")
        updateQuizData.contentSetting[index] = {
          ...updateQuizData.contentSetting[index],
          pointValue: e.target.value,
        };
    }
    dispatch(setQuiz(updateQuizData));
  };
  const handleCodeRemove = (index: number) => {
    const updateQuizData = { ...quizData };

    updateQuizData.contentSetting = updateQuizData.contentSetting.slice(
      0,
      index
    );
    dispatch(setQuiz(updateQuizData));
  };
  const handleBlockAdd = () => {
    const updateQuizData = { ...quizData };
    const newItem: contentSettingType = {
      block: updateQuizData.contentSetting.length + 1,
      label: `block ${updateQuizData.contentSetting.length + 1}`,
      pointValue: "",
      toShow: {
        question: false,
        image: false,
        video: false,
        text: false,
        button: false,
      },
      questionSetting: {
        question: "",
        answertype: "Short answer",
        shortAnswer: "",
        paragraph: "",
        multipleChoice: [],
        checkbox: [],
        dropdown: [],
        fileUpload: {
          imgName: "",
          imgUrl: "",
        },
        button: {
          text: "",
          color: "",
          link: "",
          position: "",
        },
      },
      image: {
        imgName: "",
        imgUrl: "",
      },
      video: {
        videoName: "",
        videoUrl: "",
      },
      text: "",
      button: "",
    };
    updateQuizData.contentSetting = [...updateQuizData.contentSetting, newItem];
    setCurrentIndex(updateQuizData.contentSetting.length -1);
    dispatch(setQuiz(updateQuizData));
  };
  const menuItems = [
    {
      icon: <PlusCircle size={32} />,
      label: "Question",
    },
    {
      icon: <CameraPlus size={32} />,
      label: "Image",
    },
    {
      icon: <VideoCamera size={32} />,
      label: "Video",
    },
    {
      icon: <TextT size={32} />,
      label: "Text",
    },
    {
      icon: <TextT size={32} />,
      label: "Button",
    },
    {
      icon: <TextT size={32} />,
      label: "New Block",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(
    quizData.contentSetting.length - 1
  );
  const [menuToShow, setMenuToShow] = useState<string>();
  const handleMenuToShow = (index: number, label: string) => {
    const updateQuizData = { ...quizData };
    if (label === "Question") {
      updateQuizData.contentSetting = updateQuizData.contentSetting.map(
        (content, index2) => {
          if (index === index2) {
            content = {
              ...content,
              toShow: {
                ...updateQuizData.contentSetting[index].toShow,
                question: true,
              },
            };
          }
          return content;
        }
      );
      dispatch(setQuiz(updateQuizData));
    }
    if (label === "New Block") {
      handleBlockAdd();
    }
    setShowMenu(false);
  };
  console.log(currentIndex);
  return (
    <div className="w-full mb-5 p-2">
      <h3 className="mb-5 text-slate-500 font-semibold">Page Setting</h3>
      <div className="w-full pl-3 flex flex-col gap-5">
        <div className="w-full flex place-items-center gap-5">
          <label htmlFor="heading" className="font-semibold">
            Heading
          </label>
          <input
            id="heading"
            className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
            onChange={(e) => handleTextChange(e, "heading")}
            value={quizData.gameHeading}
          />
        </div>

        <div className="w-full flex gap-5">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            onChange={(e) => handleTextChange(e, "description")}
            value={quizData.gameDescription}
            id="description"
            rows={5}
            cols={30}
            className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
          />
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Background
          </span>
          <div className="flex">
            <QuizColorPicker
              defaultColor={quizData.background.color || "#ffffff"}
              name="background"
            />
          </div>
          <QuizImageUploader name="background" />
          {quizData.background.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {quizData.background.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("background");
                }}
              >
                x
              </span>
            </span>
          )}
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Mobile Background
          </span>
          <div className="flex">
            <QuizColorPicker
              defaultColor={quizData.mobileBackground.color || "#ffffff"}
              name="mobile_background"
            />
          </div>
          <QuizImageUploader name="mobile_background" />
          {quizData.mobileBackground.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {quizData.mobileBackground.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("mobile_background");
                }}
              >
                x
              </span>
            </span>
          )}
        </div>
      </div>
      <h3 className="text-slate-500 font-semibold my-5">Game Setting</h3>
      <div className="w-full pl-3 flex flex-col gap-5 ">
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Quiz Background
          </span>
          <div className="flex">
            <QuizColorPicker
              defaultColor={quizData.gameBackground.color || "#ffffff"}
              name="gameBackground"
            />
          </div>
          {/* <QuizImageUploader name="gameBackground" />
          {quizData.gameBackground.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {quizData.gameBackground.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("gameBackground");
                }}
              >
                x
              </span>
            </span>
          )} */}
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Mobile Background
          </span>
          <div className="flex">
            <QuizColorPicker
              defaultColor={quizData.gameMobileBackground.color || "#ffffff"}
              name="gameMobileBackground"
            />
          </div>
          {/* <QuizImageUploader name="gameMobileBackground" />
          {quizData.gameMobileBackground.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {quizData.gameMobileBackground.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("gameMobileBackground");
                }}
              >
                x
              </span>
            </span>
          )} */}
        </div>
        <div className="flex gap-3 place-items-center">
          <label className="w-2/5 font-semibold">Result Type</label>
          <select
            value={quizData.resultType}
            className="w-25 border border-slate-700 rounded-md outline-none px-1 bg-[#F1F5F9]"
            onChange={(e) => handleTextChange(e, "resultType")}
          >
            <option>Score</option>
            <option>Quiz Page</option>
            <option>Poll</option>
            <option>Redirect</option>
          </select>
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Show result to player</label>
          <input
            type="radio"
            checked={quizData.showResult}
            onClick={() => handleToggle("result")}
            className="cursor-pointer"
          />
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Progress Bar</label>
          <div
            onClick={() => handleToggle("progressbar")}
            className="cursor-pointer"
          >
            {quizData.progressbar.isEnable ? (
              <ToggleRight size={32} color="#6563FF" weight="fill" />
            ) : (
              <ToggleLeft size={32} color="#6563FF" weight="light" />
            )}
          </div>
        </div>
        {quizData.progressbar.isEnable && (
          <div className="flex place-items-center gap-3">
            <span className="w-2/5 whitespace-nowrap font-semibold">
              Bar Color
            </span>
            <div className="flex">
              <QuizColorPicker
                defaultColor={quizData.progressbar.color || "#ffffff"}
                name="progressBarColor"
              />
            </div>
          </div>
        )}
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Enable Timer</label>
          <div onClick={() => handleToggle("timer")} className="cursor-pointer">
            {quizData.enableTimer ? (
              <ToggleRight size={32} color="#6563FF" weight="fill" />
            ) : (
              <ToggleLeft size={32} color="#6563FF" weight="light" />
            )}
          </div>
        </div>
        {quizData.enableTimer && (
          <div className="flex gap-10 place-items-center">
            <label className="w-2/5 font-semibold">Set Timer</label>
            {/* <HourglassMedium size={32} color="#000000" weight="fill" /> */}
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-2 text-center gap-x-3 bg-inputBg rounded-md p-4">
                <label>Min</label>
                <label>Sec</label>
                <div className="grid grid-cols-2">
                  <input
                    maxLength={1}
                    value={quizData.setTimer.min1}
                    onChange={(e) => handleTextChange(e, "min1")}
                    className="outline-none border border-slate-300 w-7 px-2 py-1 rounded-md"
                  />
                  <input
                    maxLength={1}
                    value={quizData.setTimer.min2}
                    onChange={(e) => handleTextChange(e, "min2")}
                    className="outline-none border border-slate-300 w-7 px-2 py-1 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2">
                  <input
                    maxLength={1}
                    value={quizData.setTimer.sec1}
                    onChange={(e) => handleTextChange(e, "sec1")}
                    className="outline-none border border-slate-300 w-7 px-2 py-1 rounded-md"
                  />
                  <input
                    maxLength={1}
                    value={quizData.setTimer.sec2}
                    onChange={(e) => handleTextChange(e, "sec2")}
                    className="outline-none border border-slate-300 w-7 px-2 py-1 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <h3 className="text-slate-500 font-semibold my-5">Content Setting</h3>
      <div className="w-full flex flex-col gap-5 py-2 mb-3 bg-input_bg rounded-xl">
        {quizData.contentSetting.map((content, index) => (
          <div>
            <div key={index} className="w-full flex justify-around gap-x-5">
              <div className="flex place-items-center gap-3 font-semibold">
                <div>{content.label}</div>
                {index === quizData.contentSetting.length - 1 &&
                  index !== 0 && (
                    <div className="col-span-1">
                      <Trash
                        size="20"
                        color="#ff0000"
                        variant="Bold"
                        className="cursor-pointer"
                        onClick={() => handleCodeRemove(index)}
                      />
                    </div>
                  )}
              </div>
              <div className="flex gap-5">
                <label className="font-semibold text-center whitespace-nowrap col-span-2">
                  Point Value
                </label>
                <input
                  value={content.pointValue}
                  className="py-1 px-2 border-none rounded-md outline-none w-full bg-[#F1F5F9]"
                  onChange={(e) =>
                    handleContentSettingChange(e, "pointValue", index)
                  }
                />
              </div>
            </div>
            {content.toShow.question && <QuestionTab index={index} />}
            {menuToShow === "Image" && <div></div>}
            {menuToShow === "Video" && <div></div>}
            {menuToShow === "Text" && <div></div>}
            {menuToShow === "Button" && <div></div>}
            {menuToShow === "New Block" && <div></div>}
          </div>
        ))}
      </div>

      {showMenu && (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              y: 0,
              transition: {
                duration: 0.7,
              },
            }}
          >
            <div className="bg-disabled mx-auto flex gap-5 w-fit py-2 px-4 border-2 border-black border-dashed transition-all">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  onClick={() => handleMenuToShow(currentIndex, item.label)}
                  className="flex p-2 rounded-md flex-col justify-center items-center w-fit text-white cursor-pointer hover:bg-[#ffffff88]"
                >
                  {item.icon}
                  <label className="font-semibold">{item.label}</label>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <div
        className="py-2 px-4 font-semibold flex gap-1 mx-auto place-items-center cursor-pointer bg-primary w-fit text-white rounded-lg my-3"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Add size="20" color="#ffffff" />
        Add
      </div>
    </div>
  );
};

export default QuizSetting;
