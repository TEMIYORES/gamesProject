import { useDispatch, useSelector } from "react-redux";
import ColorPicker from "../../components/ColorPicker";
import {
  getQuizRawFormData,
  initialType,
  updateQuizRawFormData,
} from "../../slices/quizRawFormData";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Add, ArrowRight } from "iconsax-react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const QuizSettings = () => {
  const quizformdata = useSelector(getQuizRawFormData);
  const [quizRawFormData, setQuizRawFormData] =
    useState<initialType>(quizformdata);
  const [isFormValid, setisFormValid] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleOnSubmit = () => {
    quizRawFormData.id = uuid();
    dispatch(updateQuizRawFormData(quizRawFormData));
    setisFormValid(true);
  };
  const handleBackgroundColor = (data: string) => {
    const updateRawData = { ...quizRawFormData };
    updateRawData.backgroundColor = data;
    setQuizRawFormData(updateRawData);
  };
  const handleCardColor = (data: string) => {
    const updateRawData = { ...quizRawFormData };
    updateRawData.cardColor = data;
    setQuizRawFormData(updateRawData);
  };
  const handleTimeLimit = (data: number) => {
    const updateRawData = { ...quizRawFormData };
    updateRawData.timeLimit = data;
    setQuizRawFormData(updateRawData);
  };

  const handleOptionChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedRawData = {
      ...quizRawFormData,
    };
    updatedRawData.questions = updatedRawData.questions.map((question, i) => {
      if (i === index) {
        return { ...question, type: event.target.value };
      }
      return question;
    });
    console.log(updatedRawData);
    setQuizRawFormData(updatedRawData);
  };
  const handleAddQuestion = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const updatedRawData: initialType = {
      ...quizRawFormData,
      questions: [
        ...quizRawFormData.questions,
        {
          question: "",
          choices: [],
          type: "",
          correctAnswer: "",
        },
      ],
    };

    setQuizRawFormData(updatedRawData);
  };
  const handleQuestionChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedRawData = {
      ...quizRawFormData,
    };
    updatedRawData.questions = updatedRawData.questions.map((question, i) => {
      if (i === index) {
        return { ...question, question: event.target.value };
      }
      return question;
    });
    setQuizRawFormData(updatedRawData);
  };
  const handleAllOption = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedRawData = {
      ...quizRawFormData,
    };
    updatedRawData.questions = updatedRawData.questions.map((question, i) => {
      if (i === index) {
        return { ...question, choices: event.target.value.split(",") };
      }
      return question;
    });
    setQuizRawFormData(updatedRawData);
  };
  const handleCorrectAnswer = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedRawData = {
      ...quizRawFormData,
    };
    updatedRawData.questions = updatedRawData.questions.map((question, i) => {
      if (i === index) {
        return { ...question, correctAnswer: event.target.value };
      }
      return question;
    });
    setQuizRawFormData(updatedRawData);
  };

  return (
    <div className="w-full p-4 lg:p-8">
      <h2 className="font-bold text-base">Create Quiz</h2>
      <form
        onSubmit={handleOnSubmit}
        noValidate
        className="flex flex-col items-center"
      >
        <div className="flex flex-col items-center w-full mt-5 md:mt-10 ">
          {quizRawFormData.questions.map((question, index) => {
            return (
              <div
                className="bg-[#eee] p-2 rounded-sm w-full m-2"
                key={index + 1}
              >
                <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                  <label htmlFor="contents" className="mb-2 font-bold">
                    Question {index + 1}
                  </label>
                  <input
                    id="contents"
                    required
                    value={question.question}
                    onChange={(event) => handleQuestionChange(index, event)}
                    placeholder=""
                    className="py-2 px-2 border border-slate-400 outline-none"
                  />
                </div>
                <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                  <label htmlFor="contents" className="mb-2 font-bold">
                    Type of Answer
                  </label>
                  <div className="flex gap-5">
                    <label>
                      <input
                        type="radio"
                        value="MCQs"
                        checked={question.type === "MCQs"}
                        onChange={(event) => handleOptionChange(index, event)}
                      />
                      Multiple Choice Questions (MCQs)
                    </label>

                    <label>
                      <input
                        type="radio"
                        value="FIB"
                        checked={question.type === "FIB"}
                        onChange={(event) => handleOptionChange(index, event)}
                      />
                      Fill In the Blank (FIB)
                    </label>
                  </div>
                </div>
                {question.type === "MCQs" ? (
                  <>
                    <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                      <label htmlFor="alloptions" className="mb-2 font-bold">
                        All options (correct including answer)
                      </label>
                      <input
                        id="alloptions"
                        required
                        placeholder="Enter options separated by comma ','"
                        className="py-2 px-2 border border-slate-400 outline-none"
                        onChange={(event) => handleAllOption(index, event)}
                        value={quizRawFormData.questions[index].choices?.join(
                          ","
                        )}
                      />
                    </div>
                    <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                      <label htmlFor="correctAnswer" className="mb-2 font-bold">
                        correct answer
                      </label>
                      <input
                        id="correctAnswer"
                        required
                        placeholder=""
                        className="py-2 px-2 border border-slate-400 outline-none"
                        onChange={(event) => handleCorrectAnswer(index, event)}
                        value={quizRawFormData.questions[index].correctAnswer}
                      />
                    </div>
                  </>
                ) : (
                  question.type === "FIB" && (
                    <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                      <label htmlFor="correctAnswer" className="mb-2 font-bold">
                        correct answer
                      </label>
                      <input
                        id="correctAnswer"
                        required
                        placeholder=""
                        className="py-2 px-2 border border-slate-400 outline-none"
                        onChange={(event) => handleCorrectAnswer(index, event)}
                        value={quizRawFormData.questions[index].correctAnswer}
                      />
                    </div>
                  )
                )}
              </div>
            );
          })}
          <div className="w-full flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white flex items-center"
              onClick={handleAddQuestion}
            >
              <Add size="20" color="#fff" />
              Add Question
            </button>
          </div>
          <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
            <label htmlFor="contents" className="mb-2 font-bold">
              Time Limit (in Minutes)
            </label>
            <input
              type="number"
              id="numberInput"
              min={1}
              className="py-2 px-2 border-none outline-none"
              value={quizRawFormData.timeLimit}
              onChange={(event) =>
                handleTimeLimit(parseFloat(event.target.value))
              }
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center md:justify-between">
            <div className="flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
              <label htmlFor="contents" className="mb-2 font-bold">
                Background Color
              </label>
              <ColorPicker
                selectedColor={quizRawFormData.backgroundColor}
                handleColorChange={handleBackgroundColor}
              />
            </div>
            <div className="flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
              <label htmlFor="contents" className="mb-2 font-bold">
                Card Color
              </label>
              <ColorPicker
                selectedColor={quizRawFormData.cardColor}
                handleColorChange={handleCardColor}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-around items-center">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-300 focus:bg-blue-700`}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              handleOnSubmit();
            }}
          >
            Update Quiz
          </button>

          {isFormValid && (
            <Link to="/campaigns/quiz" className="flex items-center gap-2">
              Go to game
              <ArrowRight size="32" color="#FF8A65" />
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuizSettings;
