import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { getTictactoeData, setTictactoe } from "../../slices/tictactoe";

interface ColorPickerProps {
  defaultColor: string;
  name: string;
  handleColorWheel?: (color: string, index: number) => void;
}

const TictactoeColorPicker: React.FC<ColorPickerProps> = ({
  defaultColor,
  name,
  handleColorWheel,
}) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const tictactoeData = useSelector(getTictactoeData);
  const dispatch = useDispatch();
  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    const updateTictactoeData = { ...tictactoeData };

    if (name === "background") {
      updateTictactoeData.background = {
        ...updateTictactoeData.background,
        color: color.hex,
      };
    }
    if (name === "mobile_background") {
      updateTictactoeData.mobileBackground = {
        ...updateTictactoeData.mobileBackground,
        color: color.hex,
      };
    }
    if (name === "gameBackground") {
      updateTictactoeData.gameBackground = color.hex;
    }
    if (name === "gridColor") {
      updateTictactoeData.gridColor = color.hex;
    }
    if (name === "oColor") {
      updateTictactoeData.oColor = color.hex;
    }
    if (name === "xColor") {
      updateTictactoeData.xColor = color.hex;
    }

    dispatch(setTictactoe(updateTictactoeData));
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

export default TictactoeColorPicker;
