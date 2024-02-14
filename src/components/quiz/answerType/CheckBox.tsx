import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import { getQuizData, quizType, setQuiz } from "../../../slices/quiz";

const CheckBox = ({ index }: { index: number }) => {
  const quizData: quizType = useSelector(getQuizData);
  const [newOption, setNewOption] = useState("");
  const dispatch = useDispatch();

  const handleNewOption = (e: ChangeEvent<HTMLInputElement>) => {
    setNewOption(e.target.value);
  };
  const handleTextChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
    checkChoiceIndex?: number
  ) => {
    const updateQuizData = { ...quizData };
    updateQuizData.contentSetting = updateQuizData.contentSetting.map(
      (content, index2) => {
        if (index === index2) {
          const questionSetting =
            updateQuizData.contentSetting[index].questionSetting;
          // Check if checkbox is an array before mapping
          content = {
            ...content,
            questionSetting: {
              ...questionSetting,
              checkbox: questionSetting.checkbox.map((item, checkindex) => {
                if (checkChoiceIndex === checkindex) {
                  return {
                    ...item,
                    option: e.target.value,
                  };
                }
                return item;
              }),
            },
          };
        }
        return content;
      }
    );
    dispatch(setQuiz(updateQuizData));
  };
  const handleRemoveOption = (optionIndex: number) => {
    const updateQuizData = { ...quizData };
    updateQuizData.contentSetting = updateQuizData.contentSetting.map(
      (content, index2) => {
        if (index === index2) {
          const questionSetting =
            updateQuizData.contentSetting[index].questionSetting;
          content = {
            ...content,
            questionSetting: {
              ...questionSetting,
              checkbox: questionSetting.checkbox.filter(
                (item, index1) => optionIndex !== index1
              ),
            },
          };
        }
        return content;
      }
    );
    dispatch(setQuiz(updateQuizData));
  };
  const handleOptionCheck = (optionIndex: number) => {
    const updateQuizData = { ...quizData };
    updateQuizData.contentSetting = updateQuizData.contentSetting.map(
      (content, index2) => {
        if (index === index2) {
          const questionSetting =
            updateQuizData.contentSetting[index].questionSetting;
          content = {
            ...content,
            questionSetting: {
              ...questionSetting,
              checkbox: questionSetting.checkbox.map((item, checkindex) => {
                if (optionIndex === checkindex) {
                  return {
                    ...item,
                    ischecked: !item.ischecked,
                  };
                }
                return item;
              }),
            },
          };
        }
        return content;
      }
    );
    dispatch(setQuiz(updateQuizData));
  };
  const handleAddOption = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      if (newOption.trim() !== "") {
        const updateQuizData = { ...quizData };
        updateQuizData.contentSetting = updateQuizData.contentSetting.map(
          (content, index2) => {
            if (index === index2) {
              const questionSetting =
                updateQuizData.contentSetting[index].questionSetting;
              // Check if checkbox is an array before mapping
              content = {
                ...content,
                questionSetting: {
                  ...questionSetting,
                  checkbox: [
                    ...questionSetting.checkbox,
                    { option: newOption, ischecked: false },
                  ],
                },
              };
            }
            return content;
          }
        );
        setNewOption("");
        dispatch(setQuiz(updateQuizData));
      }
    }
  };

  return (
    <div>
      <div>
        <h3 className="w-[95%] font-semibold text-end">Correct Answer</h3>
        <div className="flex flex-col gap-3 place-items-start">
          {quizData.contentSetting[index].questionSetting.checkbox.map(
            ({ ischecked, option }, optionIndex) => (
              <div className="w-full grid grid-cols-8 items-center">
                <input type="radio" disabled className="col-span-1" />
                <input
                  value={option}
                  className="w-full border-b border-slate-400 p-1 outline-none col-span-3"
                  onChange={(e) => handleTextChange(e, optionIndex)}
                />
                <span className="text-lg col-span-1 text-end">
                  <span
                    className="w-fit cursor-pointer"
                    onClick={() => handleRemoveOption(optionIndex)}
                  >
                    x
                  </span>
                </span>
                <div className="col-span-3 flex justify-center">
                  <input
                    type="checkbox"
                    checked={ischecked}
                    className="w-fit"
                    onChange={() => handleOptionCheck(optionIndex)}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="items-center grid grid-cols-8 mt-3">
        <input type="radio" disabled className="col-span-1" />
        <input
          value={newOption}
          placeholder="Add Option"
          className="border-b border-slate-400  p-1 outline-none col-span-3"
          onChange={handleNewOption}
          onKeyDown={handleAddOption}
        />
      </div>
    </div>
  );
};

export default CheckBox;
