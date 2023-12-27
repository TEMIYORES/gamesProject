import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { getScratchCardData, setScratchCard } from "../../slices/scratchCard";

interface ColorPickerProps {
  defaultColor: string;
  name: string;
  handleColorWheel?: (color: string, index: number) => void;
}

const ScratchCardColorPicker: React.FC<ColorPickerProps> = ({
  defaultColor,
  name,
  handleColorWheel,
}) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const scratchCardData = useSelector(getScratchCardData);
  const dispatch = useDispatch();
  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    const updateScratchCardData = { ...scratchCardData };

    if (name === "background") {
      updateScratchCardData.background = {
        ...updateScratchCardData.background,
        color: color.hex,
      };
    }
    if (name === "mobile_background") {
      updateScratchCardData.mobileBackground = {
        ...updateScratchCardData.mobileBackground,
        color: color.hex,
      };
    }
    if (name === "mobile_background") {
      updateScratchCardData.mobileBackground = {
        ...updateScratchCardData.mobileBackground,
        color: color.hex,
      };
    }

    dispatch(setScratchCard(updateScratchCardData));
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

export default ScratchCardColorPicker;
