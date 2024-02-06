import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent } from "react";
import { ToggleLeft, ToggleRight } from "@phosphor-icons/react";
import { getQuizData, quizType, setQuiz } from "../../slices/quiz";
import QuizImageUploader from "../../components/quiz/QuizImageUploader";
import QuizColorPicker from "../../components/quiz/QuizColorPicker";

const QuizSetting = () => {
  const quizData: quizType = useSelector(getQuizData);
  const dispatch = useDispatch();

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
    </div>
  );
};

export default QuizSetting;
