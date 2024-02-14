import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { getQuizData, setQuiz } from "../../slices/quiz";

interface ColorPickerProps {
  defaultColor: string;
  name: string;
  handleColorWheel?: (color: string, index: number) => void;
  index?: number;
}

const QuizColorPicker: React.FC<ColorPickerProps> = ({
  defaultColor,
  name,
  handleColorWheel,
  index,
}) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const quizData = useSelector(getQuizData);
  const dispatch = useDispatch();
  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    const updateQuizData = { ...quizData };

    if (name === "background") {
      updateQuizData.background = {
        ...updateQuizData.background,
        color: color.hex,
      };
    }
    if (name === "mobile_background") {
      updateQuizData.mobileBackground = {
        ...updateQuizData.mobileBackground,
        color: color.hex,
      };
    }
    if (name === "gameBackground") {
      updateQuizData.gameBackground = {
        ...updateQuizData.gameBackground,
        color: color.hex,
      };
    }
    if (name === "gameMobileBackground") {
      updateQuizData.gameMobileBackground = {
        ...updateQuizData.gameMobileBackground,
        color: color.hex,
      };
    }
    if (name === "progressBarColor") {
      updateQuizData.progressbar = {
        ...updateQuizData.progressbar,
        color: color.hex,
      };
    }
    if (name === "buttonColor" && index !== undefined) {
      const button =
        updateQuizData.contentSetting[index].questionSetting.button;
      updateQuizData.contentSetting[index] = {
        ...updateQuizData.contentSetting[index],
        questionSetting: {
          ...updateQuizData.contentSetting[index].questionSetting,
          button: {
            ...button,
            color: color.hex,
          },
        },
      };
    }

    dispatch(setQuiz(updateQuizData));
    if (handleColorWheel !== undefined)
      handleColorWheel(color.hex, parseInt(name));
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prevState) => !prevState);
  };

  return (
    <div className="relative ">
      <div className="">
        <span className="flex place-items-center gap-1">
          <div
            style={{ backgroundColor: selectedColor }}
            className="w-5 h-5 rounded-full flex place-items-center justify-center border border-black"
          ></div>
          {showColorPicker ? (
            <ArrowUp2
              size="15"
              color="#000"
              onClick={toggleColorPicker}
              className="cursor-pointer"
            />
          ) : (
            <ArrowDown2
              size="15"
              color="#000"
              onClick={toggleColorPicker}
              className="cursor-pointer"
            />
          )}
        </span>
      </div>
      {showColorPicker && (
        <ChromePicker
          className="absolute z-10"
          color={selectedColor}
          onChange={handleColorChange}
        />
      )}
    </div>
  );
};

export default QuizColorPicker;
