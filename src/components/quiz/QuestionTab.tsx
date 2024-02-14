import { Trash } from "@phosphor-icons/react";
import { getQuizData, quizType, setQuiz } from "../../slices/quiz";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent } from "react";
import MultipleChoice from "./answerType/MultipleChoice";
import CheckBox from "./answerType/CheckBox";
import Dropdown from "./answerType/Dropdown";
import QuizColorPicker from "./QuizColorPicker";

const QuestionTab = ({ index }: { index: number }) => {
  const quizData: quizType = useSelector(getQuizData);

  const dispatch = useDispatch();

  const handleTextChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
    label: string
  ) => {
    const updateQuizData = { ...quizData };
    updateQuizData.contentSetting = updateQuizData.contentSetting.map(
      (content, index2) => {
        if (index === index2) {
          content = {
            ...content,
            questionSetting: {
              ...updateQuizData.contentSetting[index].questionSetting,
              [label]: e.target.value,
            },
          };
        }
        return content;
      }
    );

    dispatch(setQuiz(updateQuizData));
  };
  const handleButtonComp = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
    label: string
  ) => {
    const updateQuizData = { ...quizData };
    updateQuizData.contentSetting = updateQuizData.contentSetting.map(
      (content, index2) => {
        if (index === index2) {
          content = {
            ...content,
            questionSetting: {
              ...updateQuizData.contentSetting[index].questionSetting,
              button: {
                ...updateQuizData.contentSetting[index].questionSetting.button,
                [label]: e.target.value,
              },
            },
          };
        }
        return content;
      }
    );

    dispatch(setQuiz(updateQuizData));
  };

  return (
    <div className="w-[90%] flex flex-col gap-5 mx-auto border border-dashed border-black p-5 my-5">
      <div className="flex flex-col gap-3">
        <label className="flex font-semibold items-center gap-2">
          Question <Trash size={20} />
        </label>
        <input
          id="question"
          className="w-full border bg-[#F1F5F9] p-1 outline-slate-400"
          onChange={(e) => handleTextChange(e, "question")}
          value={quizData.contentSetting[index].questionSetting.question}
        />
        <div className="flex gap-3 place-items-center">
          <label className="w-2/5 font-semibold">Answer</label>
          <select
            value={quizData.contentSetting[index].questionSetting.answertype}
            className="w-25 border border-slate-700 rounded-md outline-none px-1 bg-[#F1F5F9]"
            onChange={(e) => handleTextChange(e, "answertype")}
          >
            <option>Short answer</option>
            <option>Paragraph</option>
            <option>Multiple choice</option>
            <option>Checkboxes</option>
            <option>Dropdown</option>
            <option>File upload</option>
          </select>
        </div>
      </div>
      {quizData.contentSetting[index].questionSetting.answertype ===
        "Short answer" && (
        <div>
          <div className="flex gap-3 place-items-center">
            <label className="w-2/5 font-semibold">Correct Answer</label>
            <input
              className="w-full border bg-[#F1F5F9] p-1 outline-slate-400"
              onChange={(e) => handleTextChange(e, "shortAnswer")}
              value={quizData.contentSetting[index].questionSetting.shortAnswer}
            />
          </div>
        </div>
      )}
      {quizData.contentSetting[index].questionSetting.answertype ===
        "Paragraph" && (
        <div>
          <div className="flex gap-3 place-items-start">
            <label className="w-2/5 font-semibold">Correct Answer</label>
            <textarea
              onChange={(e) => handleTextChange(e, "paragraph")}
              value={quizData.contentSetting[index].questionSetting.paragraph}
              rows={5}
              cols={30}
              className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
            />
          </div>
        </div>
      )}
      {quizData.contentSetting[index].questionSetting.answertype ===
        "Multiple choice" && <MultipleChoice index={index} />}
      {quizData.contentSetting[index].questionSetting.answertype ===
        "Checkboxes" && <CheckBox index={index} />}
      {quizData.contentSetting[index].questionSetting.answertype ===
        "Dropdown" && <Dropdown index={index} />}
      <div>
        <label className="flex font-semibold items-center gap-2">
          Button ~ <Trash size={20} />
        </label>
        <div className="ml-5 mt-3 flex flex-col gap-5">
          <div className="flex place-items-center gap-5">
            <label className="font-semibold">Text</label>
            <input
              id="question"
              className="w-1/2 border bg-[#F1F5F9] p-1 outline-slate-400"
              onChange={(e) => handleButtonComp(e, "text")}
              value={quizData.contentSetting[index].questionSetting.button.text}
            />
          </div>
          <div className="flex place-items-center gap-5">
            <label className="font-semibold">Color</label>
            <QuizColorPicker
              defaultColor={quizData.gameBackground.color || "#ff0000"}
              name="buttonColor"
              index={index}
            />
          </div>
          <div className="flex place-items-center gap-5">
            <label className="font-semibold">Link To</label>
            <select
              value={quizData.contentSetting[index].questionSetting.button.link}
              className="w-25 border border-slate-700 rounded-md outline-none px-1 bg-[#F1F5F9]"
              onChange={(e) => handleButtonComp(e, "link")}
            >
              <option>Block 2</option>
            </select>
          </div>
          <div className="flex place-items-center gap-5">
            <label className="font-semibold">Position</label>
            <select
              value={
                quizData.contentSetting[index].questionSetting.button.position
              }
              className="w-25 border border-slate-700 rounded-md outline-none px-1 bg-[#F1F5F9]"
              onChange={(e) => handleButtonComp(e, "position")}
            >
              <option>Left</option>
              <option>Middle</option>
              <option>Right</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTab;
